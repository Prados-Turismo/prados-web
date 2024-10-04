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
import ModalRegisterUsuarios from "../components/ModalRegisterUsuarios";
import ModalUpdateUsuarios from "../components/ModalUpdateUsuarios";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useUsuarios from "../../../hooks/useUsuarios";
import { IUsuario } from "../../../models/usuarios.model";

const UsuariosList = () => {
    const { getUsuario, deleteUsuario } = useUsuarios();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterUsuarios, setModalRegisterUsuario] = useState(false);
    const [modalUpdateUsuarios, setModalUpdateUsuario] = useState(false);
    const [modalRemoveUsuario, setModalRemoveUsuario] = useState(false);
    const [UsuarioData, setUsuarioData] = useState<IUsuario | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState('')
    const registerPerPage = 10;

    const { mutate: mutateToDeleteUsuario } = deleteUsuario();
    const [deleteItemId, setDeleteUsuarioId] = useState('');

    const { data, count, isLoading } = getUsuario({
        size: registerPerPage,
        page: currentPage,
        nome,
        status: statusSelected?.value
    });

    const onConfirmRemoveUsuario = () => {
        mutateToDeleteUsuario(deleteItemId || "");
        setModalRemoveUsuario(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Usuários
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterUsuario(true);
                        }}
                    >
                        Cadastrar Usuário
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Usuário</span>
                        <FieldSearch
                            placeholder="Nome"
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
                                            <TD>Status</TD>
                                            <TD>Tipo</TD>
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.nome}
                                                    </TD>
                                                    <TD>
                                                        {item.ativo ? 'Ativo' : 'Inativo'}
                                                    </TD>
                                                    <TD>
                                                        {item.tipo == 1 ? 'Admin' : 'Vendedor'}
                                                    </TD>
                                                    <TD gap={3}>
                                                        <MdEdit
                                                            size={20}
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                setUsuarioData(item)
                                                                setModalUpdateUsuario(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Usuário">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveUsuario(true)
                                                                    setDeleteUsuarioId(item.id)
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
                            <AlertNoDataFound title="Nenhum usuário encontrado" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Usuário"
                size="xl"
                isOpen={modalRegisterUsuarios}
                handleModal={setModalRegisterUsuario}
            >
                <ModalRegisterUsuarios
                    handleClose={() => setModalRegisterUsuario(false)}
                />
            </SimpleModal>

            {UsuarioData && (
                <SimpleModal
                    title="Usuário"
                    size="xl"
                    isOpen={modalUpdateUsuarios}
                    handleModal={setModalUpdateUsuario}
                >
                    <ModalUpdateUsuarios
                        handleClose={() => setModalUpdateUsuario(false)}
                        data={UsuarioData}
                    />
                </SimpleModal>
            )}

            {modalRemoveUsuario && (
                <AlertModal
                    title="Remover Usuário"
                    question="Deseja realmente remover esse Usuário?"
                    request={onConfirmRemoveUsuario}
                    showModal={modalRemoveUsuario}
                    setShowModal={setModalRemoveUsuario}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default UsuariosList;
