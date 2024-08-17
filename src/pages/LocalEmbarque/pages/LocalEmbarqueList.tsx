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
import ModalRegisterLocalEmbarque from "../components/ModalRegisterLocalEmbarque";
import ModalUpdateLocalEmbarque from "../components/ModalUpdateLocalEmbarque";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useLocalEmbarque from "../../../hooks/useLocalEmbarque";
import { ILocalEmbarque } from "../../../models/local-embarque.model";

const LocalEmbarqueList = () => {
    const { getAllLocalEmbarque, deleteLocalEmbarque } = useLocalEmbarque();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterLocalEmbarque, setModalRegisterLocalEmbarque] = useState(false);
    const [modalUpdateLocalEmbarque, setModalUpdateLocalEmbarque] = useState(false);
    const [modalRemoveLocalEmbarque, setModalRemoveLocalEmbarque] = useState(false);
    const [localEmbarque, setLocalEmbarqueData] = useState<ILocalEmbarque | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const registerPerPage = 10;

    const { mutate: mutateToDeleteLocalEmbarque } = deleteLocalEmbarque();
    const [deleteItemId, setDeleteLocalEmbarqueId] = useState('');

    const { data, count, isLoading } = getAllLocalEmbarque({
        size: registerPerPage,
        page: currentPage
    });

    const onConfirmRemoveLocalEmbarque = () => {
        mutateToDeleteLocalEmbarque(deleteItemId || "");
        setModalRemoveLocalEmbarque(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Locais de Embarque
                        </Text>
                    </Flex>
                </SectionTop>
                
                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterLocalEmbarque(true);
                        }}
                    >
                        Cadastrar Local Embarque
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Local Embarque</span>
                        <FieldSearch
                            placeholder="Nome"
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
                                            <TD>Hora Embarque</TD>
                                            <TD>Ativo</TD>
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.nome}
                                                    </TD>
                                                    <TD>
                                                        {item.horaEmbarque}
                                                    </TD>
                                                    <TD>
                                                        {item.ativo ? 'Ativo' : 'Inativo'}
                                                    </TD>
                                                    <TD gap={3}>
                                                        <MdEdit
                                                            size={20}
                                                            // color={customTheme.colors.brandSecond.first}
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                setLocalEmbarqueData(item)
                                                                setModalUpdateLocalEmbarque(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Local Embarque">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveLocalEmbarque(true)
                                                                    setDeleteLocalEmbarqueId(item.id)
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
                            <AlertNoDataFound title="Nenhum local de embarque encontrado" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Local Embarque"
                size="xl"
                isOpen={modalRegisterLocalEmbarque}
                handleModal={setModalRegisterLocalEmbarque}
            >
                <ModalRegisterLocalEmbarque
                    handleClose={() => setModalRegisterLocalEmbarque(false)}
                />
            </SimpleModal>

            {localEmbarque && (
                <SimpleModal
                    title="Local Embarque"
                    size="xl"
                    isOpen={modalUpdateLocalEmbarque}
                    handleModal={setModalUpdateLocalEmbarque}
                >
                    <ModalUpdateLocalEmbarque
                        handleClose={() => setModalUpdateLocalEmbarque(false)}
                        data={localEmbarque}
                    />
                </SimpleModal>
            )}

            {modalRemoveLocalEmbarque && (
                <AlertModal
                    title="Remover Local Embarque"
                    question="Deseja realmente remover esse Local de Embarque?"
                    request={onConfirmRemoveLocalEmbarque}
                    showModal={modalRemoveLocalEmbarque}
                    setShowModal={setModalRemoveLocalEmbarque}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default LocalEmbarqueList;
