/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Content } from "./styled";
import { IResubmissionDocModal } from "./types";
import SimpleModal from "../SimpleModal";
import Loading from "../Loading/Loading";
import useCollaborator from "../../hooks/useCollaborator";
import { FcHighPriority } from "react-icons/fc";
import { IDataPersonDocuments } from "../../models/collaborator.model";
import DocumentUploadRow from "./components/DocumentUploadRow";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../utils/enumFormat";
import { useState } from "react";
import { capitalize } from "../../utils/capitalize";

function documentsCount(array: any) {
  let totalDocumentos = 0;

  array.forEach((objeto: any) => {
    if (objeto.docs && Array.isArray(objeto.docs)) {
      totalDocumentos += objeto.docs.length;
    }
  });
  return totalDocumentos;
}

const ResubmissionDocModal = ({
  adherenceProposalId,
  showModal,
  setShowModal,
}: IResubmissionDocModal) => {
  const { getResubmissionsDoc } = useCollaborator();
  const [ísFetching, setIsFetching] = useState(false);

  const { data, isLoading } = getResubmissionsDoc({
    proposalId: adherenceProposalId,
    setShowModal,
  });

  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      size={data?.length > 0 ? "4xl" : "2xl"}
      minHeight="160px"
      title="Pendências"
      footer={
        <Flex justifyContent="flex-start" w="100%">
          <Button
            border="none"
            background="#F5F5F5"
            borderRadius="4px"
            variant="outline"
            onClick={() => {
              if (!isLoading) {
                setShowModal(false);
              }
            }}
          >
            Cancelar
          </Button>
        </Flex>
      }
    >
      <Content>
        {isLoading && (
          <Box margin="60px 0">
            <Loading />
          </Box>
        )}

        {!isLoading && data.length > 0 && (
          <>
            <Accordion allowMultiple margin="60px 0 60px">
              {data.map((item: IDataPersonDocuments, index: number) => (
                <AccordionItem
                  key={`${item?.beneficiaryName}-${index}`}
                  isDisabled={ísFetching}
                >
                  <h2>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        textTransform="capitalize"
                        fontSize="1.2rem"
                      >
                        {capitalize(item?.beneficiaryName)}
                        {` (${
                          BENEFICIARY_KINSHIP_COMPLETE[item?.beneficiaryKinship]
                        })`}
                      </Box>

                      <Box padding="5px">
                        <FcHighPriority size="23px" />
                      </Box>

                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    pt={4}
                    display="flex"
                    flexDirection="column"
                    gap="30px"
                    marginBottom="30px"
                  >
                    <Box display="flex" flexDirection="column">
                      {item?.docs.map((doc, index) => (
                        <Box key={index}>
                          <DocumentUploadRow
                            doc={doc}
                            count={documentsCount(data)}
                            setShowModal={setShowModal}
                            proposalId={adherenceProposalId}
                            setIsFetching={setIsFetching}
                            ísFetching={ísFetching}
                          />
                        </Box>
                      ))}
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        )}
      </Content>
    </SimpleModal>
  );
};

export default ResubmissionDocModal;
