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
import ModalRegisterComissao from "../components/ModalRegisterComissao";
import { formattingDate } from "../../../utils/formattingDate";
import { ITransacao } from "../../../models/transacao.model";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import { IRelatorioVendasList } from "./types";
import useUsuario from "../../../hooks/useUsuarios";
import SelectAsyncPaginate from "../../../components/SelectAsyncPaginate";
import { IoIosAdd } from "react-icons/io";

const RelatorioVendaList = ({
  vendaResponse,
  currentPage,
  setCurrentPage,
  codigoUsuario,
  setUsuario,
  dataInicio,
  setDataInicio,
  dataFim,
  setDataFim
}: IRelatorioVendasList) => {
  const [modalRegisterComissao, setModalRegisterComissao] = useState(false);
  const [transacaoData, setTransacaoData] = useState<ITransacao | undefined>();
  const registerPerPage = 10;

  const { usuarioPromiseOptions } = useUsuario()

  const { data, count, isLoading } = vendaResponse

  return (
    <>

      <Flex>
        <SectionTop className="contentTop">
        </SectionTop>

        <SectionTop className="contentTop">
          <Button
            leftIcon={<IoIosAdd />}
            onClick={() => {
              setModalRegisterComissao(true);
            }}
          >
            Cadastrar Comissão
          </Button>
        </SectionTop>

      </Flex>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="200px">
            <SelectAsyncPaginate
              name="passageiros"
              placeholder="Selecione"
              label="Vendedor"
              minW="200px"
              isRequired
              isSearchable
              value={codigoUsuario}
              noOptionsMessage="Nenhum Usuário encontrada"
              promiseOptions={usuarioPromiseOptions}
              handleChange={(option) => {
                setUsuario(option);
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
              setUsuario(null);
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
                      <TD>Excursao</TD>
                      <TD>Reserva</TD>
                      <TD>Valor</TD>
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
                            {`${formattingDate((item.Excursao?.dataInicio || ''))} à ${formattingDate(item.Excursao?.dataFim)} - ${item.Excursao?.nome}`}
                          </TD>
                          <TD>
                            {item.Reservas?.reserva}
                          </TD>
                          <TD style={{ color: item.tipo == 1 ? 'red' : 'green', fontWeight: 'bold' }}>
                            {item.tipo == 1 ? '-' : ''}  {currencyBRLFormat(item.valor)}
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

      <SimpleModal
        title="Comissão"
        size="xl"
        isOpen={modalRegisterComissao}
        handleModal={setModalRegisterComissao}
      >
        <ModalRegisterComissao
          handleClose={() => setModalRegisterComissao(false)}
        />
      </SimpleModal>
    </>
  );
};

export default RelatorioVendaList;
