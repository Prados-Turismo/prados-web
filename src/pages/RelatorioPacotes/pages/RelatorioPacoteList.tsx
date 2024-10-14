import { Button, Flex, Input, TableContainer, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import SimpleModal from "../../../components/SimpleModal";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import ModalUpdateTransacao from "../components/ModalUpdateTransacao";
import { formattingDate } from "../../../utils/formattingDate";
import { ITransacao } from "../../../models/transacao.model";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import { IRelatorioPacoteList } from "./types";
import useExcursoes from "../../../hooks/useExcursao";
import SelectAsyncPaginate from "../../../components/SelectAsyncPaginate";

const RelatorioPacoteList = ({
  pacoteResponse,
  currentPage,
  setCurrentPage,
  codigoPacote,
  setPacote,
  dataInicio,
  setDataInicio,
  dataFim,
  setDataFim
}: IRelatorioPacoteList) => {
  const [modalUpdateTransacao, setModalUpdateTransacao] = useState(false);
  const [transacaoData, setTransacaoData] = useState<ITransacao | undefined>();
  const registerPerPage = 10;

  const { excursaoPromiseOptions } = useExcursoes()

  const { data, count, isLoading } = pacoteResponse


  debugger

  return (
    <>
      <SectionTop className="contentTop">
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="200px">
            <SelectAsyncPaginate
              name="passageiros"
              placeholder="Selecione"
              label="Pacotes"
              minW="200px"
              isRequired
              isMulti
              isSearchable
              value={codigoPacote}
              noOptionsMessage="Nenhuma Excursão encontrada"
              promiseOptions={excursaoPromiseOptions}
              handleChange={(option) => {
                setPacote(option);
              }}
            />
          </Flex>

          <Flex flexDirection="column" gap="5px" width="160px">
            <span>Data Início</span>
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              value={dataInicio}
              onChange={(event) => {
                setDataInicio(event.target.value)
              }}
            />
          </Flex>

          <Flex flexDirection="column" gap="5px" width="160px">
            <span>Data Fim</span>
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              value={dataFim}
              onChange={(event) => {
                setDataFim(event.target.value)
              }}
            />
          </Flex>

          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setPacote(null);
              setDataInicio('')
              setDataFim('')
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
                      <TD>Destino</TD>
                      <TD>Fornecedor</TD>
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
                            {item.Pacotes?.nome}
                          </TD>
                          <TD>
                            {item.Fornecedor?.nome}
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

export default RelatorioPacoteList;
