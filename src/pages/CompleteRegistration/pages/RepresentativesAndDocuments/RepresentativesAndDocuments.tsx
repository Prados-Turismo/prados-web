import { Box, Flex, Text } from "@chakra-ui/layout";
import RepresentativeForm from "../../components/RepresentativeForm";
import TitleAndDescription from "../../components/TitleAndDescription";
import DocumentsForm from "../../components/DocumentsForm";
import useCompleteRegistration from "../../../../hooks/useCompleteRegistration";
import RepresentativeList from "../../components/RepresentativeList";
import { Button, Skeleton, useDisclosure } from "@chakra-ui/react";
import { IRepresentativeAndDocuments } from "./types";
import AlertModal from "../../../../components/AlertModal";
import { useNavigate } from "react-router-dom";
import AlertContent from "../../../../components/AlertContent";
import { useGlobal } from "../../../../contexts/UserContext";
import AlertErrorContent from "../../../../components/AlertErrorContent";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";

const RepresentativesAndDocuments = ({
  setStep,
}: IRepresentativeAndDocuments) => {
  const { companyStatus } = useGlobal();
  const navigate = useNavigate();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { getLegalRepresentative, getLegalDocuments, revalidateDocument } =
    useCompleteRegistration();
  const {
    data: legalRepresentativeData,
    isLoading: isLoadingLegalRepresentative,
  } = getLegalRepresentative();
  const { data: legalDocumentsData, isLoading: isLoadingLegalDocuments } =
    getLegalDocuments();
  const { mutate: revalidateMutate, isLoading: isLoadingRevalidate } =
    revalidateDocument(setStep);

  return (
    <>
      <Box w="100%">
        <TitleAndDescription
          title="Representantes"
          description="O representante legal de uma empresa é a pessoa designada no contrato
          ou estatuto social para agir em seu nome em atos jurídicos, incluindo
          a assinatura de contratos."
        />

        {legalRepresentativeData?.filter(
          (el) => el?.representativeStatus === "rejected",
        ).length > 0 && (
          <AlertErrorContent
            content={legalRepresentativeData?.map((el) => (
              <Flex key={el?.id} gap="5px">
                <Text fontWeight={600}>
                  <TooltipSubstring name={el?.name} length={40} />:
                </Text>
                <Text>{el?.observation}</Text>
              </Flex>
            ))}
          />
        )}

        {isLoadingLegalRepresentative && (
          <Flex gap="24px">
            <Skeleton h="70px" w="100%" />
            <Skeleton h="70px" w="100%" />
            <Skeleton h="70px" w="100%" />
          </Flex>
        )}

        {!isLoadingLegalRepresentative && (
          <>
            {legalRepresentativeData?.map((item) => (
              <RepresentativeList key={item?.id} item={item} />
            ))}
            <RepresentativeForm
              representativeCount={legalRepresentativeData?.length}
            />
          </>
        )}

        <Box mt="32px" borderBottom="1px solid #EDEDED"></Box>

        <TitleAndDescription
          title="Documentos"
          description="Os documentos listados abaixo serão fundamentais para auxiliar nossa equipe jurídica na avaliação
        dos dados da empresa, assim como na análise dos documentos dos representantes legais."
        />

        {legalDocumentsData?.filter((el) => el?.documentStatus === "rejected")
          .length > 0 && (
          <AlertErrorContent
            content={legalDocumentsData
              .filter((el) => el?.documentStatus === "rejected")
              .map((el) => (
                <Flex key={el?.id} gap="5px">
                  <Text fontWeight={600}>
                    <TooltipSubstring name={el?.name} length={40} />:
                  </Text>
                  <Text>{el?.observation}</Text>
                </Flex>
              ))}
          />
        )}

        <DocumentsForm
          data={legalDocumentsData}
          isLoading={isLoadingLegalDocuments}
        />

        <Flex
          w="100%"
          justifyContent="flex-end"
          marginTop="60px"
          gap="24px"
          flexWrap="wrap"
        >
          {companyStatus?.status === "acceptedTerm" && (
            <Button
              w="139px"
              borderRadius="4px"
              variant="outline"
              color="brand.500"
              onClick={() => onOpen()}
            >
              Sair
            </Button>
          )}
          <Button
            isLoading={isLoadingRevalidate}
            w="209px"
            isDisabled={
              legalRepresentativeData?.length === 0 ||
              legalDocumentsData?.filter(
                (doc) => doc?.documentType === "incorporationActs",
              )?.length === 0 ||
              legalRepresentativeData?.filter(
                (el) => el?.representativeStatus === "rejected",
              ).length > 0 ||
              legalDocumentsData?.filter(
                (el) => el?.documentStatus === "rejected",
              ).length > 0
            }
            borderRadius="4px"
            onClick={() => {
              if (companyStatus?.status === "reproved") {
                revalidateMutate();
              } else {
                setStep(2);
              }
            }}
          >
            Salvar e continuar
          </Button>
        </Flex>
      </Box>

      {isOpen && (
        <AlertModal
          request={() => {
            navigate("/");
          }}
          showModal={isOpen}
          setShowModal={onClose}
          size="md"
        >
          <AlertContent
            title="Você tem certeza de que deseja sair desta tela?"
            description="É importante lembrar que enquanto o cadastro não for concluído, a contratação de produtos de saúde e odontológicos não será possível."
          />
        </AlertModal>
      )}
    </>
  );
};

export default RepresentativesAndDocuments;
