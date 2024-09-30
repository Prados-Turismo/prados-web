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
import ModalRegisterTipoQuarto from "../components/ModalRegisterTipoQuarto";
import ModalUpdateTipoQuarto from "../components/ModalUpdateTipoQuarto";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import useTipoQuarto from "../../../hooks/useTipoQuarto";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import { ITipoQuarto } from "../../../models/tipo-quarto.model";

const TipoQuartoList = () => {
    const { getTipoQuartos, deleteTipoQuarto } = useTipoQuarto();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterTipoQuarto, setModalRegisterTipoQuarto] = useState(false);
    const [modalUpdateTipoQuarto, setModalUpdateTipoQuarto] = useState(false);
    const [modalRemoveTipoQuarto, setModalRemoveTipoQuarto] = useState(false);
    const [tipoQuartoData, setTipoQuartoData] = useState<ITipoQuarto | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState(null || '')
    const registerPerPage = 10;

    const { mutate: mutateToDeleteTipoQuarto } = deleteTipoQuarto();
    const [deleteItemId, setDeleteTipoQuartoId] = useState('');

    const { data, count, isLoading } = getTipoQuartos({
        size: registerPerPage,
        page: currentPage,
        nome,
        status: statusSelected?.value
    });

    const onConfirmRemoveProduto = () => {
        mutateToDeleteTipoQuarto(deleteItemId || "");
        setModalRemoveTipoQuarto(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Tipos de Quartos
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterTipoQuarto(true);
                        }}
                    >
                        Cadastrar Tipo Quarto
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Tipo Quarto</span>
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
                                                                setTipoQuartoData(item)
                                                                setModalUpdateTipoQuarto(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Tipo Quarto">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveTipoQuarto(true)
                                                                    setDeleteTipoQuartoId(item.id)
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
                            <AlertNoDataFound title="Nenhum tipo quarto encontrado" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Tipo Quarto"
                size="xl"
                isOpen={modalRegisterTipoQuarto}
                handleModal={setModalRegisterTipoQuarto}
            >
                <ModalRegisterTipoQuarto
                    handleClose={() => setModalRegisterTipoQuarto(false)}
                />
            </SimpleModal>

            {tipoQuartoData && (
                <SimpleModal
                    title="Tipo Quarto"
                    size="xl"
                    isOpen={modalUpdateTipoQuarto}
                    handleModal={setModalUpdateTipoQuarto}
                >
                    <ModalUpdateTipoQuarto
                        handleClose={() => setModalUpdateTipoQuarto(false)}
                        data={tipoQuartoData}
                    />
                </SimpleModal>
            )}

            {modalRemoveTipoQuarto && (
                <AlertModal
                    title="Remover Tipo Quarto"
                    question="Deseja realmente remover este tipo de quarto?"
                    request={onConfirmRemoveProduto}
                    showModal={modalRemoveTipoQuarto}
                    setShowModal={setModalRemoveTipoQuarto}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default TipoQuartoList;
