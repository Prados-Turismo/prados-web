import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
  Button as ButtonUI,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { cnpjMask, cnpjValidation, pixelToRem } from "../../../../utils";
import { cnpjIso } from "../../../../utils/fieldMask";
import { Button, FormBox, SubTitle, Title, Input } from "../../styled";
import { IOpenYourBusinessAccount } from "./types";
import useSignUp from "../../../../hooks/useSignUp";
import { CheckBoxTitle } from "./styled";
import SimpleModal from "../../../../components/SimpleModal";
import PrivacyPolicyText from "../../../../components/PrivacyPolicyText";
import AcceptTerm from "../../../../components/AcceptTerm";

const OpenYourBusinessAccount = ({
  form,
  setForm,
  handleNextStep,
}: IOpenYourBusinessAccount) => {
  const [errorCnpj, setErroCnpj] = useState(false);
  const [acceptTermModal, setAcceptTermModal] = useState(false);
  const [termOfUseModalOpen, setTermOfUseModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(form.cnpj ? false : true);

  const { checkByCnpj } = useSignUp();

  const {
    mutate,
    corporate,
    isLoading: isLoadingCheckCnpj,
  } = checkByCnpj(setIsDisabled, (companyId) =>
    setForm({
      ...form,
      id: companyId,
    }),
  );

  const handleCnpj = (value: string) => {
    setForm({
      ...form,
      cnpj: value,
      razaoSocial: "",
    });

    const validation = cnpjValidation(value);

    if (value?.length >= 14 && validation) {
      mutate({
        cnpj: value,
      });
    }
    if (value?.length > 0 && !validation) {
      setErroCnpj(true);
    } else {
      setErroCnpj(false);
    }
  };

  useEffect(() => {
    if (corporate) {
      setForm({
        ...form,
        cnpj: corporate.cnpj,
        razaoSocial: corporate.corporateName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corporate]);

  useEffect(() => {
    setIsDisabled(true);
    if (form?.cnpj) {
      handleCnpj(form?.cnpj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title>Abra sua conta empresarial gratuita</Title>
      <SubTitle>
        <span>*Importante</span> você precisa de um CNPJ ativo para abrir sua
        conta
      </SubTitle>
      <FormBox>
        <Flex
          alignItems="center"
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
          marginBottom={errorCnpj ? "40px" : "unset"}
        >
          <Flex position="relative" alignItems="center" w="100%">
            <FormControl isRequired isInvalid={errorCnpj} position="relative">
              <FormLabel>CNPJ</FormLabel>
              <Input
                name="cnpj"
                placeholder="00.000.000/0000-00"
                value={cnpjMask(form.cnpj)}
                onChange={({ target: { value } }) => {
                  setIsDisabled(true);
                  handleCnpj(cnpjIso(value));
                }}
                maxLength={18}
              />
              <FormErrorMessage position="absolute">
                Informe um CNPJ válido
              </FormErrorMessage>
            </FormControl>

            {isLoadingCheckCnpj && (
              <Spinner
                zIndex={2}
                position="absolute"
                right="15px"
                bottom="15px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                size="md"
                color="brand.500"
              />
            )}
          </Flex>
        </Flex>

        <FormControl position="relative">
          <FormLabel>Nome da empresa</FormLabel>
          <Input
            name="razaoSocial"
            disabled
            placeholder="Nome da empresa"
            value={form.razaoSocial}
          />
        </FormControl>

        <Flex alignItems="center" marginTop="15px">
          <Checkbox
            marginRight="10px"
            isChecked={form.policyPrivate}
            size="lg"
            onChange={(e) => {
              setForm({ ...form, policyPrivate: e.target.checked });
            }}
            _checked={{
              "span:nth-of-type(1)": {
                background: "brand.500",
                borderColor: "brand.500",

                "&:hover": {
                  background: "brand.500",
                  borderColor: "brand.500",
                },
              },
            }}
          />
          <CheckBoxTitle>
            Li e concordo com as condições de tratamento dos meus dados
            pessoais, dando consentimento conforme a
            <span onClick={() => setAcceptTermModal(true)}>
              Política de Privacidade.
            </span>
          </CheckBoxTitle>
        </Flex>
        <Flex alignItems="center">
          <Checkbox
            marginRight="10px"
            isChecked={form.useTerm}
            size="lg"
            onChange={(e) => {
              setForm({ ...form, useTerm: e.target.checked });
            }}
            _checked={{
              "span:nth-of-type(1)": {
                background: "brand.500",
                borderColor: "brand.500",

                "&:hover": {
                  background: "brand.500",
                  borderColor: "brand.500",
                },
              },
            }}
          />
          <CheckBoxTitle>
            Li e aceito as condições do
            <span onClick={() => setTermOfUseModalOpen(true)}>
              termo de uso
            </span>
            da plataforma, dando meu consentimento conforme descrito nas
            diretrizes.
          </CheckBoxTitle>
        </Flex>

        <Button
          marginTop="24px"
          onClick={handleNextStep}
          isDisabled={
            isDisabled ||
            !form.id ||
            errorCnpj ||
            !form.useTerm ||
            !form.policyPrivate
          }
        >
          Continuar
        </Button>
      </FormBox>

      {acceptTermModal && (
        <SimpleModal
          title="Política de Privacidade"
          isOpen={acceptTermModal}
          handleModal={setAcceptTermModal}
          size="3xl"
        >
          <Box padding="25px" fontSize={pixelToRem(14)}>
            <PrivacyPolicyText />
            <Box width="100%" display="flex" justifyContent="center">
              <ButtonUI
                width="150px"
                margin="20px 0 30px"
                onClick={() => {
                  setForm({ ...form, policyPrivate: true });
                  setAcceptTermModal(false);
                }}
              >
                Eu aceito
              </ButtonUI>
            </Box>
          </Box>
        </SimpleModal>
      )}

      {termOfUseModalOpen && (
        <SimpleModal
          title="Termo de Uso"
          isOpen={termOfUseModalOpen}
          handleModal={setTermOfUseModalOpen}
          size="3xl"
        >
          <Box padding="25px" fontSize={pixelToRem(14)}>
            <AcceptTerm />
            <Box width="100%" display="flex" justifyContent="center">
              <ButtonUI
                width="150px"
                margin="20px 0 30px"
                onClick={() => {
                  setForm({ ...form, useTerm: true });
                  setTermOfUseModalOpen(false);
                }}
              >
                Eu aceito
              </ButtonUI>
            </Box>
          </Box>
        </SimpleModal>
      )}
    </>
  );
};

export default OpenYourBusinessAccount;
