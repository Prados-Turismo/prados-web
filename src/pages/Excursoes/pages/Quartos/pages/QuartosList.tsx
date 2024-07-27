import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../../../components/Loading";
import Pagination from "../../../../../components/Pagination";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import { ISelect } from "../../../../../models/generics.model";
import AlertNoDataFound from "../../../../../components/AlertNoDataFound";
import useExcursaoQuarto from "../../../../../hooks/useExcursaoQuarto";
import useExcursao from "../../../../../hooks/useExcursao";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../../../components/ButtonIcon";
import { IoIosAdd, IoMdTrash } from "react-icons/io";
import SimpleModal from "../../../../../components/SimpleModal";
import ModalRegisterQuarto from "../components/ModalRegisterQuarto";
import ModalUpdateQuarto from "../components/ModalUpdateQuarto";
import { IExcursaoQuarto } from "../../../../../models/excursao-quarto.model";
import AlertModal from "../../../../../components/AlertModal";

const QuartosList = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const { getExcursaoQuarto, deleteExcursaoQuarto } = useExcursaoQuarto();
  const { getExcursao } = useExcursao();
  const { data: dataExcursao, isLoading: loadingExcursao } = getExcursao(_id || '');

  const [modalRecordQuarto, setModalRecordQuarto] = useState(false);
  const [modalUpdateQuarto, setModalUpdateQuarto] = useState(false);
  const [modalRemoveExcursaoQuarto, setModalRemoveExcursaoQuarto] = useState(false);
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [quartoData, setQuartoData] = useState<IExcursaoQuarto | undefined>();
  const registerPerPage = 10;
  var numeroQuarto: string = '1'

  const { data, count, isLoading } = getExcursaoQuarto({
    size: registerPerPage,
    page: currentPage
  });

  debugger

  const { mutate: mutateToDeleteExcursaoQuarto } = deleteExcursaoQuarto();
  const [deleteItemId, setDeleteExcursaoQuartoId] = useState('');

  const onConfirmRemoveExcursaoQuarto = () => {
    mutateToDeleteExcursaoQuarto(deleteItemId || "");
    setModalRemoveExcursaoQuarto(false);
  };

  const returnRoomName = () => {
    const result = data.sort((a, b) => a.numeroQuarto.localeCompare(b.numeroQuarto));

    let roomName = result.slice(-1)[0].numeroQuarto.split(' ')[1]
    return `${(parseInt(roomName) + 1)}`
  }

  if (!isLoading && data.length) {
    numeroQuarto = returnRoomName();
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
                <Text fontSize="2xl" fontWeight="bold">
                  Quartos:
                </Text>
                <Text fontSize="2xl">
                  {dataExcursao.nome}
                </Text>
              </Flex>
            </SectionTop>

            <SectionTop className="contentTop" gap="30px" justifyContent="end">
              <Button
                leftIcon={<IoIosAdd />}
                onClick={() => {
                  setModalRecordQuarto(true);
                }}
              >
                Adicionar Quarto
              </Button>
            </SectionTop>
          </Flex>
        </>
      )}

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="500px">
            <span>Quarto</span>

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
                <Accordion allowMultiple>
                  {data.map((item, index) => (
                    <AccordionItem key={item.id}>
                      <h2>
                        <AccordionButton>
                          <Box as='span' flex='1' textAlign='left'>
                            {`${item.numeroQuarto} - ${item.TipoQuarto.nome}`}
                          </Box>

                          <Box marginEnd={3}>
                            <ButtonIcon tooltip="Editar Quarto">
                              <MdEdit
                                size={18}
                                // color={customTheme.colors.brandSecond.first}
                                cursor="pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setModalUpdateQuarto(true)
                                  setQuartoData(item)
                                }}
                              />
                            </ButtonIcon>
                          </Box>

                          <Box marginEnd={6}>
                            <ButtonIcon tooltip="Excluir Quarto">
                              <IoMdTrash
                                size={18}
                                onClick={(e) => {
                                  setModalRemoveExcursaoQuarto(true)
                                  setDeleteExcursaoQuartoId(item.id)
                                }}
                              />
                            </ButtonIcon>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        pt={4}
                        pl={12}
                        display="flex"
                        flexDirection="column"
                      >
                        <ul>
                          {item.Passageiros.map((pass, index) => (
                            <li key={pass.Pessoa.id}>{`${pass.reserva} - ${pass.Pessoa.nome}`}</li>
                          ))}

                        </ul>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum quarto encontrado" />
            )}
          </>
        )}
      </Content >

      <SimpleModal
        title="Quarto"
        size="xl"
        isOpen={modalRecordQuarto}
        handleModal={setModalRecordQuarto}
      >
        <ModalRegisterQuarto
          handleClose={() => setModalRecordQuarto(false)}
          numeroQuarto={numeroQuarto}
        />
      </SimpleModal>

      {quartoData && (
        <SimpleModal
          title="Quarto"
          size="xl"
          isOpen={modalUpdateQuarto}
          handleModal={setModalUpdateQuarto}
        >
          <ModalUpdateQuarto
            handleClose={() => setModalUpdateQuarto(false)}
            data={quartoData}
          />
        </SimpleModal>
      )}

      {modalRemoveExcursaoQuarto && (
        <AlertModal
          title="Remover Quarto"
          question="Deseja realmente remover este quarto?"
          request={onConfirmRemoveExcursaoQuarto}
          showModal={modalRemoveExcursaoQuarto}
          setShowModal={setModalRemoveExcursaoQuarto}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default QuartosList;
