import { Button, Checkbox, Flex, TableContainer, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../../../components/Loading";
import Pagination from "../../../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import { ISelect } from "../../../../../models/generics.model";
import AlertNoDataFound from "../../../../../components/AlertNoDataFound";
import useProduct from "../../../../../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";

const ExcursaoList = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const { getProducts } = useProduct();

  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getProducts({
    size: registerPerPage,
    page: currentPage
  });

  return (
    <>
      <SectionTop className="contentTop" gap="30px">
        <Button
          variant="outline"
          width="74px"
          onClick={() => navigate("/excursoes")}
        >
          Voltar
        </Button>

        <Flex gap="10px" flexWrap="wrap">
          <Text fontSize="2xl" fontWeight="bold">
            Embarque:
          </Text>
          <Text fontSize="2xl">
            Excursão Guaramiranga
          </Text>
        </Flex>
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="500px">
            <span>Local</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum local encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={[
                {
                  label: "Local 1",
                  value: 1,
                },
                {
                  label: "Local 2",
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
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding="0 30px 0 30px">
                      <TD>Passageiro</TD>
                      <TD>Local de Embarque</TD>
                      <TD>Hora Prevista</TD>
                      <TD>Embarcou?</TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.nome}
                          </TD>
                          <TD>
                            {item.estoque}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            <Checkbox
                              borderColor="#909090"
                              // isChecked={true}
                              _checked={{
                                ".chakra-checkbox__control": {
                                  bgColor: "brand.500",
                                  borderColor: "brand.500",
                                  boxShadow: "none",
                                },
                                ".chakra-checkbox__control:hover": {
                                  bgColor: "brand.500",
                                  borderColor: "brand.500",
                                  boxShadow: "none",
                                },
                              }}
                              onChange={() => {}}
                            />
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
              <AlertNoDataFound title="Nenhuma excursão encontrado" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default ExcursaoList;
