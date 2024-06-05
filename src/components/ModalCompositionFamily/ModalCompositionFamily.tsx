import { Box, Text } from "@chakra-ui/react";

import Loading from "../Loading";
import SimpleModal from "../SimpleModal";
import { Table, TBody, TD, THead, TR } from "../Table";

import useCollaborator from "../../hooks/useCollaborator";

import { useGlobal } from "../../contexts/UserContext";
import { cpfMask, dateFormat, numberFormat } from "../../utils";
import { capitalize } from "../../utils/capitalize";
import {
  BENEFICIARY_CONTRACT_STATUS,
  BENEFICIARY_KINSHIP,
} from "../../utils/enumFormat";
import { IModalCompositionFamily } from "./types";
import AlertNoDataFound from "../AlertNoDataFound";

const ModalCompositionFamily = ({
  title,
  holder,
  group,
  isOpen,
  handleModal,
}: IModalCompositionFamily) => {
  const { company } = useGlobal();
  const { getFamilyComposition } = useCollaborator();
  const { isLoading, data, totais } = getFamilyComposition({
    beneficiaryId: holder?.id,
    companyId: company?.externalCompanyId || "",
    group,
  });

  return (
    <SimpleModal
      title={title}
      isOpen={isOpen}
      contentExtraLarge={isLoading || data?.length < 1 ? false : true}
      handleModal={handleModal}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="15px"
        minWidth={!isLoading && data?.length > 0 ? "1800px" : "max-content"}
        padding="25px"
        w="100%"
      >
        <Box>
          <Text>Titular: {capitalize(holder?.person?.name)}</Text>
          <Text>
            CPF: {holder?.person?.cpf ? cpfMask(holder?.person?.cpf) : "-"}
          </Text>
          <Text>Categoria: {holder?.sector?.name || "-"}</Text>
          <Text>Subcategoria: {holder?.position?.name || "-"}</Text>
        </Box>
        {isLoading && (
          <Box
            width="100%"
            height="250px"
            display="flex"
            justifyContent="center"
          >
            <Loading />
          </Box>
        )}

        {!isLoading && data?.length > 0 && (
          <>
            <Box>
              <Table width="100%">
                <THead>
                  <TD>
                    <b>Beneficiário(a)</b>
                  </TD>
                  <TD>
                    <b>Solicitado por</b>
                  </TD>
                  <TD>
                    <b>Parentesco</b>
                  </TD>
                  <TD>
                    <b>Fornecedor</b>
                  </TD>
                  <TD>
                    <b>Produto</b>
                  </TD>
                  <TD>
                    <b>Status</b>
                  </TD>
                  <TD textAlign="center">
                    <b>Início da Vigência</b>
                  </TD>
                  <TD textAlign="center">
                    <b>Valor Produto</b>
                  </TD>
                  <TD textAlign="center">
                    <b>Valor pago pela Empresa</b>
                  </TD>
                  <TD textAlign="center">
                    <b>Valor pago pelo Titular</b>
                  </TD>
                </THead>

                <TBody>
                  {data.map((item, key) => (
                    <TR key={key}>
                      <TD>{capitalize(item?.beneficiaryName)}</TD>
                      <TD>{item?.createdBy || "-"}</TD>
                      <TD>
                        {item?.beneficiaryKinship === "holder"
                          ? "Titular"
                          : BENEFICIARY_KINSHIP[item?.beneficiaryKinship]}
                      </TD>
                      <TD>{item?.providerName}</TD>
                      <TD padding="0 5px">
                        {capitalize(item?.productCommercialName)}
                      </TD>
                      <TD>{BENEFICIARY_CONTRACT_STATUS[item.status]}</TD>
                      <TD textAlign="center">
                        {dateFormat(new Date(item?.effectiveStartDate))}
                      </TD>
                      <TD textAlign="center">
                        {numberFormat(item?.value || 0)}
                      </TD>
                      <TD textAlign="center">
                        {item?.parametrizer?.percentageValue === "V"
                          ? numberFormat(item?.parametrizer?.value || 0)
                          : numberFormat(
                              item?.value *
                                ((item?.parametrizer?.value || 0) / 100),
                            )}
                      </TD>
                      <TD textAlign="center">
                        {item?.parametrizer?.percentageValue === "V"
                          ? numberFormat(
                              item?.value - item?.parametrizer?.value || 0,
                            )
                          : numberFormat(
                              item?.value -
                                item?.value *
                                  ((item?.parametrizer?.value || 0) / 100),
                            )}
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </Box>

            <Box display="flex" justifyContent="end">
              <Box
                width="640px"
                marginRight="42px"
                display="flex"
                justifyContent="space-around"
                flexDirection="row"
              >
                <b>Total</b>
                <b>{numberFormat(totais?.valorProdutoTotal)}</b>
                <b>{numberFormat(totais?.valorEmpresaTotal)}</b>
                <b>{numberFormat(totais?.valorColaboradorTotal)}</b>
              </Box>
            </Box>
          </>
        )}
        {!isLoading && data?.length === 0 && (
          <AlertNoDataFound title="Nenhum produto encontrado" />
        )}
      </Box>
    </SimpleModal>
  );
};

export default ModalCompositionFamily;
