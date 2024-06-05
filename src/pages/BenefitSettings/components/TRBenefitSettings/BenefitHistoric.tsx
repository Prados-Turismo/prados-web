import { useState } from "react";
import { TableContainer, Text } from "@chakra-ui/react";

// Components and Utils
import AccordionContentBox from "../../../../components/AccordionContentBox";
import Loading from "../../../../components/Loading";
import { Table, TBody } from "../../../../components/Table";
import { dateFormat, genericSort } from "../../../../utils";
import { searchNormalize } from "../../../../utils/searchNormalize";
import FieldSearch from "../../../../components/FieldSearch";
import useBenefits from "../../../../hooks/useBenefits";
import { IBenefitHistoric } from "./types";
import { SearchBox, AlertText } from "./styled";
import THeadHistoric from "./components/THeadHistoric";
import TRBenefitHistoric from "./components/TRBenefitHistoric";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const BenefitHistoric = ({ benefit }: IBenefitHistoric) => {
  const { getBenefitParameterizer } = useBenefits();
  const { data, isLoading } = getBenefitParameterizer({
    companyContractId: benefit?.id,
  });
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <AccordionContentBox title="Histórico de parametrizações do produto">
        {isLoading && <Loading />}

        {!isLoading && (
          <>
            <SearchBox>
              <FieldSearch
                placeholder="Digite sua busca"
                handleSearch={(value) => {
                  setSearch(value);
                }}
              />
            </SearchBox>

            {data.filter(
              (el) =>
                (search &&
                  (searchNormalize(
                    dateFormat(new Date(el?.createdAt)),
                    search,
                  ) ||
                    searchNormalize(el?.sector?.name, search) ||
                    searchNormalize(el?.position?.name, search) ||
                    searchNormalize(el?.beneficiary?.person?.name, search))) ||
                !search,
            ).length > 0 ? (
              <>
                <TableContainer>
                  <Table>
                    {data.filter((item) => item?.type === "general").length >
                      0 && (
                      <>
                        <Text fontSize="1.1rem" fontWeight={600}>
                          Parâmetros gerais
                        </Text>
                        <THeadHistoric />

                        <TBody>
                          {data
                            .filter((item) => item?.type === "general")
                            .filter(
                              (el) =>
                                (search &&
                                  (searchNormalize(
                                    dateFormat(new Date(el?.createdAt)),
                                    search,
                                  ) ||
                                    searchNormalize(el?.sector?.name, search) ||
                                    searchNormalize(
                                      el?.position?.name,
                                      search,
                                    ) ||
                                    searchNormalize(
                                      el?.beneficiary?.person?.name,
                                      search,
                                    ))) ||
                                !search,
                            )
                            .sort((a, b) =>
                              genericSort(a, b, {
                                property: "active",
                                isDescending: false,
                              }),
                            )
                            .sort((a, b) => {
                              if (
                                a?.relationship === "holder" &&
                                b?.relationship !== "holder"
                              ) {
                                return -1;
                              } else if (
                                a?.relationship !== "holder" &&
                                b?.relationship === "holder"
                              ) {
                                return 1;
                              } else {
                                return genericSort(b, a, {
                                  property: "createdAt",
                                  isDescending: false,
                                });
                              }
                            })

                            .map((item, i) => {
                              return (
                                <TRBenefitHistoric
                                  key={`${item.id}-${i}`}
                                  item={item}
                                />
                              );
                            })}
                        </TBody>
                      </>
                    )}

                    {data.filter((item) => item?.type !== "general").length >
                      0 && (
                      <>
                        <Text
                          fontSize="1.1rem"
                          fontWeight={600}
                          marginTop="10px"
                        >
                          Parâmetros adicionais
                        </Text>
                        <THeadHistoric />

                        <TBody>
                          {data
                            .filter((item) => item?.type !== "general")
                            .filter(
                              (el) =>
                                (search &&
                                  (searchNormalize(
                                    dateFormat(new Date(el?.createdAt)),
                                    search,
                                  ) ||
                                    searchNormalize(el?.sector?.name, search) ||
                                    searchNormalize(
                                      el?.position?.name,
                                      search,
                                    ) ||
                                    searchNormalize(
                                      el?.beneficiary?.person?.name,
                                      search,
                                    ))) ||
                                !search,
                            )
                            .sort((a, b) =>
                              genericSort(a, b, {
                                property: "active",
                                isDescending: false,
                              }),
                            )
                            .sort((a, b) => {
                              if (
                                a?.relationship === "holder" &&
                                b?.relationship !== "holder"
                              ) {
                                return -1;
                              } else if (
                                a?.relationship !== "holder" &&
                                b?.relationship === "holder"
                              ) {
                                return 1;
                              } else {
                                return genericSort(b, a, {
                                  property: "createdAt",
                                  isDescending: false,
                                });
                              }
                            })
                            .map((item, i) => {
                              return (
                                <TRBenefitHistoric
                                  key={`${item.id}-${i}`}
                                  item={item}
                                />
                              );
                            })}
                        </TBody>
                      </>
                    )}
                  </Table>
                </TableContainer>
              </>
            ) : (
              <AlertText>Nenhum dado encontrado</AlertText>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum Histórico Disponível" />
            )}
          </>
        )}
      </AccordionContentBox>
    </>
  );
};

export default BenefitHistoric;
