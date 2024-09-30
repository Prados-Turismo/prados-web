import { Button, Flex, TableContainer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
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
import ModalRecordPacote from "../components/ModalRegisterPacote";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import usePacotes from "../../../hooks/usePacotes";
import { MdEdit } from "react-icons/md";
import ModalUpdatePacote from "../components/ModalUpdatePacote";
import { IDataPacote } from "../../../models/pacote.model";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";

const PacotesList = () => {
  const { getPacotes, deletePacote } = usePacotes();
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [resetFilter, setResetFilter] = useState(false);
  const [modalRecordPacote, setModalRecordPacote] = useState(false);
  const [modalUpdatePacote, setModalUpdatePacote] = useState(false);
  const [modalRemovePacote, setModalRemovePacote] = useState(false);
  const [pacoteData, setPacoteData] = useState<IDataPacote | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [nome, setNome] = useState(null || '')
  const [origem, setOrigemSelected] = useState<ISelect | null>()
  const registerPerPage = 10;

  const { mutate: mutateToDeletePacote } = deletePacote();
  const [deleteItemId, setDeletePacoteId] = useState('');


  const { data, count, isLoading } = getPacotes({
    size: registerPerPage,
    page: currentPage,
    nome,
    status: statusSelected?.value,
    origem: origem?.value
  });

  const onConfirmRemovePacote = () => {
    mutateToDeletePacote(deleteItemId || "");
    setModalRemovePacote(false);
  };

  return (
    <>
      <Flex>
        <SectionTop className="contentTop" gap="30px">
          <Flex gap="10px" flexWrap="wrap">
            <Text fontSize="2xl" fontWeight="bold">
              Destinos
            </Text>
          </Flex>
        </SectionTop>

        <SectionTop className="contentTop">
          <Button
            leftIcon={<IoIosAdd />}
            onClick={() => {
              setModalRecordPacote(true);
            }}
          >
            Cadastrar destino
          </Button>
        </SectionTop>
      </Flex>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <div className="searchWrap">
            <span>Buscar destino</span>
            <FieldSearch
              placeholder="Nome ou Destino"
              handleSearch={(event) => {
                setResetFilter(false);
                setCurrentPage(1);
                setNome(event)
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
                  label: "Todos",
                  value: 'all'
                },
                {
                  label: "Ativo",
                  value: 1,
                },
                {
                  label: "Inativo",
                  value: 0,
                },
              ]}
            />
          </Flex>
          <Flex flexDirection="column" gap="5px" width="300px">
            <span>Origem</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum Status encontrado"}
              onChange={(item) => {
                setOrigemSelected(item);
              }}
              options={[
                {
                  label: "Todos",
                  value: 'all'
                },
                {
                  label: "Fortaleza",
                  value: 1,
                },
                {
                  label: "Tianguá",
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
                      <TD>Origem</TD>
                      <TD>Opcionais</TD>
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
                            {item.origem == 1 ? 'Fortaleza' : 'Tianguá'}
                          </TD>
                          <TD>
                            {item.Produto.map((opcionais, index) => { return `${opcionais.nome}${index == item.Produto.length - 1 ? '' : ', '}` })}
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
                                setPacoteData(item)
                                setModalUpdatePacote(true)
                              }}
                            />

                            <ButtonIcon tooltip="Excluir Pacote">
                              <Button
                                variant="unstyled"
                                display="flex"
                                alignItems="center"
                                colorScheme="red"
                                onClick={() => {
                                  setModalRemovePacote(true)
                                  setDeletePacoteId(item.id)
                                }}
                              >
                                <FiTrash />
                              </Button>
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
              <AlertNoDataFound title="Nenhum destino encontrado" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Destino"
        size="xl"
        isOpen={modalRecordPacote}
        handleModal={setModalRecordPacote}
      >
        <ModalRecordPacote
          handleClose={() => setModalRecordPacote(false)}
        />
      </SimpleModal>

      {pacoteData && (
        <SimpleModal
          title="Destino"
          size="xl"
          isOpen={modalUpdatePacote}
          handleModal={setModalUpdatePacote}
        >
          <ModalUpdatePacote
            handleClose={() => setModalUpdatePacote(false)}
            data={pacoteData}
          />
        </SimpleModal>
      )}

      {modalRemovePacote && (
        <AlertModal
          title="Remover Destino"
          question="Deseja realmente remover este destino?"
          request={onConfirmRemovePacote}
          showModal={modalRemovePacote}
          setShowModal={setModalRemovePacote}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default PacotesList;
