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
import ModalRegisterSubCategoriaTransacao from "../components/ModalRegisterSubCategoriaTransacao";
import ModalUpdateSubCategoriaTransacao from "../components/ModalUpdateSubCategoriaTransacao";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useSubCategoriaTransacao from "../../../hooks/useSubCategoriaTransacao";
import { ISubCategoriaTransacao } from "../../../models/subcategoria-transacao.model";

const SubCategoriaTransacaoList = () => {
    const { getSubCategoriaTransacao, deleteSubCategoriaTransacao } = useSubCategoriaTransacao();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterSubCategoriaTransacao, setModalRegisterSubCategoriaTransacao] = useState(false);
    const [modalUpdateSubCategoriaTransacao, setModalUpdateSubCategoriaTransacao] = useState(false);
    const [modalRemoveSubCategoriaTransacao, setModalRemoveSubCategoriaTransacao] = useState(false);
    const [subCategoriaTransacaoData, setSubCategoriaTransacaoData] = useState<ISubCategoriaTransacao | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState(null || '')
    const registerPerPage = 10;

    const { mutate: mutateToDeleteSubCategoriaTransacao } = deleteSubCategoriaTransacao();
    const [deleteItemId, setDeleteSubCategoriaTransacaoId] = useState('');

    const { data, count, isLoading } = getSubCategoriaTransacao({
        size: registerPerPage,
        page: currentPage,
        nome
    });

    const onConfirmRemoveSubCategoria = () => {
        mutateToDeleteSubCategoriaTransacao(deleteItemId || "");
        setModalRemoveSubCategoriaTransacao(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Subcategorias de Transção
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterSubCategoriaTransacao(true);
                        }}
                    >
                        Cadastrar Subcategoria Transação
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Subcategoria Transação</span>
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
                                            <TD>Categoria</TD>
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.nome}
                                                    </TD>
                                                    <TD>
                                                        {item.CategoriaTransacao[0]?.nome || ''}
                                                    </TD>
                                                    <TD gap={3}>
                                                        <MdEdit
                                                            size={20}
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                setSubCategoriaTransacaoData(item)
                                                                setModalUpdateSubCategoriaTransacao(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Subcategoria Transação">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveSubCategoriaTransacao(true)
                                                                    setDeleteSubCategoriaTransacaoId(item.id)
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
                            <AlertNoDataFound title="Nenhuma subcategoria encontrada" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Subcategoria Transação"
                size="xl"
                isOpen={modalRegisterSubCategoriaTransacao}
                handleModal={setModalRegisterSubCategoriaTransacao}
            >
                <ModalRegisterSubCategoriaTransacao
                    handleClose={() => setModalRegisterSubCategoriaTransacao(false)}
                />
            </SimpleModal>

            {subCategoriaTransacaoData && (
                <SimpleModal
                    title="Subcategoria Transação"
                    size="xl"
                    isOpen={modalUpdateSubCategoriaTransacao}
                    handleModal={setModalUpdateSubCategoriaTransacao}
                >
                    <ModalUpdateSubCategoriaTransacao
                        handleClose={() => setModalUpdateSubCategoriaTransacao(false)}
                        data={subCategoriaTransacaoData}
                    />
                </SimpleModal>
            )}

            {modalRemoveSubCategoriaTransacao && (
                <AlertModal
                    title="Remover Subcategoria Transação"
                    question="Deseja realmente remover essa subcategoria transação?"
                    request={onConfirmRemoveSubCategoria}
                    showModal={modalRemoveSubCategoriaTransacao}
                    setShowModal={setModalRemoveSubCategoriaTransacao}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default SubCategoriaTransacaoList;
