import { Text } from "@chakra-ui/react";
import Loading from "../../../../components/Loading";
import { TBody, TD, THead, Table } from "../../../../components/Table";

// Styled Components
import { Content } from "./styled";

// Hooks and utils
import TRBenefitEnable from "../../components/TRBenefitEnable";

// Types
import { IEnable } from "./types";
import ColumnOrder from "../../../../components/ColumnOrder";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const Enable = ({
  menu,
  data,
  isLoading,
  counts,
  setOrderBy,
  orderBy,
  setOrder,
  order,
}: IEnable) => {
  return (
    <>
      <Content>
        {isLoading && <Loading />}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <Table>
                  <THead>
                    <TD style={{ textAlign: "center" }} maxW="100px">
                      Ativo/Inativo
                    </TD>
                    <ColumnOrder
                      style={{ textAlign: "center" }}
                      maxW="200px"
                      label="Fornecedor"
                      columnName="providerName"
                      setOrderBy={setOrderBy}
                      orderBy={orderBy}
                      setOrder={setOrder}
                      order={order}
                    >
                      <Text
                        background="brand.50"
                        padding="2px 7px"
                        color="brand.500"
                        cursor="default"
                        borderRadius="5px"
                        fontWeight={500}
                        fontSize="0.9rem"
                      >
                        {counts?.providersCount}
                      </Text>
                    </ColumnOrder>
                    <ColumnOrder
                      style={{ textAlign: "center" }}
                      label="Produto"
                      columnName="reducedName"
                      setOrderBy={setOrderBy}
                      orderBy={orderBy}
                      setOrder={setOrder}
                      order={order}
                    >
                      <Text
                        background="brand.50"
                        padding="2px 7px"
                        color="brand.500"
                        cursor="default"
                        borderRadius="5px"
                        fontWeight={500}
                        fontSize="0.9rem"
                      >
                        {counts?.productCount}
                      </Text>
                    </ColumnOrder>
                    {/* {["all", "health", "odontology"].includes(menu) && (
                      <TD style={{ textAlign: "center" }} maxW="90px">
                        Rede de <br />
                        Atendimento
                      </TD>
                    )} */}
                    <TD style={{ textAlign: "center" }} maxW="200px">
                      Valor
                    </TD>
                    <TD style={{ textAlign: "center" }} maxW="100px">
                      Status
                    </TD>
                    <TD style={{ textAlign: "center" }} maxW="80px">
                      Condições
                      <br />
                      de Uso
                    </TD>
                  </THead>

                  <TBody>
                    {data.map((item, key) => {
                      return (
                        <TRBenefitEnable
                          key={`${item.id}-${key}`}
                          item={item}
                          menu={menu}
                        />
                      );
                    })}
                  </TBody>
                </Table>
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum Produto Disponível" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default Enable;
