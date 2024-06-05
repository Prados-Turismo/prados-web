import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import useProductAdhesion from "../../../../hooks/useProductAdhesion";
import { numberFormat } from "../../../../utils";
import { capitalize } from "../../../../utils/capitalize";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../../../utils/enumFormat";
import Loading from "../../../Loading";
import LoadingTextRandom from "../../../LoadingTextRandom";
import { Checkbox } from "../../styled";
import { sortAdherence, sortAdherenceRule } from "../../utils/sort";
import { IAdhesionContent } from "./types";
import AlertNoDataFound from "../../../AlertNoDataFound";

const AdhesionContent = ({
  setIndex,
  contractId,
  beneficiaryId,
  page,
  setHolderId,
  setcheckedAgrupados,
  checkedAgrupados,
  product,
  setIsLoadingAdhesion,
  setDataLimiteAssinatura,
}: IAdhesionContent) => {
  const [isNotDocuments, setIsNotDocuments] = useState(false);
  const { getFamilyContracts, createAdhesion } = useProductAdhesion();
  const { mutate, isLoading } = createAdhesion({
    setIndex,
    setIsLoadingAdhesion,
    setDataLimiteAssinatura,
  });

  const { data: dataFamily, isLoading: isLoadingFamily } = getFamilyContracts({
    contractId,
    beneficiaryId,
    isRegulated: product?.product?.regulated,
    setcheckedAgrupados: setcheckedAgrupados,
  });

  const handleAdhesion = () => {
    const adhesionData = {
      productId: product?.productId,
      companyContractId: product?.companyContractId || product?.id,
      contractId: product?.contractId,
      beneficiariesIds: checkedAgrupados?.map((el) => el?.beneficiary?.id),
    };

    mutate(adhesionData);
  };

  useEffect(() => {
    if (
      product?.product?.regulated &&
      dataFamily &&
      checkedAgrupados?.filter(
        (el) => el?.beneficiary?.beneficiaryKinship === "holder",
      ).length < 1
    ) {
      const holder = dataFamily?.filter(
        (el) =>
          el?.beneficiary?.beneficiaryKinship === "holder" && !el?.adherence,
      );

      setcheckedAgrupados((e) => [...holder, ...e]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsNotDocuments(
      checkedAgrupados?.filter(
        (doc) => doc?.adherenceRule?.documentsOnAdherenceRules?.length > 0,
      )?.length === 0,
    );
  }, [checkedAgrupados]);

  return isLoadingFamily ? (
    <Box margin="15px">
      <Loading />

      <LoadingTextRandom
        texts={[
          "Carregando as regras de adesão",
          "Carregando as tabelas de preços",
          "Carregando o parâmetro do modo de contribuição",
        ]}
      />
    </Box>
  ) : dataFamily?.length > 0 ? (
    <>
      <Box padding="0 0 25px" fontSize="1.1rem">
        Titular:{" "}
        <b>
          {capitalize(
            dataFamily?.filter(
              (el) => el?.beneficiary?.beneficiaryKinship === "holder",
            )[0]?.beneficiary?.person?.name,
          )}
        </b>
        <br />
        Total pago pelo Titular:{" "}
        <b>
          {numberFormat(
            dataFamily?.filter(
              (el) => el?.beneficiary?.beneficiaryKinship === "holder",
            )[0]?.value,
          )}
        </b>
      </Box>

      <Box padding="15px 0 80px">
        <TableContainer overflowY="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th fontSize="1rem">
                  <Checkbox
                    isChecked={
                      checkedAgrupados.length ===
                      dataFamily.filter(
                        (item) => item?.adherenceRule && !item?.adherence,
                      ).length
                    }
                    onChange={() => {
                      const agrupadosIds = dataFamily.filter(
                        (item) => item?.adherenceRule && !item?.adherence,
                      );
                      if (checkedAgrupados.length === agrupadosIds.length) {
                        if (product?.product?.regulated) {
                          const holder = dataFamily?.filter(
                            (el) =>
                              el?.beneficiary?.beneficiaryKinship ===
                                "holder" && !el?.adherence,
                          );
                          setcheckedAgrupados(holder);
                        } else {
                          setcheckedAgrupados([]);
                        }
                      } else {
                        setcheckedAgrupados(agrupadosIds);
                      }
                    }}
                  >
                    <Text marginLeft="20px">Titular/Dependente(s)</Text>
                  </Checkbox>
                </Th>
                <Th fontSize="1rem" isNumeric>
                  Valor (R$)
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {dataFamily
                .sort(sortAdherence)
                .sort(sortAdherenceRule)
                .map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Tr>
                        <Td fontSize="1rem">
                          {!item?.adherence && item?.adherenceRule ? (
                            <Checkbox
                              isReadOnly={
                                product?.product?.regulated &&
                                item?.beneficiary?.beneficiaryKinship ===
                                  "holder"
                              }
                              isChecked={
                                checkedAgrupados?.filter(
                                  (el) =>
                                    el?.beneficiary?.personId ===
                                    item?.beneficiary?.personId,
                                ).length > 0
                              }
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              onChange={(event: any) => {
                                event.stopPropagation();
                                const index = checkedAgrupados.indexOf(item);

                                if (index > -1) {
                                  setcheckedAgrupados([
                                    ...checkedAgrupados.slice(0, index),
                                    ...checkedAgrupados.slice(index + 1),
                                  ]);
                                } else {
                                  setcheckedAgrupados([
                                    ...checkedAgrupados,
                                    item,
                                  ]);
                                }
                              }}
                            >
                              <Text
                                marginLeft="20px"
                                textTransform="capitalize"
                              >
                                {capitalize(item?.beneficiary?.person?.name)} -{" "}
                                {
                                  BENEFICIARY_KINSHIP_COMPLETE[
                                    item?.beneficiary?.beneficiaryKinship
                                  ]
                                }
                              </Text>
                            </Checkbox>
                          ) : (
                            <Box display="flex">
                              {item?.adherence && item?.adherenceRule ? (
                                <FcCheckmark fontSize="18px" />
                              ) : (
                                <Text padding="0 4px 0 6px">-</Text>
                              )}
                              <Text
                                marginLeft={"23px"}
                                color={
                                  item?.adherence && item?.adherenceRule
                                    ? "unset"
                                    : "#8b8b8b"
                                }
                                textTransform="capitalize"
                              >
                                {capitalize(item?.beneficiary?.person?.name)} -{" "}
                                {
                                  BENEFICIARY_KINSHIP_COMPLETE[
                                    item?.beneficiary?.beneficiaryKinship
                                  ]
                                }
                              </Text>
                            </Box>
                          )}
                        </Td>
                        <Td
                          fontSize="1rem"
                          isNumeric
                          color={item?.adherenceRule ? "unset" : "#8b8b8b"}
                        >
                          {numberFormat(item?.value)}
                        </Td>
                      </Tr>
                    </React.Fragment>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <Box>
          <Box fontSize="0.9rem" color="#8b8b8b" padding="20px 0 0 18px">
            {dataFamily.filter((item) => item?.adherenceRule && item?.adherence)
              .length > 0 && (
              <Box
                display="flex"
                alignItems="center"
                gap="5px"
                marginBottom="10px"
              >
                <FcCheckmark fontSize="18px" /> Usuário já possui este produto.
              </Box>
            )}
            {dataFamily.filter((item) => !item?.adherenceRule).length > 0 && (
              <Box w="max-content" paddingLeft="5px">
                - Produto indisponível para o titular e/ou dependente devido às
                regras de adesão.
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Flex justifyContent="space-between">
        <Flex justifyContent="flex-start" w="max-content" gap="15px">
          {page === "beneficios" && (
            <Button
              w="220px"
              size="md"
              onClick={() => {
                setIndex(0);
                setHolderId("");
                setcheckedAgrupados([]);
              }}
              variant="outline"
              className="adesa-btn-another-collaborator-desktop"
            >
              Selecionar titular
            </Button>
          )}
          <Button
            w="200px"
            size="md"
            onClick={() => {
              setIndex(4);
            }}
            className="adesa-btn-new-dependent"
          >
            Novo Dependente
          </Button>
        </Flex>

        {isNotDocuments ? (
          <Button
            isLoading={isLoading}
            size="md"
            mb="-18px"
            onClick={handleAdhesion}
            isDisabled={checkedAgrupados?.length < 1}
          >
            Fazer Adesão
          </Button>
        ) : (
          <Button
            size="md"
            mb="-18px"
            onClick={() => {
              setIndex(2);
            }}
            isDisabled={checkedAgrupados?.length < 1}
          >
            Próximo
          </Button>
        )}
      </Flex>
    </>
  ) : (
    <AlertNoDataFound title="Nenhuma regra de adesão encontrada" />
  );
};

export default AdhesionContent;
