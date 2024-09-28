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
import ModalRegisterRankingCliente from "../components/ModalRegisterRankingCliente";
import ModalUpdateRankingCliente from "../components/ModalUpdateRankingCliente";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useRankingCliente from "../../../hooks/useRankingCliente";
import { IRankingCliente } from "../../../models/ranking-cliente.model";

const RankingClienteList = () => {
    const { getRankingCliente, deleteRankingCliente } = useRankingCliente();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterRankingCliente, setModalRegisterRankingCliente] = useState(false);
    const [modalUpdateRankingCliente, setModalUpdateRankingCliente] = useState(false);
    const [modalRemoveRankingCliente, setModalRemoveRankingCliente] = useState(false);
    const [rankingClienteData, setRankingClienteData] = useState<IRankingCliente | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState(null || '')
    const registerPerPage = 10;

    const { mutate: mutateToDeleteRankingCliente } = deleteRankingCliente();
    const [deleteItemId, setDeleteRankingClienteId] = useState('');

    const { data, count, isLoading } = getRankingCliente({
        size: registerPerPage,
        page: currentPage,
        nome
    });

    const onConfirmRemoveRankingCliente = () => {
        mutateToDeleteRankingCliente(deleteItemId || "");
        setModalRemoveRankingCliente(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Rankings Cliente
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterRankingCliente(true);
                        }}
                    >
                        Cadastrar Ranking
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Ranking</span>
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
                                            <TD>Mínimo de Viagens</TD>
                                            <TD>Máximo de Viagens</TD>
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.nome}
                                                    </TD>
                                                    <TD>
                                                        {item.qtdMinViagens}
                                                    </TD>
                                                    <TD>
                                                        {item.qtdMaxViagens}
                                                    </TD>
                                                    <TD gap={3}>
                                                        <MdEdit
                                                            size={20}
                                                            // color={customTheme.colors.brandSecond.first}
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                setRankingClienteData(item)
                                                                setModalUpdateRankingCliente(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Ranking">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveRankingCliente(true)
                                                                    setDeleteRankingClienteId(item.id)
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
                            <AlertNoDataFound title="Nenhum ranking encontrado" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Ranking"
                size="xl"
                isOpen={modalRegisterRankingCliente}
                handleModal={setModalRegisterRankingCliente}
            >
                <ModalRegisterRankingCliente
                    handleClose={() => setModalRegisterRankingCliente(false)}
                />
            </SimpleModal>

            {rankingClienteData && (
                <SimpleModal
                    title="Ranking"
                    size="xl"
                    isOpen={modalUpdateRankingCliente}
                    handleModal={setModalUpdateRankingCliente}
                >
                    <ModalUpdateRankingCliente
                        handleClose={() => setModalUpdateRankingCliente(false)}
                        data={rankingClienteData}
                    />
                </SimpleModal>
            )}

            {modalRemoveRankingCliente && (
                <AlertModal
                    title="Remover Ranking"
                    question="Deseja realmente remover essa ranking?"
                    request={onConfirmRemoveRankingCliente}
                    showModal={modalRemoveRankingCliente}
                    setShowModal={setModalRemoveRankingCliente}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default RankingClienteList;
