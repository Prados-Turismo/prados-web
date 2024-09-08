import { Box, Button, Flex, TableContainer, Text } from "@chakra-ui/react";
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
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import useLogs from "../../../hooks/useLogs";
import { ILogs } from "../../../models/logs.model";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import { formattingDate } from "../../../utils/formattingDate";
import { FaFileExcel } from "react-icons/fa";

const AuditoriaList = () => {
    const { getLogs, deleteLogs } = useLogs();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [modalRegisterLogs, setModalRegisterLogs] = useState(false);
    const [modalUpdateLogs, setModalUpdateLogs] = useState(false);
    const [modalRemoveLogs, setModalRemoveLogs] = useState(false);
    const [LogsData, setLogsData] = useState<ILogs | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const registerPerPage = 10;

    const { mutate: mutateToDeleteLogs } = deleteLogs();
    const [deleteItemId, setDeleteLogsId] = useState('');

    const { data, count, isLoading } = getLogs({
        size: registerPerPage,
        page: currentPage
    });


    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        {/* <ButtonIcon>
                            <FaFileExcel
                                size={20}
                                cursor='pointer'
                                onClick={() => {
                                    if (!isLoadingCsv) {
                                        csv()
                                    }
                                }}
                            />
                        </ButtonIcon> */}
                        <Text fontSize="2xl" fontWeight="bold">
                            Auditoria
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                    
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Conta Bancária</span>
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
                                { label: "Completo", value: 1 },
                                { label: "Incompleto", value: 2 },
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
                                <Box border="1px solid #ccc" borderRadius="5px" minHeight={20}>
                                    {data.map((item, index) => {

                                        switch (item.tipo) {
                                            case 'UPDATE':
                                                return (
                                                    <Box key={index} p="10px" border="1px solid #ccc" borderRadius="5px" m="10px">
                                                        <p><b>Data:</b> {formattingDate(item.data)}</p>
                                                        <p><b>Rotina:</b> {item.rotina}</p>
                                                        <p><b>Usuário:</b> {item.Usuario.nome}</p>
                                                        <p><b> Alterou o registro:</b></p>
                                                        {item.changes && (
                                                            <Box mt="10px" p="5px" border="1px solid #ccc" borderRadius="5px">
                                                                <b>Mudanças:</b>
                                                                {Object.entries(item.changes).map(([key, value]) => (
                                                                    <div key={key}><b>{key}:</b> De: {value?.old || ''} Para: {value?.new || ''}</div>
                                                                ))}
                                                            </Box>
                                                        )}
                                                    </Box>
                                                );

                                            case 'DELETE':
                                                let newDataParsedDelete;
                                                let nomeRegistro = ''

                                                try {
                                                    newDataParsedDelete = JSON.parse(item.oldData);
                                                } catch (error) {
                                                    newDataParsedDelete = {};
                                                }

                                                if (newDataParsedDelete.reserva) {
                                                    nomeRegistro = `reserva nº ${newDataParsedDelete.reserva}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Cliente') {
                                                    nomeRegistro = `Excluiu o cliente ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Forma Pagamento') {
                                                    nomeRegistro = `Excluiu a Forma de pagamento ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Conta Bancária') {
                                                    nomeRegistro = `Excluiu a Conta Bancária ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Produtos') {
                                                    nomeRegistro = `Excluiu o produto ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Local Embarque') {
                                                    nomeRegistro = `Excluiu o Local Embarque ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Excursões') {
                                                    nomeRegistro = `Excluiu a Excursão ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Fornecedor') {
                                                    nomeRegistro = `Excluiu o Fornecedor ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Categoria Transação') {
                                                    nomeRegistro = `Excluiu a Categoria Transação ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'SubCategoria Transacao') {
                                                    nomeRegistro = `Excluiu a SubCategoria Transacao ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Tipo Quarto') {
                                                    nomeRegistro = `Excluiu o Tipo Quarto ${newDataParsedDelete.nome}`
                                                }

                                                if (newDataParsedDelete.nome && item.rotina === 'Ranking Clientes') {
                                                    nomeRegistro = `Excluiu o Ranking Clientes ${newDataParsedDelete.nome}`
                                                }


                                                return (
                                                    <Box key={index} p="10px" border="1px solid #ccc" borderRadius="5px" m="10px">
                                                        <p><b>Data:</b> {formattingDate(item.data)}</p>
                                                        <p><b>Rotina:</b> {item.rotina}</p>
                                                        <p><b>Usuário:</b> {item.Usuario.nome}</p>
                                                        <p><b>Excluiu o registro</b></p>
                                                        <p><b> {nomeRegistro} </b></p>
                                                    </Box>
                                                );

                                            case 'CREATE':
                                                let newDataParsed;
                                                let boxPassageiro = false
                                                let boxOpcionais = false
                                                let passageiros = []
                                                let opcionais = []

                                                try {
                                                    newDataParsed = JSON.parse(item.newData);
                                                } catch (error) {
                                                    newDataParsed = {};
                                                }

                                                debugger

                                                if (newDataParsed) {
                                                    delete newDataParsed.id
                                                    delete newDataParsed.idExcursao
                                                    delete newDataParsed.passageiros
                                                    delete newDataParsed.codigoFormaPagamento
                                                    delete newDataParsed.codigoContaBancaria
                                                    delete newDataParsed.idReserva
                                                    delete newDataParsed.codigoExcursao
                                                    delete newDataParsed.opcionais
                                                    delete newDataParsed.codigoSubCategoria
                                                    delete newDataParsed.ativo
                                                    delete newDataParsed.localEmbarqueId
                                                    delete newDataParsed.Usuario
                                                    delete newDataParsed.Transacoes
                                                    delete newDataParsed.status
                                                    delete newDataParsed.excluida
                                                    delete newDataParsed.idWP
                                                    delete newDataParsed.idWP
                                                    delete newDataParsed.Usuarios
                                                    delete newDataParsed.codigoPessoa
                                                    delete newDataParsed.codigoProduto
                                                    delete newDataParsed.codigoFornecedor
                                                    delete newDataParsed.codigoCategoria
                                                    delete newDataParsed.codigoPacote
                                                    delete newDataParsed.usuarioCadastro
                                                    delete newDataParsed.codigoUsuario

                                                    if (newDataParsed.Pessoa && newDataParsed.Pessoa.length && item.rotina) {
                                                        boxPassageiro = true
                                                        passageiros = newDataParsed.Pessoa
                                                        delete newDataParsed.Pessoa
                                                    }

                                                    if (newDataParsed.Excursao) {
                                                        newDataParsed.Excursao = newDataParsed.Excursao.nome
                                                    } else {
                                                        delete newDataParsed.Excursao
                                                    }

                                                    if (newDataParsed.LocalEmbarque) {
                                                        newDataParsed.LocalEmbarque = newDataParsed.LocalEmbarque.nome
                                                    }

                                                    if (newDataParsed.Opcionais && newDataParsed.Opcionais.length) {
                                                        opcionais = newDataParsed.Opcionais
                                                        boxOpcionais = true
                                                        delete newDataParsed.Opcionais
                                                    } else {
                                                        newDataParsed.Opcionais = 'Sem opcionais'
                                                    }

                                                    if (newDataParsed.data) {
                                                        newDataParsed.data = formattingDate(newDataParsed.data, true)
                                                    }

                                                    if (newDataParsed.dataCadastro) {
                                                        newDataParsed.dataCadastro = formattingDate(newDataParsed.dataCadastro, true)
                                                    }

                                                    if (newDataParsed.valor) {
                                                        newDataParsed.valor = currencyBRLFormat(newDataParsed.valor)
                                                    }

                                                    if (newDataParsed.Reservas) {
                                                        newDataParsed.Reservas = newDataParsed.Reservas.reserva
                                                    }

                                                    if (newDataParsed.FormaPagamento) {
                                                        newDataParsed.FormaPagamento = newDataParsed.FormaPagamento.nome
                                                    }

                                                    if (newDataParsed.ContaBancaria) {
                                                        newDataParsed.ContaBancaria = newDataParsed.ContaBancaria.nome
                                                    }

                                                    if (newDataParsed.Fornecedor) {
                                                        newDataParsed.Fornecedor = newDataParsed.Fornecedor.nome
                                                    } else {
                                                        delete newDataParsed.Fornecedor
                                                    }

                                                    if (newDataParsed.Produtos) {
                                                        newDataParsed.Produtos = newDataParsed.Produtos.nome
                                                    } else {
                                                        delete newDataParsed.Produtos
                                                    }

                                                    if (newDataParsed.Pacotes) {
                                                        newDataParsed.Pacotes = newDataParsed.Pacotes.nome
                                                    } else {
                                                        delete newDataParsed.Pacotes
                                                    }

                                                    if (!boxOpcionais) {
                                                        delete newDataParsed.Opcionais
                                                    }

                                                    if (!boxPassageiro) {
                                                        delete newDataParsed.Pessoa
                                                        delete newDataParsed.Pessoas
                                                    }
                                                }

                                                return (
                                                    <Box key={index} p="10px" border="1px solid #ccc" borderRadius="5px" m="10px">
                                                        <p><b>Data:</b> {formattingDate(item.data, true)}</p>
                                                        <p><b>Rotina:</b> {item.rotina}</p>
                                                        <p><b>Usuário:</b> {item.Usuario.nome}</p>
                                                        <p><b>Criou o registro</b></p>
                                                        <Box mt="10px" p="5px" border="1px solid #ccc" borderRadius="5px">
                                                            {Object.entries(newDataParsed).map(([key, value]) => (
                                                                <div key={key}><b>{key}:</b> {String(value)}</div>
                                                            ))}
                                                        </Box>
                                                        {boxPassageiro && (
                                                            <Box mt="10px" p="5px" border="1px solid #ccc" borderRadius="5px">
                                                                <h1>Passageiros</h1>
                                                                {Array.isArray(passageiros) && (
                                                                    passageiros.map((value: { nome: string }, index: number) => (
                                                                        <Box key={index}>
                                                                            <div key={index}><b>{value.nome}</b></div>
                                                                        </Box>
                                                                    ))
                                                                )}
                                                            </Box >
                                                        )}
                                                        {boxOpcionais && (
                                                            <Box mt="10px" p="5px" border="1px solid #ccc" borderRadius="5px">
                                                                <h1>Opcionais</h1>
                                                                {Array.isArray(opcionais) && (
                                                                    opcionais.map((value: { Produto: { nome: string } }, index: number) => (
                                                                        <Box>
                                                                            <div key={index}><b>{value.Produto.nome}</b></div>
                                                                        </Box>
                                                                    ))
                                                                )}
                                                            </Box >
                                                        )}
                                                    </Box>
                                                );

                                            default:
                                                return null;
                                        }
                                    })}
                                </Box>

                                <Pagination
                                    registerPerPage={registerPerPage}
                                    totalRegisters={count}
                                    currentPage={currentPage}
                                    handleChangePage={(page) => setCurrentPage(page)}
                                />
                            </>
                        )}

                        {data.length === 0 && (
                            <AlertNoDataFound title="Nenhum log encontrada" />
                        )}
                    </>
                )}
            </Content >
        </>
    );
};

export default AuditoriaList;
