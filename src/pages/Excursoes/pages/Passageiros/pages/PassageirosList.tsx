import { Button, Flex, Table, TableContainer, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../../../components/Loading";
import Pagination from "../../../../../components/Pagination";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import { ISelect } from "../../../../../models/generics.model";
import AlertNoDataFound from "../../../../../components/AlertNoDataFound";
import useExcursaoPassageiros from "../../../../../hooks/useExcursaoPassageiros";
import useExcursao from "../../../../../hooks/useExcursao";
import { useNavigate, useParams } from "react-router-dom";
import { TBody, TD, THead, TR } from "../../../../../components/Table";
import { phoneMask } from "../../../../../utils";
import ButtonIcon from "../../../../../components/ButtonIcon";
import { FaFileExcel } from "react-icons/fa";
import useFiles from "../../../../../hooks/useFiles";
import SimpleModal from "../../../../../components/SimpleModal";
import ModalRegisterVenda from "../components/ModalRegisterVenda"
import ModalListOpcionais from "../components/ModalListOpcionais"
import { FaShoppingCart } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";
import { IExcursaoPassageiro, IOpcionais } from "../../../../../models/excursao-passageiro.model";
import ModalDetailSummary from "../components/ModalDetailSummary";
import { formattingDate } from "../../../../../utils/formattingDate";

const PassageirosList = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const { getAllPassageiros } = useExcursaoPassageiros();
  const { getExcursao } = useExcursao();
  const { generateCsvPassageiros } = useFiles()
  const { data: dataExcursao, isLoading: loadingExcursao } = getExcursao(_id || '');
  const { isLoading: isLoadingCsv, csv } = generateCsvPassageiros()
  const [dataPassageiro, setDataPassageiro] = useState<{ nome: string, id: string, reserva: string }>()
  const [modalVenda, setModalVenda] = useState(false)
  const [modalOpcionais, setModalOpcionais] = useState(false)
  const [dataOpcionais, setDataOpcionais] = useState<IOpcionais[]>([])
  const [modalAllOpcionais, setModalAllOpcionais] = useState(false)

  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading, summary } = getAllPassageiros({
    size: registerPerPage,
    page: currentPage,
    localEmbarque: null
  }, _id || '');

  let total = 0
  if (!isLoading && summary) {
    total = summary.reduce((previousValue, currentValue) => previousValue + currentValue.sum, 0)
  }

  if (!isLoading && data.length) {
    data.sort((a, b) => {

      const getNumeroCadeira = (item: IExcursaoPassageiro) => {
        return item.Onibus[0]?.numeroCadeira ? parseInt(item.Onibus[0].numeroCadeira, 10) : 0;
      }

      return getNumeroCadeira(a) - getNumeroCadeira(b);
    })
  }


  return (
    <>
      {!loadingExcursao && (
        <>
          <Flex>
            <SectionTop className="contentTop" gap="30px">
              <Button
                variant="outline"
                width="74px"
                onClick={() => navigate("/excursoes")}
              >
                Voltar
              </Button>

              <Flex gap="10px" flexWrap="wrap">
                <ButtonIcon>
                  <FaFileExcel
                    size={20}
                    cursor='pointer'
                    onClick={() => {
                      if (!isLoadingCsv) {
                        csv(_id || '')
                      }
                    }}
                  />
                </ButtonIcon>
                <Text fontSize="2xl" fontWeight="bold">
                  Passageiros:
                </Text>
                <Text fontSize="2xl">
                  {`${formattingDate(dataExcursao.dataInicio)} à ${formattingDate(dataExcursao.dataFim)} ${dataExcursao.nome}`}
                </Text>
              </Flex>
            </SectionTop>
          </Flex>
        </>
      )}

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="500px">
            <span>Passageiros</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum Quarto encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={[
                {
                  label: "Quarto 1",
                  value: 1,
                },
                {
                  label: "Quarto 2",
                  value: 2,
                },
              ]}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setStatusSelected(null);
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
                      <TD>Passageiro</TD>
                      <TD>Reserva</TD>
                      <TD>Telefone  <FaWhatsapp style={{ color: 'green', fontSize: '24px', marginLeft: '5px' }} /></TD>
                      <TD>Local de Embarque</TD>
                      <TD>Poltrona</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.Pessoa.nome}
                          </TD>
                          <TD>
                            {item.Reservas.reserva}
                          </TD>
                          <TD>
                            <FaWhatsapp style={{ color: 'green', fontSize: '24px', marginRight: '5px' }} />
                            <a href={`https://wa.me/55${item.Pessoa.telefoneWpp}`} target="_blank">
                              {phoneMask(item.Pessoa.telefoneWpp || '')}
                            </a>
                          </TD>
                          <TD>
                            {item.LocalEmbarque.nome}
                          </TD>
                          <TD>
                            {item.Onibus[0]?.numeroCadeira || 'Sem Poltrona'}
                          </TD>
                          <TD>
                            <ButtonIcon tooltip="Venda">
                              <FaShoppingCart
                                size={20}
                                cursor="pointer"
                                onClick={() => {
                                  setDataPassageiro({ id: item.Pessoa.id, nome: item.Pessoa.nome, reserva: item.Reservas.id })
                                  setModalVenda(true)
                                }}
                              />
                            </ButtonIcon>

                            {item.Reservas.Opcionais.length && (
                              <ButtonIcon tooltip="Opcionais" style={{ marginLeft: '5px' }}>
                                <FaListOl
                                  size={20}
                                  cursor='pointer'
                                  onClick={() => {
                                    setDataOpcionais(item.Reservas.Opcionais)
                                    setModalOpcionais(true)
                                  }}
                                />
                              </ButtonIcon>
                            )}
                          </TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>

                <h1>Opcionais Adquiridos</h1>

                {summary && (
                  <>
                    {summary.map((value) => (
                      <>
                        <span style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/excursoes/${_id}/opcional-embarque/${value.id}`)
                          }}>
                          <b>{`${value.nome}:`}</b> {`${value.sum}`}
                        </span>
                      </>
                    ))}
                    <br />
                    <span style={{ cursor: 'pointer' }}>
                      <b>Total:</b> {total}
                    </span>
                  </>
                )}

                {data.length === 0 && (
                  <AlertNoDataFound title="Nenhum passageiro encontrado" />
                )}

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}
          </>
        )}
      </Content >

      {modalVenda && (
        <SimpleModal
          title="Venda"
          size="xl"
          isOpen={modalVenda}
          handleModal={setModalVenda}
        >
          <ModalRegisterVenda
            handleClose={() => setModalVenda(false)}
            dataCliente={dataPassageiro}
          />
        </SimpleModal>
      )}

      {modalOpcionais && (
        <SimpleModal
          title="Opcionais"
          size="6xl"
          isOpen={modalOpcionais}
          handleModal={setModalOpcionais}
        >
          <ModalListOpcionais
            handleClose={() => setModalOpcionais(false)}
            data={dataOpcionais}
          />
        </SimpleModal>
      )}

      {modalAllOpcionais && (
        <SimpleModal
          title="Opcionais"
          size="6xl"
          isOpen={modalAllOpcionais}
          handleModal={setModalAllOpcionais}
        >
          <ModalDetailSummary
            handleClose={() => setModalAllOpcionais(false)}
            data={summary}
          />
        </SimpleModal>
      )}
    </>
  );
};

export default PassageirosList;
