import { Button, Flex, Input, TableContainer, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import SimpleModal from "../../../components/SimpleModal";
import { ISelect } from "../../../models/generics.model";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import ModalUpdateTransacao from "../components/ModalUpdateTransacao";
import useTransacao from "../../../hooks/useTransacao";
import { formattingDate } from "../../../utils/formattingDate";
import { ITransacao } from "../../../models/transacao.model";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import useCategoriaTransacao from "../../../hooks/useCategoriaTransacao";
import useSubCategoriaTransacao from "../../../hooks/useSubCategoriaTransacao";

const RelatorioCategoriasList = () => {
  const { getTransacoesCategorias } = useTransacao();
  const [modalUpdateTransacao, setModalUpdateTransacao] = useState(false);
  const [transacaoData, setTransacaoData] = useState<ITransacao | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;
  const [dataTransacao, setDataTransacao] = useState(null || '')
  const [codigoCategoria, setCategoria] = useState<ISelect | null>();
  const [codigoSubCategoria, setSubCategoria] = useState<ISelect | null>();

  const { getAllCategoriaTransacao } = useCategoriaTransacao()
  const { getAllSubCategoriaTransacao } = useSubCategoriaTransacao()

  const { data: dataCategoria, isLoading: isLoadingCategoria } = getAllCategoriaTransacao();
  const { data: dataSubCategoria, isLoading: isLoadingSubCategoria } = getAllSubCategoriaTransacao();

  const { data, count, isLoading } = getTransacoesCategorias({
    size: registerPerPage,
    page: currentPage,
    dataTransacao,
    codigoCategoria: codigoCategoria?.value as string,
    codigoSubCategoria: codigoSubCategoria?.value as string
  });

  return (
    <>
      <SectionTop className="contentTop">
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="200px">
            <span>Categoria</span>
            <ReactSelect
              isLoading={isLoadingCategoria}
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={codigoCategoria}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhuma Categoria encontrada"}
              onChange={(item) => {
                setCategoria(item);
              }}
              options={dataCategoria.map((categoria) => {
                return { value: categoria.id, label: categoria.nome }
              })}
            />
          </Flex>

          <Flex flexDirection="column" gap="5px" width="200px">
            <span>Subcategoria</span>
            <ReactSelect
              isLoading={isLoadingSubCategoria}
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={codigoSubCategoria}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhuma SubSubcategoria encontrada"}
              onChange={(item) => {
                setSubCategoria(item);
              }}
              options={dataSubCategoria.map((subcategoria) => {
                return { value: subcategoria.id, label: subcategoria.nome }
              })}
            />
          </Flex>

          <Flex flexDirection="column" gap="5px" width="160px">
            <span>Data</span>
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              value={dataTransacao}
              onChange={(event) => {
                setDataTransacao(event.target.value)
              }}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setCategoria(null);
              setSubCategoria(null);
              setDataTransacao('')
            }}
          >
            Limpar Filtros
          </Button>
        </Flex>

        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding="0 30px 0 30px">
                      <TD></TD>
                      <TD>Data</TD>
                      <TD>Categoria</TD>
                      <TD>Conta</TD>
                      <TD>Pagamento</TD>
                      <TD>Valor</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.efetivado ? (
                              <Tooltip label="Efetivado" placement="top" hasArrow>
                                <div style={{
                                  backgroundColor: formattingDate(item.dataPrevistaRecebimento) == formattingDate(new Date().toISOString()) ? 'blue' : 'green',
                                  borderRadius: "50%",
                                  width: "10px",
                                  height: "10px"
                                }} />
                              </Tooltip>
                            ) : (
                              <Tooltip label="Pendente" placement="top" hasArrow>
                                <div style={{
                                  backgroundColor: formattingDate(item.dataPrevistaRecebimento) == formattingDate(new Date().toISOString()) ? 'blue' : 'red',
                                  borderRadius: "50%",
                                  width: "10px",
                                  height: "10px"
                                }} />
                              </Tooltip>
                            )}
                          </TD>
                          <TD>
                            {formattingDate(item.data)}
                          </TD>
                          <TD>
                            {item?.CategoriaTransacao?.nome || ''} {item?.CategoriaTransacao?.SubCategoria?.id ? '/' : ''} {item?.CategoriaTransacao?.SubCategoria?.nome || ''}
                          </TD>
                          <TD>
                            {item.ContaBancaria?.nome}
                          </TD>
                          <TD>
                            {item.FormaPagamento.nome}
                          </TD>
                          <TD style={{ color: item.tipo == 1 ? 'red' : 'green', fontWeight: 'bold' }}>
                            {item.tipo == 1 ? '-' : ''}  {currencyBRLFormat(item.valor)}
                          </TD>
                          <TD gap={3}>

                            <ButtonIcon tooltip="Editar">
                              <MdEdit
                                size={20}
                                // color={customTheme.colors.brandSecond.first}
                                cursor="pointer"
                                onClick={() => {
                                  setTransacaoData(item)
                                  setModalUpdateTransacao(true)
                                }}
                              />
                            </ButtonIcon>
                          </TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhuma transação encontrada" />
            )}
          </>
        )}
      </Content>

      {transacaoData && (
        <SimpleModal
          title="Transação"
          size="xl"
          isOpen={modalUpdateTransacao}
          handleModal={setModalUpdateTransacao}
        >
          <ModalUpdateTransacao
            handleClose={() => setModalUpdateTransacao(false)}
            data={transacaoData}
          />
        </SimpleModal>
      )}
    </>
  );
};

export default RelatorioCategoriasList;
