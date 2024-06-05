import { Button, Flex, TableContainer, Text } from "@chakra-ui/react";
import AccordionContentBox from "../../../../components/AccordionContentBox";
import Loading from "../../../../components/Loading";
import { Table, TBody, TR } from "../../../../components/Table";
import useBenefits from "../../../../hooks/useBenefits";
import { IBenefitParameterizer } from "./types";
import TRBenefitParameterizer from "./components/TRBenefitParameterizer";
import AddParameterization from "./components/TRBenefitParameterizer/AddParameterization";
import THeadParameterizer from "./components/THeadParameterizer";
import { genericSort } from "../../../../utils";
import { useState } from "react";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const BenefitParameterizer = ({ benefit }: IBenefitParameterizer) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { getBenefitParameterizer } = useBenefits();
  const { data, isLoading } = getBenefitParameterizer({
    companyContractId: benefit?.id,
    active: true,
  });

  return (
    <>
      <AccordionContentBox title="Parametrizações do produto">
        {isLoading && <Loading />}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <TableContainer>
                <Table>
                  <Text fontSize="1.1rem" fontWeight={600}>
                    Parâmetros gerais
                  </Text>
                  <THeadParameterizer />

                  <TBody>
                    {data
                      .filter((item) => item.type === "general")
                      .sort((a, b) =>
                        genericSort(a, b, {
                          property: "relationship",
                          isDescending: true,
                        }),
                      )
                      .sort((a, b) => {
                        if (a?.relationship === "holder") {
                          return -1;
                        } else if (b?.relationship === "holder") {
                          return 1;
                        } else {
                          return 0;
                        }
                      })
                      .map((item) => {
                        return (
                          <TR key={item.id} style={{ textAlign: "center" }}>
                            <TRBenefitParameterizer
                              item={item}
                              benefit={benefit}
                            />
                          </TR>
                        );
                      })}
                  </TBody>

                  {benefit?.available && (
                    <>
                      <Text fontSize="1.1rem" fontWeight={600} marginTop="10px">
                        Parâmetros adicionais
                      </Text>
                      {data.filter((item) => item.type !== "general").length >
                        0 && (
                        <>
                          <THeadParameterizer />

                          <TBody>
                            {data
                              .filter((item) => item.type !== "general")
                              .sort((a, b) =>
                                genericSort(a, b, {
                                  property: "relationship",
                                  isDescending: true,
                                }),
                              )
                              .sort((a, b) => {
                                if (a?.relationship === "holder") {
                                  return -1;
                                } else if (b?.relationship === "holder") {
                                  return 1;
                                } else {
                                  return 0;
                                }
                              })
                              .map((item) => {
                                return (
                                  <TR
                                    key={item.id}
                                    style={{ textAlign: "center" }}
                                  >
                                    <TRBenefitParameterizer
                                      item={item}
                                      benefit={benefit}
                                    />
                                  </TR>
                                );
                              })}
                          </TBody>
                        </>
                      )}
                    </>
                  )}
                </Table>
              </TableContainer>
            )}

            <Flex justifyContent="flex-end" padding="8px 30px">
              <Button
                h="33px"
                borderRadius="4px"
                onClick={() => setShowAddModal(true)}
              >
                + Adicionar novo
              </Button>
            </Flex>

            {showAddModal && (
              <AddParameterization
                benefit={benefit}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
              />
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum Parametrizador Ativo" />
            )}
          </>
        )}
      </AccordionContentBox>
    </>
  );
};

export default BenefitParameterizer;
