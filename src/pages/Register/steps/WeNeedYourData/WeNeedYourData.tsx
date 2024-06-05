import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";

import { useState } from "react";
import {
  cellphoneMask,
  cellphoneValidation,
  cpfMask,
  phoneIso,
} from "../../../../utils/fieldMask";
import { Button, FormBox, SubTitle, Title, Input } from "../../styled";
import { IWeNeedYourData } from "./types";
import useSignUp from "../../../../hooks/useSignUp";
import { emailValidation } from "../../../../utils/fieldValidation";
import { emailInvalid } from "../../../../utils/messagesError";
import { handleCheckEmail, handleRegister } from "../../../../hooks/useFiibo";
import { isDateLessThan150YearsAgo } from "../../../../utils/formattingDate";

const WeNeedYourData = ({
  form,
  setForm,
  handleNextStep,
  demonstration,
  handlePreviousStep,
}: IWeNeedYourData) => {
  const [errorCpf, setErrorCpf] = useState(false);
  const [errorBornDate, setErrorBornDate] = useState({
    message: "",
  });
  const [errorName, setErrorName] = useState(false);
  const [errorNameType, setErrorNameType] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const { register, isLoading: isLoadingRegister } = handleRegister();
  const [errorValidation, setErrorValidation] = useState(false);
  const { checkEmail, isLoading: isLoadingEmail } = handleCheckEmail();
  const [isDisalbled, setIsDisabled] = useState(form.cpf ? false : true);

  const { checkAnyByCpf } = useSignUp();

  const { mutate, isLoading } = checkAnyByCpf(setIsDisabled);

  const handleName = (value: string) => {
    if (value.trim()?.length > 0 && value.trim()?.length < 7) {
      setErrorName(true);
    } else if (value.trim()?.length > 0 && !/^[a-zA-ZÀ-ú0-9\s]+$/.test(value)) {
      setErrorNameType(true);
    } else {
      setErrorName(false);
      setErrorNameType(false);
    }
    setForm({
      ...form,
      name: value,
    });
  };

  const handleCpf = (value: string) => {
    if (value.trim()?.length > 0 && value.trim()?.length < 14) {
      setErrorCpf(true);
    } else if (value.trim()?.length > 0) {
      mutate({
        cpf: value,
      });
      setErrorCpf(false);
    }

    setForm({
      ...form,
      cpf: value,
    });
  };

  const handlePhone = (value: string) => {
    setForm((prev) => ({
      ...prev,
      phone: value,
    }));

    if (cellphoneValidation(value)) {
      setErrorPhone(false);
    } else {
      setErrorPhone(true);
    }
  };

  const handleSendRegister = () => {
    register(form, demonstration).then((res) => {
      if (res) {
        handleNextStep();
      }
    });
  };

  const handleClick = () => {
    if (demonstration) {
      handleSendRegister();
    } else {
      checkEmail({ email: form.email }).then((res) => {
        if (!res) {
          handleSendRegister();
        }
      });
    }
  };

  return (
    <>
      <Title>Precisamos dos seus dados</Title>
      <SubTitle>
        Os dados fornecidos serão usados para <b>login</b> e{" "}
        <b>permissões na plataforma</b>, podendo ser do responsável pela empresa
        ou do usuário.
      </SubTitle>

      <FormBox overflow="auto" padding="0 69px 0 85px">
        <FormControl isRequired isInvalid={errorCpf} position="relative">
          <FormLabel>CPF</FormLabel>
          <Input
            name="cpf"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={(e) => handleCpf(cpfMask(e.target.value))}
            maxLength={14}
          />
          <FormErrorMessage>O cpf deve conter 11 caracteres</FormErrorMessage>
          {isLoading && (
            <Spinner
              position="absolute"
              top="45px"
              right="10px"
              thickness="3px"
              speed="0.65s"
              emptyColor="gray.200"
              size="md"
              color="brand.500"
            />
          )}
        </FormControl>
        <FormControl isRequired isInvalid={errorName || errorNameType}>
          <FormLabel>Nome completo</FormLabel>
          <Input
            name="name"
            placeholder="Digite o nome completo"
            value={form.name}
            onChange={(e) => handleName(e.target.value)}
            maxLength={120}
            isDisabled={isDisalbled}
          />
          <FormErrorMessage>
            {errorNameType
              ? "O nome deve conter apenas caracteres alfanuméricos"
              : "O nome deve conter no mínimo 7 e no máximo 120 caracteres"}
          </FormErrorMessage>
        </FormControl>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FormControl
            isRequired
            isInvalid={errorBornDate?.message ? true : false}
          >
            <FormLabel>Data de nascimento</FormLabel>
            <Input
              name="bornDate"
              type="date"
              placeholder="dd/mm/aaaa"
              value={form.bornDate}
              onChange={({ target: { value } }) => {
                const dataAtual = new Date();
                const data = new Date(value);

                if (data > dataAtual) {
                  setErrorBornDate({
                    message:
                      "A data de nascimento não pode ser superior a data atual",
                  });
                } else if (isDateLessThan150YearsAgo(data)) {
                  setErrorBornDate({
                    message:
                      "A data de nascimento não pode ser inferior há 150 anos atrás",
                  });
                } else {
                  setErrorBornDate({
                    message: "",
                  });
                }
                setForm({
                  ...form,
                  bornDate: value,
                });
              }}
              max="2099-12-31"
              maxLength={10}
              isDisabled={isDisalbled}
            />
            <FormErrorMessage>{errorBornDate?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errorPhone}>
            <FormLabel>Telefone celular</FormLabel>
            <Input
              name="phone"
              placeholder="(00) 00000-0000"
              value={cellphoneMask(form.phone)}
              onChange={({ target: { value } }) => handlePhone(phoneIso(value))}
              maxLength={15}
              isDisabled={isDisalbled}
            />
            <FormErrorMessage>
              Informe um número com formato válido (00) 90000-0000
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <FormControl isRequired isInvalid={errorValidation} marginBottom="25px">
          <FormLabel>E-mail</FormLabel>
          <Input
            name="email"
            placeholder="Digite o seu e-mail"
            value={form.email}
            onChange={(e) => {
              const value = e.target.value;

              if (value?.length > 0) {
                const error = emailValidation(e.target.value);
                setErrorValidation(error);
              } else {
                setErrorValidation(false);
              }
              setForm({
                ...form,
                email: value,
              });
            }}
            isDisabled={isDisalbled}
          />
          <FormErrorMessage>{emailInvalid}</FormErrorMessage>
        </FormControl>
        <Flex
          justifyContent="space-between"
          gap="10px"
          marginBottom="15px"
          // w="100%"
          // maxW="570px"
        >
          <Button variant="outline" maxW="172px" onClick={handlePreviousStep}>
            Voltar
          </Button>

          <Button
            onClick={handleClick}
            isLoading={isLoadingEmail || isLoadingRegister}
            maxW="172px"
            isDisabled={
              errorName ||
              errorNameType ||
              form.name?.length < 1 ||
              form.phone?.length < 1 ||
              errorPhone ||
              errorCpf ||
              form.name?.length < 1 ||
              !form.phone ||
              errorValidation ||
              form.email?.length < 1 ||
              form.bornDate?.length < 10 ||
              errorBornDate?.message
                ? true
                : false || isDisalbled
            }
          >
            Continuar
          </Button>
        </Flex>
      </FormBox>
    </>
  );
};

export default WeNeedYourData;
