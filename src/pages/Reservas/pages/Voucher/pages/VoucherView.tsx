import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Box, Heading, HStack, Icon, Text, useColorModeValue, Button, Flex } from '@chakra-ui/react';
import { LuAlarmClock } from "react-icons/lu";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";



// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ButtonIcon from "../../../../../components/ButtonIcon";
import useReservas from "../../../../../hooks/useReservas";
import { formattingDate } from "../../../../../utils/formattingDate";
import { FaCalendarAlt, FaShoppingCart, FaStore } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { currencyBRLFormat } from '../../../../../utils/currencyBRLFormat';

const VoucherView = () => {
    const { findReserva } = useReservas();
    const { id: _id } = useParams();
    const navigate = useNavigate()
    const { data, isLoading } = findReserva(_id || '');

    return (
        <>
            <SectionTop className="contentTop">
                <Button
                    variant="outline"
                    width="74px"
                    onClick={() => navigate("/reservas")}
                >
                    Voltar
                </Button>
            </SectionTop>
            <Content className="contentMain">
                {!isLoading && (
                    <>
                        <Box bg={useColorModeValue('white', 'gray.800')} p={4} rounded="md">
                            <Flex
                                gap="15px"
                                flexDirection={{
                                    base: "column",
                                    lg: "row",
                                }}
                            >
                                <Heading as="h3" size="md">Reserva N° {data.reserva}</Heading>

                                <Box ml="auto" justifyContent="flex-end">
                                    <Heading as="h3" size="sm">Situação</Heading>
                                    {data.status == false ? (
                                        <FaExclamationCircle
                                            size="55px"
                                            color='orange'
                                        />
                                    ) : (
                                        <FaCheckCircle
                                            size="55px"
                                            color='green'
                                        />
                                    )}
                                </Box>

                            </Flex>

                            <br />
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>
                                                <Icon as={FaCalendarAlt} /> {formattingDate(data.dataCadastro, true).split(',')[0]}
                                            </Th>
                                            <Th>
                                                <Icon as={LuAlarmClock} /> {formattingDate(data.dataCadastro, true).split(',')[1]}
                                            </Th>
                                            <Th>{data.plataforma == 1 ? (
                                                <ButtonIcon tooltip="Loja">
                                                    <FaShoppingCart />
                                                </ButtonIcon>

                                            ) : (
                                                <ButtonIcon tooltip={`Sistema Por: ${data.Usuario.nome}`}>
                                                    <GrSystem />
                                                </ButtonIcon>
                                            )}</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <br />
                            <Box>
                                <Heading as="h3" size="md">Pagamento</Heading>
                                <br />
                                <TableContainer>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th></Th>
                                                <Th></Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Subtotal</Td>
                                                <Td>{currencyBRLFormat((data.Excursao.valor * data.Pessoa.length))}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Desconto</Td>
                                                <Td>{currencyBRLFormat(((data.desconto * data.Excursao.valor) / 100) * data.Pessoa.length)}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Total</Td>
                                                <Td>{currencyBRLFormat((data.Excursao.valor * data.Pessoa.length) - (((data.desconto * data.Excursao.valor) / 100) * data.Pessoa.length))}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Número Comprovante</Td>
                                                <Td>{data.Transacoes[0].numeroComprovanteBancario}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Forma Pagamento</Td>
                                                <Td>{data.Transacoes[0].FormaPagamento.nome}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </>
                )}
            </Content>
            <br />
            <Content className="contentMain">
                {!isLoading && (
                    <>
                        <Box>
                            <Heading as="h2" size="md" mb={2}>Itens da Reserva</Heading>
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Produto</Th>
                                            <Th>Data Reserva</Th>
                                            <Th>Quantidade</Th>
                                            <Th>Preço</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>{data.Excursao.nome}</Td>
                                            <Td>{formattingDate(data.dataCadastro, true)}</Td>
                                            <Td>{data.Pessoa.length}</Td>
                                            <Td>{currencyBRLFormat(data.Transacoes[0].valor)}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </>
                )}
            </Content>
        </>
    );
};

export default VoucherView;
