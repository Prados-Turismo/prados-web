import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import { ISelect } from "../../../models/generics.model";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import useExcursaoQuarto from "../../../hooks/useExcursaoQuarto";
import { useParams } from "react-router-dom";
import { dados } from "./dados";
import { capitalize } from "../../../utils/capitalize";
import { cpfMask, dateFormat } from "../../../utils";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";

const RelatorioClientesList = () => {
  const [break600] = useMediaQuery("(max-width: 600px)");
  const { id: _id } = useParams();
  const { getExcursaoQuarto } = useExcursaoQuarto();

  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getExcursaoQuarto({
    size: registerPerPage,
    page: currentPage
  });

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
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="500px">
            <span>Cliente</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum Cliente encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={[
                {
                  label: "Cliente 1",
                  value: 1,
                },
                {
                  label: "Cliente 2",
                  value: 2,
                },
              ]}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
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
            {dados.length > 0 && (
              <>
                <Accordion allowMultiple>
                  {dados.map((item) => (
                    <AccordionItem key={item.id}>
                      <h2>
                        <AccordionButton>
                          <Box as='span' flex='1' textAlign='left'>
                            {`${capitalize(item.nome)} - ${cpfMask(item.cpf)}`}
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
                        {!isLoading && (
                          <>
                            {item.Transacoes.length > 0 && (
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
                                      {item.Transacoes.map((transacao) => (
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
                                      {item.totalTrips || 0}
                                    </Text>
                                  </Flex>
                                  <Flex flex="1" gap="5px" marginBottom={break600 ? "25px" : "unset"} justifyContent="end">
                                    <Text fontWeight={600}>
                                      Valor Total:
                                    </Text>
                                    <Text fontWeight={500}>
                                      {currencyBRLFormat(item.totalValue || 0)}
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

                            {item.Transacoes.length === 0 && (
                              <AlertNoDataFound title="Nenhuma transação encontrada" />
                            )}
                          </>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {dados.length === 0 && (
              <AlertNoDataFound title="Nenhum cliente encontrado" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default RelatorioClientesList;
