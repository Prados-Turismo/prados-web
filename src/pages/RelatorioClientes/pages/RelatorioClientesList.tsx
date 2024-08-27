import { Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useMediaQuery
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { useParams } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";
import { cpfMask, dateFormat } from "../../../utils";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import usePessoas from "../../../hooks/usePessoas";
import useRelatorioClientes from "../../../hooks/useRelatorioClientes";
import FieldSearch from "../../../components/FieldSearch";

const RelatorioClientesList = () => {
  const [break600] = useMediaQuery("(max-width: 600px)");
  const { id: _id } = useParams();
  const { getPessoas } = usePessoas();
  const { getRelatorioClientesPorPessoa } = useRelatorioClientes();

  const [nome, setNome] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getPessoas({
    size: registerPerPage,
    page: currentPage,
    nome
  });

  const [queries, setQueries] = useState({});
  const [pessoaSelecionada, setPessoaSelecionada] = useState<string>("");

  const {
    data: dataTransacoes,
    isLoading: isLoadingTransacoes,
    count: countTransacoes,
    sum: sumTransacoes
  } = getRelatorioClientesPorPessoa({
    pessoaId: pessoaSelecionada,
    page: currentPage,
    size: registerPerPage,
    options: {
      enabled: true,
    }
  })

  useEffect(() => {
    setQueries((prev) => ({
      ...prev,
      [pessoaSelecionada]: {
        dataTransacoes,
        isLoadingTransacoes,
        count,
        countTransacoes,
        sumTransacoes
      }
    }));
  }, [count, countTransacoes, dataTransacoes, isLoadingTransacoes, pessoaSelecionada, sumTransacoes]);

  const handleAccordionChange = (index: number, pessoaId: string) => {
    setPessoaSelecionada(pessoaId);
  };

  return (
    <>
      <Flex>
        <SectionTop className="contentTop" gap="30px">
          <Flex gap="10px" flexWrap="wrap">
            <Text fontSize="2xl" fontWeight="bold">
              Relatório de Clientes
            </Text>
          </Flex>
        </SectionTop>
      </Flex>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap" mb={5}>
          <Flex flexDirection="column" gap="5px" width="500px">
            <span>Nome</span>

            <FieldSearch
              placeholder=""
              handleSearch={(event) => {
                setCurrentPage(1);
                setNome(event)
              }}
            />
          </Flex>
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
                <Accordion allowMultiple>
                  {data.map((item, index) => {
                    const query = queries[item.id];
                    const isLoadingTransacoes = query?.isLoadingTransacoes;
                    const dataTransacoes = query?.dataTransacoes;
                    const countTransacoes = query?.countTransacoes;
                    const sumTransacoes = query?.sumTransacoes;

                    return (
                      <AccordionItem key={item.id}>
                        <h2>
                          <AccordionButton onClick={() => handleAccordionChange(index, item.id)}>
                            <Box as='span' flex='1' textAlign='left'>
                              {cpfMask(item.cpf)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{capitalize(item.nome)}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          pt={4}
                          pl={12}
                          display="flex"
                          flexDirection="column"
                        >
                          {isLoadingTransacoes ? (
                            <Flex h="100%" alignItems="center">
                              <Loading />
                            </Flex>
                          ) : (
                            <>
                            {dataTransacoes?.length > 0 && (
                              <>
                                <TableContainer marginBottom="10px">
                                  <Table>
                                    <Thead padding="0 30px 0 30px">
                                      <Td fontSize="0.9rem">Reserva</Td>
                                      <Td fontSize="0.9rem">Excursão</Td>
                                      <Td fontSize="0.9rem">Pacote</Td>
                                      <Td fontSize="0.9rem">Data</Td>
                                      <Td fontSize="0.9rem">Valor</Td>
                                    </Thead>

                                    <Tbody>
                                      {dataTransacoes?.map((transacao) => (
                                        <Tr key={transacao.id}>
                                          <Td fontSize="0.9rem">
                                            {transacao.idReserva || "-"}
                                          </Td>
                                          <Td fontSize="0.9rem">
                                            {transacao.Excursao?.nome || "-"}
                                          </Td>
                                          <Td fontSize="0.9rem">
                                            {transacao.Pacotes?.nome || "-"}
                                          </Td>
                                          <Td fontSize="0.9rem">
                                            {transacao.valor ? currencyBRLFormat(transacao.valor) : "-"}
                                          </Td>
                                          <Td fontSize="0.9rem">
                                            {transacao.data ? dateFormat(new Date(transacao.data)) :  "-"}
                                          </Td>
                                        </Tr>
                                      ))}
                                    </Tbody>
                                  </Table>
                                </TableContainer>

                                <Flex
                                  w="100%"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  padding="0 30px"
                                  flexDir={break600 ? "column" : "row"}
                                  mb="20px"
                                >
                                  <Flex flex="1" gap="5px" marginBottom={break600 ? "25px" : "unset"} justifyContent="start">
                                    <Text fontWeight={600}>
                                      Total de viagens:
                                    </Text>
                                    <Text fontWeight={500}>
                                      {countTransacoes || 0}
                                    </Text>
                                  </Flex>
                                  <Flex flex="1" gap="5px" marginBottom={break600 ? "25px" : "unset"} justifyContent="end">
                                    <Text fontWeight={600}>
                                      Valor Total:
                                    </Text>
                                    <Text fontWeight={500}>
                                      {currencyBRLFormat(sumTransacoes || 0)}
                                    </Text>
                                  </Flex>
                                </Flex>

                                <Pagination
                                  registerPerPage={registerPerPage}
                                  totalRegisters={count}
                                  currentPage={currentPage}
                                  handleChangePage={(page) => setCurrentPage(page)}
                                />
                              </>
                            )}

                            {dataTransacoes?.length === 0 && (
                              <AlertNoDataFound title="Nenhuma transação encontrada" />
                            )}
                          </>
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum cliente encontrado" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default RelatorioClientesList;
