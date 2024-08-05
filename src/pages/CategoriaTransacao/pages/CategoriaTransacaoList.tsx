import { Button, Flex, TableContainer } from "@chakra-ui/react";
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
import ModalRegisterCategoriaTransacao from "../components/ModalRegisterCategoriaTransacao";
import ModalUpdateCategoriaTransacao from "../components/ModalUpdateCategoriaTransacao";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useCategoriaTransacao from "../../../hooks/useCategoriaTransacao";
import { ICategoriaTransacao } from "../../../models/categoria-transacao.model";

const CategoriaTransacaoList = () => {
    const { getCategoriaTransacao, deleteCategoriaTransacao } = useCategoriaTransacao();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterCategoriaTransacao, setModalRegisterCategoriaTransacao] = useState(false);
    const [modalUpdateCategoriaTransacao, setModalUpdateCategoriaTransacao] = useState(false);
    const [modalRemoveCategoriaTransacao, setModalRemoveCategoriaTransacao] = useState(false);
    const [categoriaTransacaoData, setCategoriaTransacaoData] = useState<ICategoriaTransacao | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const registerPerPage = 10;

    const { mutate: mutateToDeleteCategoriaTransacao } = deleteCategoriaTransacao();
    const [deleteItemId, setDeleteCategoriaTransacaoId] = useState('');

    const { data, count, isLoading } = getCategoriaTransacao({
        size: registerPerPage,
        page: currentPage
    });

    const onConfirmRemoveCategoria = () => {
        mutateToDeleteCategoriaTransacao(deleteItemId || "");
        setModalRemoveCategoriaTransacao(false);
    };

    return (
        <>
            <SectionTop className="contentTop">
                <Button
                    leftIcon={<IoIosAdd />}
                    onClick={() => {
                        setModalRegisterCategoriaTransacao(true);
                    }}
                >
                    Cadastrar Categoria Transação
                </Button>
            </SectionTop>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Categoria Transação</span>
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
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.nome}
                                                    </TD>
                                                    <TD gap={3}>
                                                        <MdEdit
                                                            size={20}
                                                            // color={customTheme.colors.brandSecond.first}
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                setCategoriaTransacaoData(item)
                                                                setModalUpdateCategoriaTransacao(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Categoria Transação">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveCategoriaTransacao(true)
                                                                    setDeleteCategoriaTransacaoId(item.id)
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
                            <AlertNoDataFound title="Nenhuma categoria encontrada" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Categoria Transação"
                size="xl"
                isOpen={modalRegisterCategoriaTransacao}
                handleModal={setModalRegisterCategoriaTransacao}
            >
                <ModalRegisterCategoriaTransacao
                    handleClose={() => setModalRegisterCategoriaTransacao(false)}
                />
            </SimpleModal>

            {categoriaTransacaoData && (
                <SimpleModal
                    title="Categoria Transação"
                    size="xl"
                    isOpen={modalUpdateCategoriaTransacao}
                    handleModal={setModalUpdateCategoriaTransacao}
                >
                    <ModalUpdateCategoriaTransacao
                        handleClose={() => setModalUpdateCategoriaTransacao(false)}
                        data={categoriaTransacaoData}
                    />
                </SimpleModal>
            )}

            {modalRemoveCategoriaTransacao && (
                <AlertModal
                    title="Remover Categoria Transação"
                    question="Deseja realmente remover essa categoria transação?"
                    request={onConfirmRemoveCategoria}
                    showModal={modalRemoveCategoriaTransacao}
                    setShowModal={setModalRemoveCategoriaTransacao}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default CategoriaTransacaoList;
