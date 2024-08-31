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
import ModalRegisterVendas from "../components/ModalRegisterVendas";
import ModalUpdateVendas from "../components/ModalUpdateVendas";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useVendas from "../../../hooks/useVendas";
import { IVendas } from "../../../models/vendas.model";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import { IoCheckmarkCircle } from "react-icons/io5";

const VendasList = () => {
    const { getVendas, deleteVendas } = useVendas();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterVendas, setModalRegisterVendas] = useState(false);
    const [modalUpdateVendas, setModalUpdateVendas] = useState(false);
    const [modalRemoveVendas, setModalRemoveVendas] = useState(false);
    const [VendasData, setVendasData] = useState<IVendas | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const registerPerPage = 10;

    const { mutate: mutateToDeleteVendas } = deleteVendas();
    const [deleteItemId, setDeleteVendasId] = useState('');

    const { data, count, isLoading } = getVendas({
        size: registerPerPage,
        page: currentPage
    });

    debugger

    const onConfirmRemoveVendas = () => {
        mutateToDeleteVendas(deleteItemId || "");
        setModalRemoveVendas(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Vendas
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterVendas(true);
                        }}
                    >
                        Cadastrar Venda
                    </Button>
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Venda</span>
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
                                            <TD>Produto</TD>
                                            <TD>Excursão</TD>
                                            <TD>Quantidade</TD>
                                            <TD>Total</TD>
                                            <TD>Vendedor</TD>
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.Produtos?.nome}
                                                    </TD>
                                                    <TD>
                                                        {item.Excursao?.nome}
                                                    </TD>
                                                    <TD>
                                                        {item.qtd}
                                                    </TD>
                                                    <TD>
                                                        {currencyBRLFormat(item.valor)}
                                                    </TD>
                                                    <TD>
                                                        {item.Usuarios.nome}
                                                    </TD>
                                                    <TD gap={3}>

                                                        <ButtonIcon tooltip="Editar">
                                                            <MdEdit
                                                                size={20}
                                                                cursor="pointer"
                                                                onClick={() => {
                                                                    setVendasData(item)
                                                                    setModalUpdateVendas(true)
                                                                }}
                                                            />
                                                        </ButtonIcon>

                                                        <ButtonIcon tooltip="Excluir Venda">
                                                            <Button
                                                                variant="unstyled"
                                                                display="flex"
                                                                alignItems="center"
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    setModalRemoveVendas(true)
                                                                    setDeleteVendasId(item.id)
                                                                }}
                                                            >
                                                                <FiTrash />
                                                            </Button>
                                                        </ButtonIcon>

                                                        <ButtonIcon tooltip="Efetivar transação">
                                                            <IoCheckmarkCircle
                                                                size={20}
                                                                onClick={() => {

                                                                }}
                                                            />
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
                            <AlertNoDataFound title="Nenhuma venda encontrada" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Venda"
                size="xl"
                isOpen={modalRegisterVendas}
                handleModal={setModalRegisterVendas}
            >
                <ModalRegisterVendas
                    handleClose={() => setModalRegisterVendas(false)}
                />
            </SimpleModal>

            {VendasData && (
                <SimpleModal
                    title="Venda"
                    size="xl"
                    isOpen={modalUpdateVendas}
                    handleModal={setModalUpdateVendas}
                >
                    <ModalUpdateVendas
                        handleClose={() => setModalUpdateVendas(false)}
                        data={VendasData}
                    />
                </SimpleModal>
            )}

            {modalRemoveVendas && (
                <AlertModal
                    title="Remover Venda"
                    question="Deseja realmente remover essa venda?"
                    request={onConfirmRemoveVendas}
                    showModal={modalRemoveVendas}
                    setShowModal={setModalRemoveVendas}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default VendasList;
