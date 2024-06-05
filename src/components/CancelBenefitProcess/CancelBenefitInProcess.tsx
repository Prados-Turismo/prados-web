/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Loading from "../Loading";
import { Checkbox } from "./styled";
import useCollaborator from "../../hooks/useCollaborator";
import Swal from "sweetalert2";
import { IBneficiaryContractsData } from "../../models/collaborator.model";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../utils/enumFormat";
import { capitalize } from "../../utils/capitalize";

interface PropsLike {
  isOpen: boolean;
  onClose: () => void;
  adherenceProposalId: string;
}

const CancelBenefitInProcess: React.FC<PropsLike> = ({
  isOpen,
  onClose,
  adherenceProposalId,
}) => {
  const { getProposalAdherence, cancelProductInProcess } = useCollaborator();
  const [checkedAgrupados, setcheckedAgrupados] = useState<
    IBneficiaryContractsData[]
  >([]);

  const { mutate, isLoading: isLoadingCancel } = cancelProductInProcess({
    onClose,
  });

  const { data, isLoading } = getProposalAdherence(adherenceProposalId);

  const handleCancel = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `Deseja cancelar a solicitação para ativação de produto?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (res) => {
      if (res.isConfirmed) {
        mutate({
          beneficiaryContractIds: checkedAgrupados?.map((el) => el?.id),
        });
      }
    });
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent paddingBottom="4" maxW="600px">
        <ModalHeader>Cancelamento de Adesão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Box margin="40px 0">
              <Loading />
            </Box>
          ) : (
            <>
              <Box fontSize="18px">
                <Text fontWeight="bold" marginBottom="10px">
                  Selecione abaixo as adesões a serem canceladas:
                </Text>
                <TableContainer>
                  <Table size="md">
                    <Thead>
                      <Tr>
                        <Th fontSize="1rem">
                          <Checkbox
                            isChecked={checkedAgrupados.length === data?.length}
                            onChange={() => {
                              const agrupadosIds = data;
                              if (
                                checkedAgrupados.length === agrupadosIds.length
                              ) {
                                setcheckedAgrupados([]);
                              } else {
                                setcheckedAgrupados(agrupadosIds);
                              }
                            }}
                          >
                            <Text marginLeft="20px">Titular/Dependente(s)</Text>
                          </Checkbox>
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
                                  // isReadOnly={
                                  // ["health", "odontology"].includes(
                                  //   item?.productClass,
                                  // ) &&
                                  // item?.beneficiary?.beneficiaryKinship ===
                                  //   "holder"
                                  // }
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
                                    const index =
                                      checkedAgrupados.indexOf(item);

                                    if (index > -1) {
                                      setcheckedAgrupados([
                                        ...checkedAgrupados.slice(0, index),
                                        ...checkedAgrupados.slice(index + 1),
                                      ]);
                                    } else {
                                      if (
                                        ["health", "odontology"].includes(
                                          item?.productClass,
                                        ) &&
                                        item?.beneficiary
                                          ?.beneficiaryKinship === "holder"
                                      ) {
                                        setcheckedAgrupados(data);
                                      } else {
                                        setcheckedAgrupados([
                                          ...checkedAgrupados,
                                          item,
                                        ]);
                                      }
                                    }
                                  }}
                                >
                                  <Text
                                    marginLeft="20px"
                                    textTransform="capitalize"
                                  >
                                    {capitalize(
                                      item?.beneficiary?.person?.name,
                                    )}{" "}
                                    -{" "}
                                    {
                                      BENEFICIARY_KINSHIP_COMPLETE[
                                        item?.beneficiary?.beneficiaryKinship
                                      ]
                                    }
                                  </Text>
                                </Checkbox>
                              </Td>
                            </Tr>
                          </React.Fragment>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>

              <Box display="flex" justifyContent="center" marginTop="20px">
                <Button
                  isLoading={isLoadingCancel}
                  isDisabled={checkedAgrupados.length < 1}
                  mx="auto"
                  mt={6}
                  size="md"
                  onClick={handleCancel}
                >
                  Confirmar cancelamento
                </Button>
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CancelBenefitInProcess;
