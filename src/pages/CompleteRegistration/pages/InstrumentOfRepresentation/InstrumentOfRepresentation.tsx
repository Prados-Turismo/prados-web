import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import TitleAndDescription from "../../components/TitleAndDescription";
import { IInstrumentOfRepresentation } from "./types";
import { useNavigate } from "react-router-dom";
import { Skeleton, useDisclosure } from "@chakra-ui/react";
import AlertModal from "../../../../components/AlertModal";
import AlertContent from "../../../../components/AlertContent";
import useCompleteRegistration from "../../../../hooks/useCompleteRegistration";
import SubscriberStatus from "./components/SubscriberStatus";
import { useGlobal } from "../../../../contexts/UserContext";

const InstrumentOfRepresentation = ({
  setStep,
}: IInstrumentOfRepresentation) => {
  const navigate = useNavigate();
  const { companyStatus } = useGlobal();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { createDocumentToSign, getSignaturesStatus } =
    useCompleteRegistration();
  const { mutate, isLoading } = createDocumentToSign();
  const { data, isLoading: isLoadingSignatures } = getSignaturesStatus();

  const isSubscriber = [
    "waitingLegalSubscriber",
    "waitingLegalApproval",
    "waitingInternalSubscriber",
  ].includes(companyStatus?.status || "");

  return (
    <>
      <Box w="100%">
        <TitleAndDescription
          title="Instrumento de representação"
          description="O Instrumento de Representação é um documento que funciona como uma procuração específica, que sendo assinada pela empresa interessada em contratar planos ou seguros de saúde e odontológicos da plataforma, esse documento concederá à Administradora de Benefícios a autorização para representar a empresa perante as Operadoras e Seguradoras de Planos de Saúde, permitindo a gestão eficiente dos produtos de saúde e odontológicos de forma centralizada através da plataforma."
          maxW="100%"
        />

        <TitleAndDescription
          title=""
          subtitle="Observação: "
          description={
            isSubscriber
              ? "O instrumento de representação foi gerado e encaminhado aos representantes cadastrados. Após as assinaturas nossa equipe jurídica analisará os documentos recebidos para validar e concluir o cadastro da sua empresa. Enviaremos e-mails para mantê-lo informado sobre o andamento do processo."
              : "Clique no botão abaixo para gerar automaticamente o instrumento de representação e enviá-lo para o e-mail dos representantes cadastrados."
          }
          maxW="100%"
        />

        {isSubscriber && (
          <>
            {isLoadingSignatures && <Skeleton h="118px" w="100%" />}

            {!isLoadingSignatures && data && (
              <Flex gap="24px" w="100%" flexWrap="wrap">
                {data?.map(
                  (el) =>
                    el?.signatureRepresentative?.map((el) => (
                      <SubscriberStatus key={el?.id} data={el} />
                    )),
                )}
              </Flex>
            )}
          </>
        )}

        {!isSubscriber && (
          <Flex w="100%" justifyContent="center">
            <Button
              borderRadius="4px"
              marginTop="16px"
              isLoading={isLoading}
              onClick={() => mutate()}
            >
              Enviar e-mail para representantes
            </Button>
          </Flex>
        )}

        <Flex
          w="100%"
          justifyContent="space-between"
          marginTop="80px"
          gap="24px"
          flexWrap="wrap"
          alignItems="center"
        >
          {companyStatus?.status !== "waitingLegalApproval" && (
            <Button
              isDisabled={isLoading}
              borderRadius="4px"
              w="123px"
              variant="outline"
              color="brand.500"
              onClick={() => setStep(1)}
            >
              Voltar
            </Button>
          )}
          {!isSubscriber && (
            <Button
              w="209px"
              borderRadius="4px"
              onClick={() => onOpen()}
              isDisabled={isLoading}
            >
              Sair
            </Button>
          )}
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

export default InstrumentOfRepresentation;
