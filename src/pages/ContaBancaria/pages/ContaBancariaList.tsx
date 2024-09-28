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
import ModalRegisterContaBancaria from "../components/ModalRegisterContaBancaria";
import ModalUpdateContaBancaria from "../components/ModalUpdateContaBancaria";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useContaBancaria from "../../../hooks/useContaBancaria";
import { IContaBancaria } from "../../../models/conta-bancaria.model";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";

const ContaBancariaList = () => {
    const { getContaBancaria, deleteContaBancaria } = useContaBancaria();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterContaBancaria, setModalRegisterContaBancaria] = useState(false);
    const [modalUpdateContaBancaria, setModalUpdateContaBancaria] = useState(false);
    const [modalRemoveContaBancaria, setModalRemoveContaBancaria] = useState(false);
    const [contaBancariaData, setContaBancariaData] = useState<IContaBancaria | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState(null || '')
    const registerPerPage = 10;

    const { mutate: mutateToDeleteContaBancaria } = deleteContaBancaria();
    const [deleteItemId, setDeleteContaBancariaId] = useState('');

    const { data, count, isLoading } = getContaBancaria({
        size: registerPerPage,
        page: currentPage,
        nome,
        status: statusSelected?.value
    });

    const onConfirmRemoveContaBancaria = () => {
        mutateToDeleteContaBancaria(deleteItemId || "");
        setModalRemoveContaBancaria(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Contas Bancárias
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterContaBancaria(true);
                        }}
                    >
                        Cadastrar Conta Bancária
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Conta Bancária</span>
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
                                    label: 'Todos',
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
                                            <TD>Saldo</TD>
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
                                                        {currencyBRLFormat(item.saldo)}
                                                    </TD>
                                                    <TD gap={3}>
                                                        <MdEdit
                                                            size={20}
                                                            // color={customTheme.colors.brandSecond.first}
                                                            cursor="pointer"
                                                            onClick={() => {
                                                                setContaBancariaData(item)
                                                                setModalUpdateContaBancaria(true)
                                                            }}
                                                        />

                                                        <ButtonIcon tooltip="Excluir Conta Bancária">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveContaBancaria(true)
                                                                    setDeleteContaBancariaId(item.id)
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
                            <AlertNoDataFound title="Nenhuma conta encontrada" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Conta Bancária"
                size="xl"
                isOpen={modalRegisterContaBancaria}
                handleModal={setModalRegisterContaBancaria}
            >
                <ModalRegisterContaBancaria
                    handleClose={() => setModalRegisterContaBancaria(false)}
                />
            </SimpleModal>

            {contaBancariaData && (
                <SimpleModal
                    title="Conta Bancária"
                    size="xl"
                    isOpen={modalUpdateContaBancaria}
                    handleModal={setModalUpdateContaBancaria}
                >
                    <ModalUpdateContaBancaria
                        handleClose={() => setModalUpdateContaBancaria(false)}
                        data={contaBancariaData}
                    />
                </SimpleModal>
            )}

            {modalRemoveContaBancaria && (
                <AlertModal
                    title="Remover Conta Bancária"
                    question="Deseja realmente remover essa conta bancária?"
                    request={onConfirmRemoveContaBancaria}
                    showModal={modalRemoveContaBancaria}
                    setShowModal={setModalRemoveContaBancaria}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default ContaBancariaList;
