import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import useCollaborator from "../../hooks/useCollaborator";
import {
  IBneficiaryContractsData,
  IDataCollaborator,
  IFamilyBenefitsGroup,
} from "../../models/collaborator.model";
import { keys } from "../../services/query";
import { cpfMask, dateFormat, numberFormat } from "../../utils";
import { capitalize } from "../../utils/capitalize";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../utils/enumFormat";
import { Checkbox } from "../CancelBenefitProcess/styled";
import Loading from "../Loading";
import CancelBenefitReasonsConfirm from "./CancelBenefitReasonsConfirm";

interface PropsLike {
  isOpen: boolean;
  onClose: () => void;
  adherenceProposalId: string;
  holder: IDataCollaborator | null;
  product: IFamilyBenefitsGroup;
}

const CancelBenefit: React.FC<PropsLike> = ({
  isOpen,
  onClose,
  adherenceProposalId,
  holder,
  product,
}) => {
  const { getProposalAdherence } = useCollaborator();
  const queryClient = useQueryClient();
  const { data, isLoading, totais } = getProposalAdherence(adherenceProposalId);
  const [checkedAgrupados, setcheckedAgrupados] = useState<
    IBneficiaryContractsData[]
  >([]);
  const [step, setStep] = useState(0);

  const handleCheckFlow = async () => {
    setStep(1);
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        if (step === 2) {
          queryClient.invalidateQueries([
            keys.collaborator,
            "family",
            "benefits",
          ]);
          queryClient.refetchQueries([keys.collaborator, "family", "benefits"]);
        }

        setcheckedAgrupados([]);

        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent
        paddingBottom="4"
        marginLeft="15px"
        marginRight="15px"
        maxWidth="95%"
        minWidth="700px"
        width="max-content"
      >
        <ModalHeader textAlign="center">
          {step < 2 && "Cancelamento de Benefício"}
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Box margin="40px 0">
              <Loading />
            </Box>
          ) : (
            <>
              {step === 0 && (
                <>
                  <Box fontSize="18px">
                    <Box fontSize="16px" marginBottom="20px">
                      <Text fontWeight="bold" fontSize="18px">
                        {product?.providerName} -{" "}
                        {capitalize(product?.productCommercialName)}
                      </Text>
                      <Text fontWeight="bold">
                        Titular: {capitalize(holder?.person?.name)}
                      </Text>
                      <Text fontWeight="bold">
                        CPF: {cpfMask(holder?.person?.cpf || "")}
                      </Text>
                    </Box>
                    <TableContainer>
                      <Table size="md">
                        <Thead>
                          <Tr>
                            <Th fontSize="1rem">
                              <Checkbox
                                isChecked={
                                  checkedAgrupados.length === data?.length
                                }
                                onChange={() => {
                                  const agrupadosIds = data;
                                  if (
                                    checkedAgrupados.length ===
                                    agrupadosIds.length
                                  ) {
                                    setcheckedAgrupados([]);
                                  } else {
                                    setcheckedAgrupados(agrupadosIds);
                                  }
                                }}
                              ></Checkbox>
                            </Th>
                            <Th>Beneficiário</Th>
                            <Th>CPF</Th>
                            <Th>Parentesco</Th>
                            <Th>
                              Início da
                              <br />
                              Vigência
                            </Th>
                            <Th>
                              Valor
                              <br />
                              Benefício
                            </Th>
                            <Th>
                              Valor Pago
                              <br />
                              pela Empresa
                            </Th>
                            <Th>
                              Valor Pago
                              <br />
                              pelo Titular
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {data?.map((item, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Tr>
                                  <Td fontSize="1rem">
                                    <Checkbox
                                      isChecked={checkedAgrupados.includes(
                                        item,
                                      )}
                                      onChange={(event) => {
                                        event.stopPropagation();
                                        const index =
                                          checkedAgrupados.indexOf(item);
                                        const agrupadosIds = data;
                                        if (
                                          ["health", "odontology"].includes(
                                            item?.productClass,
                                          ) &&
                                          item?.beneficiary
                                            ?.beneficiaryKinship === "holder"
                                        ) {
                                          if (
                                            checkedAgrupados.length ===
                                            agrupadosIds.length
                                          ) {
                                            setcheckedAgrupados([]);
                                          } else {
                                            setcheckedAgrupados(agrupadosIds);
                                          }
                                        } else if (
                                          ["health", "odontology"].includes(
                                            item?.productClass,
                                          ) &&
                                          item?.beneficiary
                                            ?.beneficiaryKinship !== "holder" &&
                                          checkedAgrupados.length ===
                                            agrupadosIds.length
                                          // eslint-disable-next-line no-empty
                                        ) {
                                        } else if (index > -1) {
                                          setcheckedAgrupados([
                                            ...checkedAgrupados.slice(0, index),
                                            ...checkedAgrupados.slice(
                                              index + 1,
                                            ),
                                          ]);
                                        } else {
                                          setcheckedAgrupados([
                                            ...checkedAgrupados,
                                            item,
                                          ]);
                                        }
                                      }}
                                    ></Checkbox>
                                  </Td>
                                  <Td fontSize="1rem">
                                    {capitalize(
                                      item?.beneficiary?.person?.name,
                                    )}
                                  </Td>
                                  <Td fontSize="1rem">
                                    {cpfMask(
                                      item?.beneficiary?.person?.cpf || "",
                                    )}
                                  </Td>
                                  <Td fontSize="1rem">
                                    {
                                      BENEFICIARY_KINSHIP_COMPLETE[
                                        item?.beneficiary?.beneficiaryKinship
                                      ]
                                    }
                                  </Td>
                                  <Td fontSize="1rem">
                                    {dateFormat(
                                      new Date(item?.effectiveStartDate),
                                    )}
                                  </Td>
                                  <Td fontSize="1rem">
                                    {numberFormat(item?.value)}
                                  </Td>
                                  <Td fontSize="1rem">
                                    {item?.parametrizer?.percentageValue === "V"
                                      ? numberFormat(
                                          item?.parametrizer?.value || 0,
                                        )
                                      : numberFormat(
                                          item?.value *
                                            ((item?.parametrizer?.value || 0) /
                                              100),
                                        )}
                                  </Td>
                                  <Td fontSize="1rem">
                                    {item?.parametrizer?.percentageValue === "V"
                                      ? numberFormat(
                                          item?.value -
                                            item?.parametrizer?.value || 0,
                                        )
                                      : numberFormat(
                                          item?.value -
                                            item?.value *
                                              ((item?.parametrizer?.value ||
                                                0) /
                                                100),
                                        )}
                                  </Td>
                                </Tr>
                              </React.Fragment>
                            );
                          })}
                        </Tbody>
                        <Tfoot>
                          <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                            <Th textAlign="right" textTransform="capitalize">
                              <b>Total</b>
                            </Th>
                            <Th fontSize="1rem">
                              <b>{numberFormat(totais?.valorProdutoTotal)}</b>
                            </Th>
                            <Th fontSize="1rem">
                              <b>{numberFormat(totais?.valorEmpresaTotal)}</b>
                            </Th>
                            <Th fontSize="1rem">
                              <b>
                                {numberFormat(totais?.valorColaboradorTotal)}
                              </b>
                            </Th>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    margin="30px 0 10px"
                  >
                    <Button
                      isDisabled={checkedAgrupados.length < 1}
                      size="md"
                      onClick={handleCheckFlow}
                    >
                      Continuar cancelamento
                    </Button>
                  </Box>
                </>
              )}

              {[1, 2].includes(step) && (
                <CancelBenefitReasonsConfirm
                  step={step}
                  setStep={setStep}
                  companyContractId={product?.companyContractId}
                  checkedAgrupados={checkedAgrupados}
                  onClose={onClose}
                />
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CancelBenefit;
