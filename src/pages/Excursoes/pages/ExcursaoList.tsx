import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd, IoMdBus, IoMdPaper, IoMdTrash } from "react-icons/io";
import FieldSearch from "../../../components/FieldSearch";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import SimpleModal from "../../../components/SimpleModal";
import { ISelect } from "../../../models/generics.model";
import ModalRecordExcursao from "../components/ModalRegisterExcursao";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import useProduct from "../../../hooks/useProducts";
import { MdEdit } from "react-icons/md";
import ModalUpdateExcursao from "../components/ModalUpdateExcursao";
import { IDataProduct } from "../../../models/product2.model";
import ButtonIcon from "../../../components/ButtonIcon";
import AlertModal from "../../../components/AlertModal";
import { IoBed } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ExcursaoList = () => {
  const navigate = useNavigate();
  const { getProducts } = useProduct();

  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [resetFilter, setResetFilter] = useState(false);
  const [modalRecordExcursao, setModalRecordExcursao] = useState(false);
  const [modalUpdateExcursao, setModalUpdateExcursao] = useState(false);
  const [modalRemoveExcursao, setModalRemoveExcursao] = useState(false);
  const [excursaoData, setExcursaoData] = useState<IDataProduct | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getProducts({
    size: registerPerPage,
    page: currentPage
  });

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          leftIcon={<IoIosAdd />}
          onClick={() => {
            setModalRecordExcursao(true);
          }}
        >
          Cadastrar excursão
        </Button>
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <div className="searchWrap">
            <span>Buscar excursão</span>
            <FieldSearch
              placeholder="Nome ou CPF"
              handleSearch={() => {
                setResetFilter(false);
                setCurrentPage(1);
              }}
              reset={resetFilter}
            />
          </div>
          <Flex flexDirection="column" gap="5px" width="300px">
            <span>Status</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum Status encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={[
                {
                  label: "Completo",
                  value: 1,
                },
                {
                  label: "Incompleto",
                  value: 2,
                },
              ]}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setResetFilter(true);
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
                      <TD>Nome</TD>
                      <TD>Pacote</TD>
                      <TD>Data Início</TD>
                      <TD>Data Fim</TD>
                      <TD>Status</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.nome}
                          </TD>
                          <TD>
                            {item.estoque}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            {item.ativo ? "Ativo" : "Inativo"}
                          </TD>
                          <TD gap={3}>
                            <MdEdit
                              size={20}
                              // color={customTheme.colors.brandSecond.first}
                              cursor="pointer"
                              onClick={() => {
                                setExcursaoData(item)
                                setModalUpdateExcursao(true)
                              }}
                            />

                            <ButtonIcon tooltip="Ônibus">
                              <IoMdBus
                                size={20}
                                onClick={() => {}}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Embarque">
                              <IoMdPaper
                                size={20}
                                onClick={() => navigate(`/excursoes/${item.id}/embarque`)}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Quartos">
                              <IoBed
                                size={20}
                                onClick={() => {}}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Excluir Excursao">
                              <IoMdTrash
                                size={20}
                                onClick={() => setModalRemoveExcursao(true)}
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
              <AlertNoDataFound title="Nenhuma excursão encontrado" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Excursão"
        size="xl"
        isOpen={modalRecordExcursao}
        handleModal={setModalRecordExcursao}
      >
        <ModalRecordExcursao
          handleClose={() => setModalRecordExcursao(false)}
        />
      </SimpleModal>

      {excursaoData && (
        <SimpleModal
          title="Excursão"
          size="xl"
          isOpen={modalUpdateExcursao}
          handleModal={setModalUpdateExcursao}
        >
          <ModalUpdateExcursao
            handleClose={() => setModalUpdateExcursao(false)}
            // data={excursaoData}
          />
        </SimpleModal>
      )}

      {modalRemoveExcursao && (
        <AlertModal
          title="Remover Excursão"
          question="Deseja realmente remover esta excursão?"
          request={() => {}}
          showModal={modalRemoveExcursao}
          setShowModal={setModalRemoveExcursao}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default ExcursaoList;
