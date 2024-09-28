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
import ModalRegisterFornecedor from "../components/ModalRegisterFornecedor";
import ModalUpdateFornecedor from "../components/ModalUpdateFornecedor";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useFornecedor from "../../../hooks/useFornecedor";
import { IFornecedor } from "../../../models/fornecedor.model";
import { cpfMask } from "../../../utils";

const FornecedorList = () => {
    const { getFornecedores, deleteFornecedor } = useFornecedor();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterFornecedor, setModalRegisterFornecedor] = useState(false);
    const [modalUpdateFornecedor, setModalUpdateFornecedor] = useState(false);
    const [modalRemoveFornecedor, setModalRemoveFornecedor] = useState(false);
    const [fornecedorData, setFornecedorData] = useState<IFornecedor | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState(null || '')
    const registerPerPage = 10;

    const { mutate: mutateToDeleteFornecedor } = deleteFornecedor();
    const [deleteItemId, setDeleteFornecedorId] = useState('');

    const { data, count, isLoading } = getFornecedores({
        size: registerPerPage,
        page: currentPage,
        nome,
        status: statusSelected?.value
    });

    const onConfirmRemoveFornecedor = () => {
        mutateToDeleteFornecedor(deleteItemId || "");
        setModalRemoveFornecedor(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Fornecedores
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterFornecedor(true);
                        }}
                    >
                        Cadastrar Fornecedor
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Fornecedor</span>
                        <FieldSearch
                            placeholder="Nome/CNPJ"
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
                                    value: "all"
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
                                            <TD>CNPJ</TD>
                                            <TD>E-Mail</TD>
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
                                                        {cpfMask(item.cnpj)}
                                                    </TD>
                                                    <TD>
                                                        {item.email}
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
                                                                setFornecedorData(item)
                                                                setModalUpdateFornecedor(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Fornecedor">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveFornecedor(true)
                                                                    setDeleteFornecedorId(item.id)
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
                            <AlertNoDataFound title="Nenhuma fornecedor encontrado" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Fornecedor"
                size="xl"
                isOpen={modalRegisterFornecedor}
                handleModal={setModalRegisterFornecedor}
            >
                <ModalRegisterFornecedor
                    handleClose={() => setModalRegisterFornecedor(false)}
                />
            </SimpleModal>

            {fornecedorData && (
                <SimpleModal
                    title="Fornecedor"
                    size="xl"
                    isOpen={modalUpdateFornecedor}
                    handleModal={setModalUpdateFornecedor}
                >
                    <ModalUpdateFornecedor
                        handleClose={() => setModalUpdateFornecedor(false)}
                        data={fornecedorData}
                    />
                </SimpleModal>
            )}

            {modalRemoveFornecedor && (
                <AlertModal
                    title="Remover Fornecedor"
                    question="Deseja realmente remover esse fornecedor?"
                    request={onConfirmRemoveFornecedor}
                    showModal={modalRemoveFornecedor}
                    setShowModal={setModalRemoveFornecedor}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default FornecedorList;
