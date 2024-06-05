import { Box, Button, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";
import { useState } from "react";
import { useGlobal } from "../../contexts/UserContext";
import useTermsAndPolicy from "../../hooks/useTermsAndPolicy";
import SimpleModal from "../SimpleModal";
import AcceptTerm from "../AcceptTerm";

const TermsOfUse = () => {
  const [checked, setChecked] = useState(false);
  const [termOfUseModalOpen, setTermOfUseModalOpen] = useState(false);
  const { company, user } = useGlobal();
  const { acceptTerm } = useTermsAndPolicy();
  const { isLoading, mutate } = acceptTerm(
    company?.externalCompanyId as string,
  );

  if (!company) return null;

  return (
    <>
      <Box maxW="800px" margin="auto auto" marginTop="100px">
        <Stack
          p="24px"
          direction="row"
          justifyContent="space-between"
          borderBottom="1px solid #E5E5E5"
        >
          <Text fontSize={pixelToRem(14)} lineHeight="14px" fontWeight={500}>
            Termos de uso
          </Text>
        </Stack>
        <Stack p="32px 24px">
          <Text fontSize={pixelToRem(14)} lineHeight="21px" mb="20px">
            Na Fiibo, valorizamos a transparência e a comunicação aberta com os
            usuários. Destacamos a importância de ler cuidadosamente o Termo de
            Uso antes da assinatura, que define as responsabilidades e direitos
            de ambas as partes. Incentivamos fortemente os usuários a entenderem
            o documento para estabelecer uma parceria fundamentada na
            compreensão mútua e garantir uma experiência positiva.
          </Text>
          <Text fontSize={pixelToRem(14)} lineHeight="21px" mb="20px">
            O Termo de Uso visa não apenas orientar operações, mas também
            proteger os interesses de ambas as partes, refletindo nosso
            compromisso com a transparência e a proteção dos direitos
            individuais.
          </Text>
        </Stack>
        <Stack p="0 24px">
          <Flex gap="12px" alignItems="center" mb="50px">
            <Checkbox
              _checked={{
                ".chakra-checkbox__control": {
                  bgColor: "brand.500",
                  borderColor: "brand.500",
                  boxShadow: "none",
                },
                ".chakra-checkbox__control:hover": {
                  bgColor: "brand.500",
                  borderColor: "brand.500",
                  boxShadow: "none",
                },
              }}
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Text fontSize={pixelToRem(14)} color="#707070">
              Li e aceito o{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setTermOfUseModalOpen(true)}
              >
                Termo de Uso
              </span>{" "}
              da plataforma da Fiibo
            </Text>
          </Flex>
          <Button
            w={134}
            height={37}
            isDisabled={!checked}
            alignSelf="flex-end"
            mb="20px"
            isLoading={isLoading}
            onClick={() =>
              mutate({
                email: user?.email || "",
                name: user?.username || "",
                useTerm: true,
                cpf: "300.776.030-52",
              })
            }
          >
            Continuar
          </Button>
        </Stack>
      </Box>

      <SimpleModal
        title="Termo de Uso"
        isOpen={termOfUseModalOpen}
        handleModal={setTermOfUseModalOpen}
        size="3xl"
      >
        <Box padding="10px" fontSize={pixelToRem(14)}>
          <AcceptTerm />
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              width="150px"
              margin="20px 0 30px"
              onClick={() => {
                setChecked(true);
                setTermOfUseModalOpen(false);
              }}
            >
              Eu aceito
            </Button>
          </Box>
        </Box>
      </SimpleModal>
    </>
  );
};

export default TermsOfUse;
