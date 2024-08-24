import { Button, Flex, TableContainer, Tooltip, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd, IoMdClose } from "react-icons/io";
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
import ModalRegisterReservas from "../components/ModalRegisterReservas";
import ModalUpdateReservas from "../components/ModalUpdateReservas";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useReservas from "../../../hooks/useReservas";
import { IReserva } from "../../../models/reservas.model";
import { IoTicket } from "react-icons/io5";
import { AiFillPrinter } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { formattingDate } from "../../../utils/formattingDate";
import { FaShoppingCart } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const ReservasList = () => {
    const { getReserva, deleteReserva } = useReservas();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterReserva, setModalRegisterReserva] = useState(false);
    const [modalUpdateReserva, setModalUpdateReserva] = useState(false);
    const [modalRemoveReserva, setModalRemoveReserva] = useState(false);
    const [reservaData, setReservaData] = useState<IReserva | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const registerPerPage = 10;
    const navigate = useNavigate()

    const { mutate: mutateToDeleteReserva } = deleteReserva();
    const [deleteItemId, setDeleteReservaId] = useState('');

    const { data, count, isLoading } = getReserva({
        size: registerPerPage,
        page: currentPage
    });

    const onConfirmRemoveReserva = () => {
        mutateToDeleteReserva(deleteItemId || "");
        setModalRemoveReserva(false);
    };

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Reservas
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    <Button
                        leftIcon={<IoIosAdd />}
                        onClick={() => {
                            setModalRegisterReserva(true);
                        }}
                    >
                        Cadastrar Reserva
                    </Button>
                </SectionTop>
            </Flex>
            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Reserva</span>
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
                                            <TD>Situação</TD>
                                            <TD>Reseva</TD>
                                            <TD>Vouchers</TD>
                                            <TD>Detalhes</TD>
                                            <TD>Excursão</TD>
                                            <TD>Data / Hora</TD>
                                            <TD></TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.status ? (
                                                            <Tooltip label="Efetivado" placement="top" hasArrow>
                                                                <div style={{
                                                                    backgroundColor: "green",
                                                                    borderRadius: "50%",
                                                                    width: "10px",
                                                                    height: "10px"
                                                                }} />
                                                            </Tooltip>
                                                        ) : (
                                                            <Tooltip label="Pendente" placement="top" hasArrow>
                                                                <div style={{
                                                                    backgroundColor: "red",
                                                                    borderRadius: "50%",
                                                                    width: "10px",
                                                                    height: "10px"
                                                                }} />
                                                            </Tooltip>
                                                        )}
                                                    </TD>
                                                    <TD>
                                                        {item.reserva}
                                                    </TD>
                                                    <TD>
                                                        {item.Pessoa?.length}
                                                    </TD>
                                                    <TD>
                                                        {item.plataforma == 1 ? (
                                                            <ButtonIcon tooltip="Loja">
                                                                <FaShoppingCart />
                                                            </ButtonIcon>

                                                        ) : (
                                                            <ButtonIcon tooltip={`Sistema Por: ${item.Usuario.nome}`}>
                                                                <GrSystem />
                                                            </ButtonIcon>
                                                        )}
                                                    </TD>
                                                    <TD>
                                                        {item.Excursao?.nome}
                                                    </TD>
                                                    <TD>
                                                        {formattingDate(item.dataCadastro, true)}
                                                    </TD>
                                                    <TD gap={3}>

                                                        {!item.status && (
                                                            <ButtonIcon tooltip="Editar">
                                                                <MdEdit
                                                                    size={20}
                                                                    cursor="pointer"
                                                                    onClick={() => {
                                                                        // setTransacaoData(item)
                                                                        // setModalUpdateTransacao(true)
                                                                    }}
                                                                />
                                                            </ButtonIcon>
                                                        )}

                                                        <ButtonIcon tooltip="Ver Voucher">
                                                            <IoTicket
                                                                size={20}
                                                                onClick={() => { navigate(`/reservas/${item.id}/voucher`) }}
                                                            />
                                                        </ButtonIcon>

                                                        <ButtonIcon tooltip="Enviar E-mail com voucher">
                                                            <MdOutgoingMail
                                                                size={20}
                                                                onClick={() => { }}
                                                            />
                                                        </ButtonIcon>

                                                        <ButtonIcon tooltip="Cancelar reserva">
                                                            <IoMdClose
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
                            <AlertNoDataFound title="Nenhuma reserva encontrada" />
                        )}
                    </>
                )}
            </Content>

            <SimpleModal
                title="Reserva"
                size="xl"
                isOpen={modalRegisterReserva}
                handleModal={setModalRegisterReserva}
            >
                <ModalRegisterReservas
                    handleClose={() => setModalRegisterReserva(false)}
                />
            </SimpleModal>

            {reservaData && (
                <SimpleModal
                    title="Reserva"
                    size="xl"
                    isOpen={modalUpdateReserva}
                    handleModal={setModalUpdateReserva}
                >
                    <ModalUpdateReservas
                        handleClose={() => setModalUpdateReserva(false)}
                        data={reservaData}
                    />
                </SimpleModal>
            )}

            {modalRemoveReserva && (
                <AlertModal
                    title="Remover Reserva"
                    question="Deseja realmente remover essa reserva?"
                    request={onConfirmRemoveReserva}
                    showModal={modalRemoveReserva}
                    setShowModal={setModalRemoveReserva}
                    size="md"
                ></AlertModal>
            )}
        </>
    );
};

export default ReservasList;
