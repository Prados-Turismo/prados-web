import { Text } from "@chakra-ui/react";
import Loading from "../../../../components/Loading";
import { TBody, TD, THead, Table } from "../../../../components/Table";

// Styled Components
import { Content } from "./styled";

// Hooks and utils
import TRBenefitsSettings from "../../components/TRBenefitSettings";

// Types
import ColumnOrder from "../../../../components/ColumnOrder";
import { IParameterizer } from "./types";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const Parameterizer = ({
  data,
  isLoading,
  isFetching,
  status,
  menu,
  counts,
  isFavorite,
  userId,
  setOrderBy,
  orderBy,
  setOrder,
  order,
}: IParameterizer) => {
  return (
    <>
      <Content className={isLoading ? "isLoading" : ""}>
        {isLoading && (
          <Loading productPage={status === "parameterizer" ? true : false} />
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <Table>
                  <THead>
                    <TD style={{ flex: "0 0 6%" }}>&nbsp;</TD>
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
                        Rede de
                        <br /> Atendimento
                      </TD>
                    )} */}
                    <TD style={{ textAlign: "center" }} maxW="200px">
                      Valor
                    </TD>
                    <TD style={{ textAlign: "center" }} maxW="80px">
                      Parâmetros
                    </TD>
                    <TD style={{ textAlign: "center" }} maxW="80px">
                      Histórico
                    </TD>
                  </THead>

                  <TBody>
                    {data.map((item, key) => {
                      return (
                        <TRBenefitsSettings
                          key={`${item.id}-${key}`}
                          item={item}
                          menu={menu}
                          isFavorite={isFavorite}
                          userId={userId}
                          isFetching={isFetching}
                        />
                      );
                    })}
                  </TBody>
                </Table>
              </>
            )}

            {data.length === 0 && (!isLoading || !isFetching) && (
              <AlertNoDataFound
                title={
                  status === "Favoritos"
                    ? "Nenhum produto favoritado"
                    : "Nenhum produto disponível"
                }
              />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default Parameterizer;
