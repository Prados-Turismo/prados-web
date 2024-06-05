import { useEffect, useState } from "react";
import ValidatePassword from "../../../../components/ValidatePassword";
import { Button, FormBox, SubTitle, Title } from "../../styled";
import { Box, Flex, PinInput, Text } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";
import { PinInputField } from "./styled";
import useUser from "../../../../hooks/useUser";
import { handleResendCodeEmail } from "../../../../hooks/useFiibo";

const YourAuthentication = ({
  email,
  handleNextStep,
}: {
  email: string;
  handleNextStep: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const { validateNewUser } = useUser();
  const { call, isLoading } = validateNewUser(handleNextStep);
  const { resendCodeEmail, isLoading: isLoadingResendCodeEmail } =
    handleResendCodeEmail();
  const [resendBlocked, setResendBlocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const startCountdown = () => {
    setTimeRemaining(30);
    setResendBlocked(true);
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setResendBlocked(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining, resendBlocked]);

  return (
    <>
      <FormBox>
        <Title>Precisamos da sua autenticação</Title>
        <SubTitle marginBottom="unset">
          Para criar a senha da sua conta, precisamos que você informe o código
          enviado para o e-mail <b>{email}</b>.
        </SubTitle>

        <Flex justifyContent="center" gap="10px">
          <PinInput
            type="alphanumeric"
            placeholder="0"
            onChange={(e) => setCode(e)}
            otp
          >
            <PinInputField autoComplete="new-password" />
            <PinInputField autoComplete="new-password" />
            <PinInputField autoComplete="new-password" />
            <PinInputField autoComplete="new-password" />
            <PinInputField autoComplete="new-password" />
            <PinInputField autoComplete="new-password" />
          </PinInput>
        </Flex>

        <Flex
          justifyContent="center"
          alignItems="center"
          gap="5px"
          margin="5px 0 5px"
        >
          <Box w="30px"></Box>
          <Text color="#000000" fontSize={pixelToRem(14)}>
            Não recebeu o e-mail?
          </Text>
          <Button
            cursor="pointer"
            color="brand.500"
            variant="ghost"
            w="max-content"
            h="19px"
            padding="0"
            fontSize={pixelToRem(14)}
            onClick={() => {
              startCountdown();
              resendCodeEmail({ email });
            }}
            margin="5px 0 3px"
            isLoading={isLoadingResendCodeEmail}
            isDisabled={resendBlocked}
            _hover={{
              backgroundColor: "unset",
              textDecor: "underline",
            }}
          >
            Clique aqui para enviar novamente.
          </Button>

          <Text w="30px" fontSize={pixelToRem(14)} color="brand.500">
            {resendBlocked && `${timeRemaining}s`}
          </Text>
        </Flex>

        <ValidatePassword
          setPassword={setPassword}
          setValidPassword={setValidPassword}
        />

        <Flex justifyContent="flex-end" gap="10px" margin="5px 0">
          <Button
            onClick={() => {
              call({
                code: code,
                email: email,
                password: password,
                confirmationPassword: password,
              });
            }}
            isLoading={isLoading}
            maxW="172px"
            // isDisabled={!validPassword || !password || code?.length < 6}
          >
            Abrir conta
          </Button>
        </Flex>
      </FormBox>
    </>
  );
};

export default YourAuthentication;
