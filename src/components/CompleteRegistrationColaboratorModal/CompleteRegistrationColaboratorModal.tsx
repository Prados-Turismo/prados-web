import { Box, Button, Flex, Img, Text, useTheme } from "@chakra-ui/react";

import { FiCheck } from "react-icons/fi";
import { pixelToRem } from "../../utils";
import SimpleModal from "../SimpleModal";
import { ICompleteRegistrationColaboratorModal } from "./types";

const CompleteRegistrationColaboratorModal = ({
  isOpen,
  handleModals,
  setStatus,
}: ICompleteRegistrationColaboratorModal) => {
  const theme = useTheme();

  return (
    <SimpleModal size="3xl" isOpen={isOpen} handleModal={handleModals}>
      <Box padding="32px">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          marginTop="50px"
        >
          <Img
            src={theme.images.iaraPreuser}
            alt={theme.content.project}
            position="absolute"
            bottom="1px"
            borderBottomRightRadius="209px"
            borderBottomLeftRadius="186px"
          />
          <Box position="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="163"
              height="163"
              viewBox="0 0 163 163"
              fill="none"
            >
              <circle
                cx="81.5"
                cy="81.5"
                r="81.5"
                fill="#333333"
                fillOpacity="0.08"
              />
            </svg>
            <Box
              backgroundColor="brand.500"
              color="contrast"
              borderRadius="100%"
              padding="4px"
              position="absolute"
              bottom="10px"
              right="10px"
            >
              <FiCheck size={25} />
            </Box>
          </Box>
        </Box>

        <Text fontSize={pixelToRem(20)} fontWeight="600" margin="25px 0">
          Cadastro incompleto
        </Text>
        <Text
          fontSize={pixelToRem(18)}
          color="#909090"
          margin="0 0 72px"
          lineHeight="150%"
        >
          Ops! O cadastro do titular escolhido para a adesão do produto está
          incompleto, clique em &quot;Continuar&quot; para finalizar o cadastro.
        </Text>

        <Flex justifyContent="flex-end" gap="12px" flexWrap="wrap">
          <Button
            variant="outline"
            onClick={handleModals}
            border="none"
            background="#F5F5F5"
          >
            Deixar para mais tarde
          </Button>
          <Button w="170px" onClick={() => setStatus && setStatus(1)}>
            Continuar
          </Button>
        </Flex>
      </Box>
    </SimpleModal>
  );
};

export default CompleteRegistrationColaboratorModal;
