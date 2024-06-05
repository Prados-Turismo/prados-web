import { Box, Flex } from "@chakra-ui/layout";
import FormInput from "../../../../components/FormInput";
import { Button } from "@chakra-ui/button";
import { IRepresentativeList } from "./types";
import { cpfMask } from "../../../../utils";
import useCompleteRegistration from "../../../../hooks/useCompleteRegistration";
import { useDisclosure } from "@chakra-ui/react";
import AlertModal from "../../../../components/AlertModal";
import AlertContent from "../../../../components/AlertContent";
import { useGlobal } from "../../../../contexts/UserContext";
import AlertInfoIcon from "../../../../components/AlertInfoIcon/AlertInfoIcon";

const RepresentativeList = ({ item }: IRepresentativeList) => {
  const { companyStatus } = useGlobal();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { deleteLegalRepresentative } = useCompleteRegistration();
  const { mutate, isLoading } = deleteLegalRepresentative();

  return (
    <>
      <Box mt="32px">
        <Flex gap="24px" flexWrap="wrap">
          {item?.representativeStatus === "rejected" && (
            <Box paddingTop="38px">
              <AlertInfoIcon />
            </Box>
          )}
          <FormInput
            isReadOnly
            label="Representante legal"
            name="name"
            defaultValue={item?.name}
          />
          <FormInput
            isReadOnly
            label="CPF do representante"
            name="cpf"
            defaultValue={cpfMask(item?.cpf)}
          />
          <FormInput
            isReadOnly
            label="E-mail do representante"
            name="email"
            defaultValue={item?.email}
          />
        </Flex>

        <Flex alignItems="center" mt="32px" justifyContent="space-between">
          <Flex alignItems="center">
            <Button
              isLoading={isLoading}
              color="brand.500"
              h="max-content"
              variant="ghost"
              borderRadius="4px"
              fontWeight={500}
              onClick={onOpen}
              _hover={{
                backgrounColor: "white",
                opacity: "0.8",
              }}
            >
              - Remover representante
            </Button>
          </Flex>
          <Box></Box>
        </Flex>
      </Box>

      {isOpen && (
        <AlertModal
          isLoading={isLoading}
          request={() => {
            mutate(item?.id);
          }}
          showModal={isOpen}
          setShowModal={onClose}
          size="md"
        >
          <AlertContent
            title="Deseja remover o representante?"
            description={
              companyStatus?.status === "acceptedTerm"
                ? ""
                : "Ao remover o representante, excluiremos o contrato previamente enviado aos representantes por e-mail, além de procedermos com a geração e envio de um novo contrato para assinatura."
            }
          />
        </AlertModal>
      )}
    </>
  );
};

export default RepresentativeList;
