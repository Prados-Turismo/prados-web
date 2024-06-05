import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";

import { TBody, TD, THead, TR, Table } from "../../../components/Table";

import { BiArrowToBottom } from "react-icons/bi";
import ReactSelect, { SingleValue } from "react-select";
import Swal from "sweetalert2";
import { Warning } from "../../../errors";
import { useToastStandalone } from "../../../hooks/useToastStandalone";
import { apiCotacao } from "../../../services/api";
import { customTheme } from "../../../theme";
import { pixelToRem } from "../../../utils";
import { OutlinedButton } from "../../HealthVoucherManagement/pages/styled";
import AgeModal from "./AgeModal";
import { Content } from "./styled";
import ProviderImage from "../../../components/ProviderImage";
import { Checkbox } from "../../../components/ProductAdhesion/styled";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const ProductPrice = ({ status }: any) => {
  const [break900] = useMediaQuery("(max-width: 900px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<any>([]);
  const [supplierfilters, setSupplierfiltersFilters] = useState<any>([]);
  const [historic, setHistoric] = useState<any>([]);
  const [plans, setPlans] = useState<any>([]);
  const [searchParam, setSearchParam] = useState<string>("");
  const [citySelected, setCitySelected] = useState<SingleValue<any> | null>(
    null,
  );
  const [supplierSelected, setSupplierSelected] =
    useState<SingleValue<any> | null>(null);
  const [coparticipationSelected, setCoparticipationSelected] =
    useState<SingleValue<any> | null>(null);
  const [ageSelected, setAgeSelected] = useState({});
  const [searchProposal, setSearchProposal] = useState<string>("");
  const [cotacaoIdList, setCotacaoIdList] = useState<any>([]);
  const [cotacaoHistoricIdList, setCotacaoHistoricIdList] = useState<any>([]);
  const [ageModalOpened, setAgeModalOpened] = useState(false);
  const [reloadFunction, setReloadFunction] = useState(false);
  const [hoverSupplier, setHoverSupplier] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [historicDate, setHistoricDate] = useState<any>();
  const [firstPlans, setFirstPlans] = useState<string[]>([]);

  const handleSelectedCity = (selectedOption: SingleValue<any>) => {
    setCitySelected(selectedOption);
  };

  const handleSelectedCoparticipation = (selectedOption: SingleValue<any>) => {
    setCoparticipationSelected(selectedOption);
    setCurrentPage(1);
    setSearchProposal("");
    setSearchParam(`&statusProposta=${selectedOption?.value}`);
  };

  const clear = () => {
    setCotacaoIdList([]);
    setHistoricDate("");
    setSearchParam("");
    setSupplierSelected(null);
    setCitySelected(null);
    setCoparticipationSelected(null);
    setAgeSelected({});
    setReloadFunction(false);
    setPlans([]);
  };

  const handleSendCota = async () => {
    const queryParams = Object.entries(ageSelected).map(([key, value]) => ({
      [key]: Number(value),
    }));
    const vidas = Object.assign({}, ...queryParams);
    const data = {
      planos: cotacaoIdList,
      vidas: vidas,
    };
    try {
      setIsLoading(true);
      await apiCotacao.post(`/api/cotacao/`, data);
      Swal.fire({
        icon: "success",
        title: "Cotação realizada!",
        text: "Você receberá uma proposta no seu e-mail cadastrado no portal, caso tenha interesse em prosseguir abra um chamado para o nosso atendimento com sua cotação em anexo.",
        showConfirmButton: true,
        confirmButtonText: `Ok`,
      });
      setIsLoading(false);
      setSearchParam("");
      setSupplierSelected(null);
      setCitySelected(null);
      setHoverSupplier(false);
      setCoparticipationSelected(null);
      setCotacaoIdList([]);
      setPlans([]);
      setAgeSelected({});
      return;
    } catch (error: any) {
      Swal.fire({
        icon: "warning",
        title: "Não foi possível realizar a cotação! ",
        text: `${
          error.response?.data?.message
            ? error.response?.data?.message
            : "Tente novamente ou entre em contato com o administrador do sistema"
        }`,
        showConfirmButton: true,
        confirmButtonText: `Ok`,
      });
      setIsLoading(false);
    }
  };

  const handleGetHistoricReport = async () => {
    try {
      const response = await apiCotacao.post("/api/cotacoes/relatorio/", {
        cotacoes: cotacaoHistoricIdList,
      });
      const csvContent = `data:text/csv;charset=utf-8,${response.data}`;
      const encodedURI = encodeURI(csvContent);

      const downloadLink = document.createElement("a");
      downloadLink.href = encodedURI;
      downloadLink.download = `relatorio_cotador.csv`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    const getCotacaoFornecedorFiltro = async () => {
      if (citySelected && ageSelected && coparticipationSelected) {
        try {
          const queryParams = Object.entries(ageSelected)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
          const response = await apiCotacao.get(
            `/api/filtros/?cidade=${citySelected.label}&coparticipacao=${
              coparticipationSelected.label === "Sim" ? "1" : "0"
            }&${queryParams}`,
          );
          setSupplierfiltersFilters(response.data);
          if (response.data.fornecedores.length === 0) {
            useToastStandalone({
              title: `Atenção!`,
              description:
                "Não foi encontrado nenhum fornecedor com esses filtros.",
              status: "warning",
            });
          }

          if (response.data.results.length === 0) {
            useToastStandalone({
              title: `Atenção!`,
              description: "Não foi encontrado nenhum plano com esses filtros.",
              status: "warning",
            });
          }
          return;
        } catch (_error: any) {
          throw new Warning(
            "Não foi possível listar os fornecedores!",
            _error?.response?.status,
          );
        }
      }
    };

    const getCotacaoPlanos = async () => {
      if (
        citySelected &&
        supplierSelected &&
        ageSelected &&
        reloadFunction &&
        coparticipationSelected
      ) {
        try {
          setProductsLoading(true);
          const queryParams = Object.entries(ageSelected)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

          const response = await apiCotacao.get(
            `/api/planos/?cidade=${citySelected.label}&coparticipacao=${
              coparticipationSelected.label === "Sim" ? "1" : "0"
            }&page=${currentPage}&fornecedor=${
              supplierSelected.label
            }&${queryParams}`,
          );
          if (response?.data?.error) {
            useToastStandalone({
              title: "Observação!",
              description: response?.data?.error,
              status: "info",
            });
          }
          setPlans(response.data);
          setProductsLoading(false);
          return;
        } catch (_error: any) {
          setProductsLoading(false);
          throw new Warning(
            "Não foi possível listar os planos!",
            _error?.response?.status,
          );
        }
      }
    };

    const getCotacaoHistoric = async () => {
      if (status === "H") {
        try {
          setProductsLoading(true);
          const response = await apiCotacao.get(
            `/api/cotacoes/user/me?page=${currentPage}${
              searchParam !== null ? searchParam : ""
            }`,
          );
          setHistoric(response.data);
          setProductsLoading(false);
          return;
        } catch (_error: any) {
          throw new Warning(
            "Não foi possível listar os filtros!",
            _error?.response?.status,
          );
        }
      }
    };
    getCotacaoHistoric();
    getCotacaoPlanos();
    getCotacaoFornecedorFiltro();
  }, [
    status,
    supplierSelected,
    coparticipationSelected,
    currentPage,
    ageSelected,
    citySelected,
    searchParam,
    reloadFunction,
  ]);

  const getCotacaoFiltro = async () => {
    try {
      const response = await apiCotacao.get(`/api/filtros/`);
      setFilters(response.data);
      return;
    } catch (_error: any) {
      throw new Warning(
        "Não foi possível listar os filtros!",
        _error?.response?.status,
      );
    }
  };
  useEffect(() => {
    getCotacaoFiltro();
  }, []);

  useEffect(() => {
    clear();
  }, [status]);

  useEffect(() => {
    if (plans?.results?.length === 0 && supplierSelected) {
      useToastStandalone({
        title: "Nenhum produto encontrado.",
        description:
          "Não foi encontrado nenhum produto com base nos filtros selecionados.",
        status: "warning",
      });
    }
  }, [plans?.results, supplierSelected]);

  const handleSelectedSupplier = (selectedOption: SingleValue<any>) => {
    setSupplierSelected(selectedOption);
    setCurrentPage(1);
    setSearchProposal("");
  };

  const handleSelectedCityHistoric = (selectedOption: SingleValue<any>) => {
    setCurrentPage(1);
    if (supplierSelected?.label) {
      setSearchParam(
        `&cidade=${selectedOption?.label}&fornecedor=${supplierSelected?.label}`,
      );
      setCitySelected(selectedOption);
      return;
    }

    if (historicDate) {
      setSearchParam(`&cidade=${selectedOption?.label}&data=${historicDate}`);
      setCitySelected(selectedOption);
      return;
    }

    if (historicDate && supplierSelected?.label) {
      setSearchParam(
        `&cidade=${selectedOption?.label}&data=${historicDate}&fornecedor=${supplierSelected?.label}`,
      );
      setCitySelected(selectedOption);
      return;
    }
    setCitySelected(selectedOption);
    setSearchParam(`&cidade=${selectedOption?.label}`);
  };

  const handleSelectedSupplierHistoric = (selectedOption: SingleValue<any>) => {
    setCurrentPage(1);

    if (citySelected?.label) {
      setSearchParam(
        `&fornecedor=${selectedOption?.label}&cidade=${citySelected.label}`,
      );
      setSupplierSelected(selectedOption);
      return;
    }

    if (historicDate) {
      setSearchParam(
        `&data=${historicDate}&fornecedor=${selectedOption?.label}`,
      );
      setSupplierSelected(selectedOption);
      return;
    }

    if (historicDate && citySelected?.label) {
      setSearchParam(
        `&data=${historicDate}&fornecedor=${selectedOption?.label}&cidade=${citySelected.label}`,
      );
      setSupplierSelected(selectedOption);
      return;
    }
    setSupplierSelected(selectedOption);
    setSearchParam(`&fornecedor=${selectedOption?.label}`);
  };

  const handleSelectedDateHistoric = (selectedOption: string) => {
    setCurrentPage(1);

    if (citySelected?.label) {
      setSearchParam(`&data=${selectedOption}&cidade=${citySelected.label}`);
      setHistoricDate(selectedOption);
      return;
    }

    if (supplierSelected?.label) {
      setSearchParam(
        `&data=${selectedOption}&fornecedor=${supplierSelected.label}`,
      );
      setHistoricDate(selectedOption);
      return;
    }

    if (supplierSelected?.label && citySelected?.label) {
      setSearchParam(
        `&data=${selectedOption}&fornecedor=${supplierSelected.label}&cidade=${citySelected.label}e`,
      );
      setHistoricDate(selectedOption);
      return;
    }
    setHistoricDate(selectedOption);
    setSearchParam(`&data=${selectedOption}`);
  };

  return (
    <Content>
      <Box
        display="flex"
        gap="10px"
        marginTop="-125px"
        marginLeft="10px"
        justifyContent="flex-start"
        alignItems={break900 ? "flex-start" : "flex-end"}
        flexDirection={break900 ? "column" : "row"}
      >
        <AgeModal
          isOpen={ageModalOpened}
          onClose={setAgeModalOpened}
          filters={filters}
          ageSelected={ageSelected}
          setAgeSelected={setAgeSelected}
          setReloadFunction={setReloadFunction}
        />
        <FormControl maxWidth={break900 ? "100%" : "220px"} zIndex={5}>
          <FormLabel htmlFor="hubs" fontSize={pixelToRem(17)}>
            Cidade
          </FormLabel>
          {filters.length === 0 ? (
            <Box
              alignItems="center"
              width="max-content"
              margin="0 auto"
              display="flex"
              justifyContent="center"
            >
              <Skeleton w="220px" h="40px" />
            </Box>
          ) : (
            <ReactSelect
              placeholder="Selecionar"
              className="select-fields large"
              classNamePrefix="select"
              name="filtros"
              value={citySelected}
              noOptionsMessage={() => "Nenhuma cidade disponível"}
              onChange={(e: SingleValue<any>) => {
                if (status === "H") {
                  handleSelectedCityHistoric(e);
                  return;
                }

                handleSelectedCity(e);
              }}
              options={
                status === "H"
                  ? supplierfilters?.cidade?.map((s: any, index: any) => ({
                      label: s,
                      value: index,
                    }))
                  : filters?.cidade?.map((s: any, index: any) => ({
                      label: s,
                      value: index,
                    }))
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral20:
                    hoverSupplier && citySelected === null && status === "C"
                      ? customTheme.colors.brand[500]
                      : theme.colors.neutral20,
                },
              })}
            />
          )}
        </FormControl>
        {status === "C" && (
          <FormControl maxWidth={break900 ? "100%" : "190px"} zIndex={5}>
            <FormLabel htmlFor="status-proposta" fontSize={pixelToRem(17)}>
              Faixa Etária
            </FormLabel>
            {filters.length === 0 ? (
              <Box
                alignItems="center"
                width="max-content"
                margin="0 auto"
                display="flex"
                justifyContent="center"
              >
                <Skeleton w="190px" h="40px" />
              </Box>
            ) : (
              <button onClick={() => setAgeModalOpened(true)}>
                <Box
                  width="190px"
                  height="40px"
                  rounded="md"
                  borderWidth="1px"
                  borderColor={
                    hoverSupplier && Object.keys(ageSelected).length === 0
                      ? "brand.500"
                      : "gray.300"
                  }
                  color={
                    hoverSupplier && Object.keys(ageSelected).length === 0
                      ? "brand.500"
                      : "black.300"
                  }
                  cursor="pointer"
                  transitionDuration="500ms"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>
                    {Object.keys(ageSelected).length > 0 && reloadFunction
                      ? Object.entries(ageSelected)
                          .map(([key]) => `${key}`)
                          .reduce((result, item, index) => {
                            if (index < 2) {
                              return [...result, item];
                            } else if (index === 2) {
                              return [...result, item, "..."];
                            } else {
                              return result;
                            }
                          }, [] as string[])
                          .join(",")
                      : "Escolher Faixa Etária"}
                  </Text>
                </Box>
              </button>
            )}
          </FormControl>
        )}
        {status === "C" && (
          <FormControl maxWidth={break900 ? "100%" : "220px"} zIndex={5}>
            <FormLabel htmlFor="status-proposta" fontSize={pixelToRem(17)}>
              Coparticipação
            </FormLabel>
            {filters.length === 0 ? (
              <Box
                alignItems="center"
                width="max-content"
                margin="0 auto"
                display="flex"
                marginTop="10px"
                justifyContent="center"
              >
                <Skeleton w="220px" h="40px" />
              </Box>
            ) : (
              <ReactSelect
                placeholder="Selecionar"
                className="select-fields large"
                classNamePrefix="select"
                name="status-proposta"
                value={coparticipationSelected}
                noOptionsMessage={() => "Nenhuma Status disponível"}
                onChange={(e: SingleValue<any>) => {
                  handleSelectedCoparticipation(e);
                }}
                options={filters?.coparticipacao?.map((s: any, index: any) => ({
                  label: s === true ? "Sim" : "Não",
                  value: index,
                }))}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                  },
                })}
              />
            )}
          </FormControl>
        )}
        <FormControl maxWidth={break900 ? "100%" : "260px"} zIndex={5}>
          <FormLabel htmlFor="empresas" fontSize={pixelToRem(17)}>
            Fornecedor
          </FormLabel>
          {filters.length === 0 ? (
            <Box
              alignItems="center"
              width="max-content"
              margin="0 auto"
              display="flex"
              justifyContent="center"
            >
              <Skeleton w="260px" h="40px" />
            </Box>
          ) : (
            <Box
              onMouseEnter={() => setHoverSupplier(true)}
              onMouseLeave={() => setHoverSupplier(false)}
            >
              <ReactSelect
                placeholder="Selecionar"
                className="select-fields large"
                classNamePrefix="select"
                name="empresas"
                value={supplierSelected}
                isDisabled={
                  !citySelected?.label && status === "C" ? true : false
                }
                noOptionsMessage={() => "Nenhum fornecedor disponível"}
                onChange={(e: SingleValue<any>) => {
                  if (status === "H") {
                    handleSelectedSupplierHistoric(e);
                    return;
                  }
                  handleSelectedSupplier(e);
                }}
                options={supplierfilters?.fornecedor?.map(
                  (s: any, index: any) => ({
                    label: s,
                    value: index,
                  }),
                )}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                  },
                })}
              />
            </Box>
          )}
        </FormControl>
        {status === "H" && (
          <Box className="boxDuoForm">
            <FormControl>
              <FormLabel htmlFor="dataNascimento">Data da Cotação</FormLabel>
              <Input
                style={{
                  height: "40px",
                }}
                name="dataNascimento"
                type="date"
                placeholder="Data de Nascimento"
                value={historicDate}
                onChange={({ target: { value } }) => {
                  const dataAtual = new Date();
                  const data = new Date(value);

                  if (data > dataAtual) {
                    useToastStandalone({
                      title: "Error!",
                      description:
                        "A data selecionada não pode ser maior que a data atual!",
                      status: "error",
                    });
                    return;
                  }
                  handleSelectedDateHistoric(value);
                }}
              />
            </FormControl>
          </Box>
        )}

        <button
          style={{
            width: "117px",
            height: "40px",
            minHeight: "40px",
          }}
          onClick={clear}
        >
          Limpar Filtros
        </button>

        {status === "C" ? (
          <button
            onClick={() => {
              if (cotacaoIdList.length > 0) {
                return handleSendCota();
              } else {
                useToastStandalone({
                  title:
                    "Selecione algum produto para conseguir realizar a cotação.",
                  status: "error",
                });
              }
            }}
          >
            <Button isLoading={isloading}>Realizar Cotação </Button>
          </button>
        ) : (
          <button
            onClick={() => {
              if (cotacaoHistoricIdList.length > 0) {
                return handleGetHistoricReport();
              } else {
                useToastStandalone({
                  title:
                    "Selecione algum produto para conseguir baixar o relatório.",
                  status: "error",
                });
              }
            }}
          >
            <OutlinedButton>
              <BiArrowToBottom size={16} /> Baixar Relatório
            </OutlinedButton>
          </button>
        )}
      </Box>

      {productsLoading && (
        <Box marginTop="150px">
          <Loading />
        </Box>
      )}
      {!productsLoading && (
        <>
          {status === "C" && (
            <>
              <Table textAlign="center" marginTop="10px">
                <THead
                  backgroundColor="white"
                  borderBottomWidth={1}
                  height={50}
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  zIndex={1}
                  style={{
                    position: "sticky",
                    top: -15,
                  }}
                >
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Selecionar produto
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Fornecedor
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Produto
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Coparticipação
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Tipo de Negociação
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Faixa Limite
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Acomodação
                  </TD>
                  {status === "H" && <TD>Data</TD>}
                </THead>

                <TBody>
                  {plans?.results?.map((data: any) => (
                    <TR key={data?.id} height="max-content" minHeight="50px">
                      <TD>
                        <Checkbox
                          isDisabled={
                            cotacaoIdList.length > 0 &&
                            !cotacaoIdList.includes(data.id)
                          }
                          onChange={() => {
                            if (cotacaoIdList.length === 0) {
                              setCotacaoIdList(cotacaoIdList.concat(data.id));
                            }

                            if (cotacaoIdList.includes(data.id)) {
                              setCotacaoIdList(
                                cotacaoIdList.filter(
                                  (id: any) => id !== data.id,
                                ),
                              );
                            } else {
                              setCotacaoIdList(cotacaoIdList.concat(data.id));
                            }
                          }}
                        />
                      </TD>
                      <TD
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                      >
                        <ProviderImage
                          providerName={data?.fornecedor}
                          imgToken={data?.logotipo}
                          isCotador={true}
                        />
                      </TD>
                      <TD>{data?.produto}</TD>
                      <TD>{data?.coparticipacao_str}</TD>
                      <TD>{data?.tipo}</TD>
                      <TD>
                        {`${data?.qtdVidaMin} a ${data?.qtdVidaMax} vidas`}
                      </TD>
                      {status === "H" && <TD>{data?.validade}</TD>}
                      <TD>{data?.acomodacao}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>

              {status === "C" && plans?.results?.length > 0 && (
                <Pagination
                  registerPerPage={10}
                  totalRegisters={plans.count}
                  currentPage={currentPage}
                  handleChangePage={(page: number) => {
                    if (plans.count < 10) {
                      return null;
                    }
                    setCurrentPage(page);
                    setCotacaoIdList([]);
                  }}
                />
              )}
            </>
          )}

          {status === "C" && plans.length === 0 && (
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text marginTop="90px">
                Selecione um filtro para encontrar o produto ideal.
              </Text>
            </Box>
          )}

          {status === "H" && historic?.results?.length > 0 && (
            <>
              <Table textAlign="center">
                <THead
                  backgroundColor="white"
                  height={50}
                  borderBottomWidth={1}
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  zIndex={1}
                  style={{
                    position: "sticky",
                    top: -15,
                  }}
                >
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Selecionar Produto
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Fornecedor
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Produto
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Coparticipação
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Tipo de Negociação
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Faixa Etária
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Data
                  </TD>
                  <TD
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TD>
                </THead>

                <TBody>
                  {historic?.results?.map((data: any) => (
                    <TR key={data?.id} height="max-content" minHeight="50px">
                      <TD>
                        <Checkbox
                          onChange={() => {
                            if (cotacaoHistoricIdList.includes(data.id)) {
                              setCotacaoHistoricIdList(
                                cotacaoHistoricIdList.filter(
                                  (id: any) => id !== data.id,
                                ),
                              );
                            } else {
                              setCotacaoHistoricIdList(
                                cotacaoHistoricIdList.concat(data.id),
                              );
                            }
                          }}
                        />
                      </TD>
                      <TD
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                      >
                        <img src={data?.plano?.logotipo} alt="empresa-logo" />
                      </TD>
                      <TD>{data?.plano?.produto}</TD>
                      <TD>{data?.plano?.coparticipacao_str}</TD>
                      <TD>{data?.plano?.tipo}</TD>
                      <TD>
                        {data?.vidas &&
                          Object.entries(data.vidas)
                            .filter(([key, value]) => value !== 0)
                            .map(([key, value]) => `${key}(${value})`)
                            .join(",")}
                      </TD>
                      {status === "H" && (
                        <TD>
                          {data?.created_at &&
                            `${data.created_at.substr(
                              8,
                              2,
                            )}/${data.created_at.substr(
                              5,
                              2,
                            )}/${data.created_at.substr(0, 4)}`}
                        </TD>
                      )}
                      <TD>{data?.status}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>

              <Pagination
                registerPerPage={10}
                totalRegisters={historic.count}
                currentPage={currentPage}
                handleChangePage={(page: number) => {
                  if (historic.count < 10) {
                    return null;
                  }
                  setCurrentPage(page);
                  setCotacaoIdList([]);
                }}
              />
            </>
          )}

          {status === "H" && historic?.results?.length === 0 && (
            <AlertNoDataFound title="Nenhuma cotação anterior encontrada" />
          )}
        </>
      )}
    </Content>
  );
};

export default ProductPrice;
