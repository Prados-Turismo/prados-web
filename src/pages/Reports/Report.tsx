import { Box, Button, Flex, Input, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import ReactSelect from "react-select";

import { IoSettingsOutline } from "react-icons/io5";
import FieldSearch from "../../components/FieldSearch";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { TBody, TD, THead, Table } from "../../components/Table";

// Hooks
import useReport, { getReportAnalytic } from "../../hooks/useReport";

import { useGlobal } from "../../contexts/UserContext";
import useSector from "../../hooks/useSector";

// Utils
import { genericSort } from "../../utils";

import { ISelect } from "../../models/generics.model";
import { ISidebarReport } from "../../models/report.model";

// Styles
import ButtonIcon from "../../components/ButtonIcon";
import useBenefits from "../../hooks/useBenefits";
import { useToastStandalone } from "../../hooks/useToastStandalone";
import { IDataProductContract } from "../../models/product.model";
import { apiRecord } from "../../services/api";
import { capitalize } from "../../utils/capitalize";
import TrReport from "./TrReport";
import TableSettingsModal from "./components/TableSettingsModal/TableSettingsModal";
import { Content } from "./styled";
import { theme } from "../../theme";
import AlertNoDataFound from "../../components/AlertNoDataFound";

const listStatusContratoBenfs = [
  {
    tab: "A",
    status: [
      {
        label: "Ativo",
        value: "active",
      },
      {
        label: "Cancelamento em análise",
        value: "cancellationReview",
      },
      {
        label: "Cancelamento programado",
        value: "scheduledCancellation",
      },
    ],
  },
  {
    tab: "E",
    status: [
      {
        label: "Adesão em Análise",
        value: "adhesionAnalysis",
      },
      {
        label: "Pendente de Envio para o Fornecedor - Assinatura confirmada",
        value: "pendingShipmentToProviderSignatureConfirmed",
      },
      {
        label: "Dados enviados para o Fornecedor",
        value: "dataSentToProvider",
      },
      {
        label: "Pendente de geração e envio da proposta",
        value: "pendingProposalGenerationSubmission",
      },
      {
        label: "Pendente de envio de dados para o Fornecedor",
        value: "pendingSubmissionDataToProvider",
      },
      {
        label: "Aguardando regularização dos demais contratos da proposta",
        value: "awaitingRegularizationOtherContractsTheProposal",
      },
    ],
  },
  {
    tab: "P",
    status: [
      {
        label: "Aguardando regularização de dados e documentos",
        value: "awaitingRegularizationDataDocuments",
      },
      {
        label: "Aguardando assinatura",
        value: "waitingSignature",
      },
      {
        label: "Solicitado entrevista qualificada",
        value: "requestedQualifiedInterview",
      },
      {
        label: "Pendente de pagamento",
        value: "pendingPayment",
      },
    ],
  },
  {
    tab: "C",
    status: [
      {
        label: "Cancelada a pedido do cliente",
        value: "cancelledClientRequest",
      },
      {
        label: "Data de assinatura expirada",
        value: "dateSubscriptionExpired",
      },
      {
        label: "Prazo de envio de dados/documentos expirado",
        value: "deadlineSendingDataDocumentsExpired",
      },
      {
        label: "Benficiário não elegível",
        value: "beneficiaryNotEligible",
      },
      {
        label: "Cancelado a pedido da empresa",
        value: "cancelledCompanyRequest",
      },
      {
        label: "Cancelamento outros motivos",
        value: "cancellationOtherReasons",
      },
      {
        label: "Cancelado por não pagamento do boleto",
        value: "cancelledForNonPaymentTicket",
      },
    ],
  },
];

const Report = ({ status }: Pick<ISidebarReport, "status">) => {
  const { company } = useGlobal();
  const companyId = company!.externalCompanyId;

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { getReport } = useReport();
  const { getAllCompaniesProvider } = useBenefits();
  const { getSector, getOccupation } = useSector();
  const { data: dataSelect, isLoading: isLoadingSector } = getSector(companyId);
  const { data: supplierData, isLoading: isLoadingSupplier } =
    getAllCompaniesProvider({ productClass: null });

  const [productData, setProductData] = useState<IDataProductContract[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [resetName, setResetName] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listSectorSelect, setListSectorSelect] = useState<ISelect[]>([]);

  const pageSize = 10;

  const {
    isLoading,
    data,
    count,
    sector,
    occupation,
    status: statusParam,
    setStatus,
    search,
    setSearch,
    setSector,
    setOccupation,
    supplier,
    setSupplier,
    product,
    setProduct,
    initialDate,
    setInitialDate,
    finishDate,
    setFinishDate,
    initialCancelDate,
    setInitialCancelDate,
    finishCancelDate,
    setFinishCancelDate,
  } = getReport({
    currentPage,
    pageSize,
    company: companyId,
    tab: status,
  });

  const { callReport, isLoading: loadingAnalytic } = getReportAnalytic();

  const clearFilter = () => {
    setCurrentPage(1);
    setResetName(true);
    setStatus(null);
    setSearch(null);
    setSector(null);
    setOccupation(null);
    setSupplier(null);
    setProduct(null);
    setProductData([]);
    setInitialDate("");
    setFinishDate("");
    setInitialCancelDate("");
    setFinishCancelDate("");
  };

  useEffect(() => {
    if (dataSelect.length > 0) {
      const listSectorSelectData = dataSelect
        ?.filter((sector) => sector?.nameFormatted !== "NAO INFORMADO")
        .map((item) => ({
          label: item?.name,
          value: item?.id,
        }));

      setListSectorSelect(listSectorSelectData);
    }
  }, [dataSelect]);

  const { data: positions, isLoading: isLoadingPositions } = getOccupation(
    sector?.value?.toString() || "",
  );

  useEffect(() => {
    if (supplier) {
      setIsLoadingProduct(true);
      apiRecord
        .get(
          `/companies-associated/${companyId}/contract/filterProducts?orderBy=createdAt&order=desc&size=1000&page=1`,
          {
            params: {
              companyProviderId: `["${supplier?.value}"]`,
            },
          },
        )
        .then((res) => {
          setProductData(res?.data?.rows);
        })
        .catch(() => {
          useToastStandalone({
            title: "Não foi possível listar os produtos",
            status: "error",
          });
        })
        .finally(() => {
          setIsLoadingProduct(false);
        });
    }
  }, [supplier, companyId]);

  useEffect(() => {
    if (resetName) {
      setResetName(false);
    }
  }, [resetName]);

  useEffect(() => {
    clearFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    document.title = `${theme.content.project} - Movimentações`;
  }, []);

  return (
    <>
      <Content>
        <div className="topWrap">
          <div className="fieldsGroup">
            <div className="input">
              <span>Status</span>

              <ReactSelect
                className="select-fields"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecionar"
                value={statusParam}
                onChange={(item) => {
                  setStatus(item);
                }}
                noOptionsMessage={() => "Nenhum status encontrado"}
                options={listStatusContratoBenfs
                  .filter((e) => e.tab === status)[0]
                  .status.sort((a, b) =>
                    genericSort(a, b, {
                      property: "label",
                    }),
                  )}
              />
            </div>

            <div className="input">
              <span>Buscar titular</span>

              <FieldSearch
                placeholder="Nome ou CPF"
                handleSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                reset={resetName}
              />
            </div>

            <div className="input">
              <span>Categorias</span>

              <ReactSelect
                className="select-fields"
                isLoading={isLoadingSector}
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecionar"
                value={sector}
                onChange={(item) => {
                  setSector(item);
                  setOccupation(null);
                }}
                noOptionsMessage={() => "Nenhuma categoria encontrado"}
                options={listSectorSelect.sort((a, b) =>
                  genericSort(a, b, {
                    property: "label",
                  }),
                )}
              />
            </div>

            <div className="input">
              <span>Subcategorias</span>

              <ReactSelect
                className="select-fields"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isLoading={isLoadingPositions}
                isSearchable={true}
                placeholder="Selecionar"
                value={occupation}
                onChange={(item) => {
                  setOccupation(item);
                }}
                noOptionsMessage={() => "Selecione uma categoria"}
                options={positions
                  ?.filter(
                    (position) => position?.nameFormatted !== "NAO INFORMADO",
                  )
                  .map((position) => ({
                    label: position?.name,
                    value: position?.id,
                  }))}
              />
            </div>

            <div className="input">
              <span>Fornecedores</span>

              <ReactSelect
                className="select-fields"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecionar"
                isLoading={isLoadingSupplier}
                value={supplier}
                onChange={(item) => {
                  setSupplier(item);
                  setProduct(null);
                }}
                noOptionsMessage={() => "Nenhum fornecedor encontrado"}
                options={supplierData?.map((item) => ({
                  label: item?.corporateName,
                  value: item?.id,
                }))}
              />
            </div>

            <div className="input">
              <span>Produtos</span>

              <ReactSelect
                className="select-fields"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                isLoading={isLoadingProduct}
                placeholder="Selecionar"
                value={product}
                onChange={(item) => {
                  setProduct(item);
                }}
                noOptionsMessage={() =>
                  !supplier?.value
                    ? "Selecione um fornecedor"
                    : "Não há produtos para selecionar"
                }
                options={productData?.map((product) => ({
                  label: capitalize(product?.product?.reducedName),
                  value: product?.id,
                }))}
              />
            </div>

            <Flex
              width={{
                base: "100%",
                lg: "max-content",
              }}
            >
              <span>Início de vigência</span>
              <Flex
                flexDirection={{
                  base: "column",
                  lg: "row",
                }}
              >
                <Input
                  height="40px"
                  width={{
                    base: "100%",
                    lg: "170px",
                  }}
                  borderRightRadius="0"
                  type="date"
                  color="text.third"
                  value={initialDate}
                  onChange={({ target }) => {
                    setInitialDate(target.value);
                  }}
                />
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  width={{
                    base: "100%",
                    lg: "56px",
                  }}
                  bg="#F5F5F5"
                  borderTop="1px solid"
                  borderBottom="1px solid"
                  borderColor="#e2e8f0"
                >
                  Até
                </Flex>
                <Input
                  height="40px"
                  width={{
                    base: "100%",
                    lg: "170px",
                  }}
                  borderLeftRadius="0"
                  type="date"
                  color="text.third"
                  value={finishDate}
                  onChange={({ target }) => {
                    setFinishDate(target.value);
                  }}
                />
              </Flex>
            </Flex>

            {status === "C" && (
              <Flex
                width={{
                  base: "100%",
                  lg: "max-content",
                }}
              >
                <span>Data de cancelamento</span>
                <Flex
                  flexDirection={{
                    base: "column",
                    lg: "row",
                  }}
                >
                  <Input
                    height="40px"
                    width={{
                      base: "100%",
                      lg: "170px",
                    }}
                    borderRightRadius="0"
                    type="date"
                    color="text.third"
                    value={initialCancelDate}
                    onChange={({ target }) => {
                      setInitialCancelDate(target.value);
                    }}
                  />
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      base: "100%",
                      lg: "56px",
                    }}
                    bg="#F5F5F5"
                    borderTop="1px solid"
                    borderBottom="1px solid"
                    borderColor="#e2e8f0"
                  >
                    Até
                  </Flex>
                  <Input
                    height="40px"
                    width={{
                      base: "100%",
                      lg: "170px",
                    }}
                    borderLeftRadius="0"
                    type="date"
                    color="text.third"
                    value={finishCancelDate}
                    onChange={({ target }) => {
                      setFinishCancelDate(target.value);
                    }}
                  />
                </Flex>
              </Flex>
            )}

            <div className="clearFilter">
              <Button
                borderRadius="4px"
                variant="outline"
                onClick={clearFilter}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>

          <div className="buttonsGroup">
            {data?.length > 0 && (
              <Box marginRight="30px">
                <ButtonIcon tooltip="Configurações">
                  <IoSettingsOutline
                    onClick={() => {
                      setShowSettingsModal(true);
                    }}
                    size={25}
                    color="#909090"
                  />
                </ButtonIcon>
              </Box>
            )}

            <Button
              isLoading={loadingAnalytic}
              isDisabled={data.length < 1}
              borderRadius="4px"
              loadingText="Fazendo download..."
              leftIcon={<MdFileDownload />}
              onClick={() => {
                callReport({
                  company: companyId,
                  tab: status,
                  status: statusParam?.value || null,
                  search: search || null,
                  effectiveStartDateFrom: initialDate || null,
                  effectiveStartDateTo: finishDate || null,
                  effectiveFinalyDateFrom: initialCancelDate || null,
                  effectiveFinalyDateTo: finishCancelDate || null,
                  sectorId: sector?.value || null,
                  positionId: occupation?.value || null,
                  providerName: supplier?.label || null,
                  productCommercialName: product?.label || null,
                });
              }}
            >
              Baixar Relatório
            </Button>
          </div>
        </div>

        {isLoading && (
          <Box height="350px">
            <Loading />
          </Box>
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table textAlign="center">
                    <THead>
                      <TD>Nome</TD>
                      <TD>CPF</TD>
                      <TD>Parentesco</TD>
                      <TD>CPF do titular</TD>
                      <TD>Categoria</TD>
                      <TD>Subcategoria</TD>
                      <TD>
                        Início de
                        <br />
                        vigência
                      </TD>
                      <TD>Fornecedor</TD>
                      <TD>Produto</TD>
                      <TD>Status</TD>
                      {status === "C" && (
                        <TD>
                          Data de
                          <br />
                          cancelamento
                        </TD>
                      )}
                      {selectedColumns.includes("valorProduto") && (
                        <TD>
                          Valor do
                          <br />
                          produto
                        </TD>
                      )}
                      {selectedColumns.includes("valorEmpresa") && (
                        <TD>
                          Valor pago
                          <br />
                          pela empresa
                        </TD>
                      )}
                      {selectedColumns.includes("valorBeneficiario") && (
                        <TD>
                          Valor pago
                          <br />
                          pelo beneficiário
                        </TD>
                      )}
                      {selectedColumns.includes("dataContratacao") && (
                        <TD>
                          Data de
                          <br />
                          contratação
                        </TD>
                      )}
                      {selectedColumns.includes("numeroCarteirinha") && (
                        <TD>Carteirinha</TD>
                      )}
                    </THead>

                    <TBody>
                      {data.map((item, index) => (
                        <TrReport
                          key={`${index}-${item?.cpf}`}
                          item={item}
                          status={status}
                          selectedColumns={selectedColumns}
                        />
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>

                <Pagination
                  registerPerPage={pageSize}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page: number) => {
                    setCurrentPage(page);
                  }}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum dado encontrado" />
            )}
          </>
        )}
      </Content>

      {showSettingsModal && (
        <TableSettingsModal
          showModal={showSettingsModal}
          setShowModal={setShowSettingsModal}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      )}
    </>
  );
};

export default Report;
