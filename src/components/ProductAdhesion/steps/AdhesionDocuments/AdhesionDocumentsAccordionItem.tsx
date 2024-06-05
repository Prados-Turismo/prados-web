import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { IFamilyContractData } from "../../../../models/productAdhesion.model";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../../../utils/enumFormat";
import { FcOk, FcHighPriority } from "react-icons/fc";
import UploadDocument from "../../components/UploadDocument";
import { useEffect, useState } from "react";
import useCollaborator from "../../../../hooks/useCollaborator";
import { capitalize } from "../../../../utils/capitalize";

interface IAdhesionDocumentsAccordionItem {
  item: IFamilyContractData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDocumentValidation: any;
}

const AdhesionDocumentsAccordionItem = ({
  item,
  setDocumentValidation,
}: IAdhesionDocumentsAccordionItem) => {
  const { getPersonDocuments } = useCollaborator();
  const [numberRequiredDocumentsSent, setnumberRequiredDocumentsSent] =
    useState<number>();
  const [numberRequiredDocuments, setNumberRequiredDocuments] =
    useState<number>();
  const { data: personDocumentData, isLoading: isLoadingPersonDocumentData } =
    getPersonDocuments(item?.beneficiary?.personId);

  useEffect(() => {
    if (personDocumentData) {
      const docSentNumber =
        item?.adherenceRule?.documentsOnAdherenceRules?.filter(
          (doc) =>
            personDocumentData?.filter(
              (el) =>
                el?.personDocumentTypeId === doc?.personDocumentTypeId &&
                el?.personId === item?.beneficiary?.personId,
            ).length > 0 && doc?.required,
        ).length;

      const requiredDocNumber =
        item?.adherenceRule?.documentsOnAdherenceRules?.filter(
          (doc) => doc?.required,
        )?.length;
      setnumberRequiredDocumentsSent(docSentNumber);
      setNumberRequiredDocuments(requiredDocNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personDocumentData]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDocumentValidation((e: any) => [
      ...(e?.filter(
        (el: { personId: string }) =>
          el?.personId !== item?.beneficiary?.personId,
      ) || null),
      {
        personId: item?.beneficiary?.personId,
        checked: numberRequiredDocuments === numberRequiredDocumentsSent,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberRequiredDocumentsSent]);

  return isLoadingPersonDocumentData ? (
    <Skeleton w="100%" h="47px" margin="5px 0" />
  ) : (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box
            flex="1"
            textAlign="left"
            textTransform="capitalize"
            fontSize="1.2rem"
          >
            {capitalize(item?.beneficiary?.person?.name)} -{" "}
            {
              BENEFICIARY_KINSHIP_COMPLETE[
                item?.beneficiary?.beneficiaryKinship
              ]
            }
          </Box>

          {numberRequiredDocumentsSent === numberRequiredDocuments ? (
            <Box padding="5px">
              <FcOk size="23px" />
            </Box>
          ) : (
            <Box padding="5px">
              <FcHighPriority size="23px" />
            </Box>
          )}
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
        {item?.adherenceRule?.documentsOnAdherenceRules?.filter(
          (el) => el?.required,
        ).length > 0 && (
          <Box display="flex" flexDirection="column">
            <Text fontWeight="bold" fontSize="1.1rem">
              Documentos Obrigatórios
            </Text>
            {item?.adherenceRule?.documentsOnAdherenceRules
              .filter((el) => el?.required)
              // .sort(sortDESC)
              .map((doc, index) => (
                <UploadDocument
                  doc={doc}
                  personId={item?.beneficiary?.personId}
                  authorizesDownloadDocument={
                    item?.beneficiary?.authorizesDownloadDocument
                  }
                  key={index}
                  personDocumentData={personDocumentData}
                />
              ))}
          </Box>
        )}
        {item?.adherenceRule?.documentsOnAdherenceRules.filter(
          (el) => !el?.required,
        ).length > 0 && (
          <Box display="flex" flexDirection="column">
            <Text fontWeight="bold" fontSize="1.1rem">
              Documentos não obrigatórios
            </Text>
            {item?.adherenceRule?.documentsOnAdherenceRules
              .filter((el) => !el?.required)
              // .sort(sortDESC)
              .map((doc, index) => (
                <UploadDocument
                  doc={doc}
                  personId={item?.beneficiary?.personId}
                  authorizesDownloadDocument={
                    item?.beneficiary?.authorizesDownloadDocument
                  }
                  key={index}
                  personDocumentData={personDocumentData}
                />
              ))}
          </Box>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AdhesionDocumentsAccordionItem;
