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
import { dateFormat, phoneMask } from "../../../../../utils";
import ButtonIcon from "../../../../../components/ButtonIcon";
import { FaFileExcel } from "react-icons/fa";
import useFiles from "../../../../../hooks/useFiles";
import { MdEdit } from "react-icons/md";
import SimpleModal from "../../../../../components/SimpleModal";
import ModalRegisterVenda from "../components/ModalRegisterVenda"
import { FaShoppingCart } from "react-icons/fa";


const PassageirosList = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const { getAllPassageiros } = useExcursaoPassageiros();
  const { getExcursao } = useExcursao();
  const { generateCsvPassageiros } = useFiles()
  const { data: dataExcursao, isLoading: loadingExcursao } = getExcursao(_id || '');
  const { isLoading: isLoadingCsv, csv } = generateCsvPassageiros()
  const [dataPassageiro, setDataPassageiro] = useState<{ nome: string, id: string }>()
  const [modalVenda, setModalVenda] = useState(false)

  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getAllPassageiros({
    size: registerPerPage,
    page: currentPage,
    localEmbarque: null
  }, _id || '');

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
                  {dataExcursao.nome}
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
                      <TD>Telefone(Wpp)</TD>
                      <TD>Data Reserva</TD>
                      <TD>Local de Embarque</TD>
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
                            {phoneMask(item.Pessoa.telefoneWpp || '')}
                          </TD>
                          <TD>
                            {dateFormat(new Date(item.dataCadastro))}
                          </TD>
                          <TD>
                            {item.LocalEmbarque.nome}
                          </TD>
                          <TD>
                            <ButtonIcon tooltip="Venda">
                              <FaShoppingCart
                                size={20}
                                cursor="pointer"
                                onClick={() => {
                                  setDataPassageiro({ id: item.Pessoa.id, nome: item.Pessoa.nome })
                                  setModalVenda(true)
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
              <AlertNoDataFound title="Nenhum passageiro encontrado" />
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
    </>
  );
};

export default PassageirosList;
