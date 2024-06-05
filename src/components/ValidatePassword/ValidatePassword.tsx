import {
  Alert,
  AlertIcon,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { IFormPassword, IValidatePassword } from "./types";

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ValidatedRole from "./ValidatedRole";

const defaultForm = {
  password: "",
  password2: "",
};

const ValidatePassword = ({
  setPassword,
  setValidPassword,
}: IValidatePassword) => {
  const [form, setForm] = useState(defaultForm);
  const [passLetraMaiuscula, setPassLetraMaiuscula] = useState(false);
  const [passLetraMinuscula, setPassLetraMinuscula] = useState(false);
  const [passMinimo, setPassMinimo] = useState(false);
  const [passNumero, setPassNumero] = useState(false);
  const [passEspecial, setPassEspecial] = useState(false);
  const [passPassword, setPassPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  function validatePassword(value: string) {
    setPassLetraMaiuscula(true);
    setPassLetraMinuscula(true);
    setPassEspecial(true);
    setPassNumero(true);
    setPassMinimo(true);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;

    if (!hasUpperCase) {
      setPassLetraMaiuscula(false);
      setValidPassword(false);
    }
    if (!hasLowerCase) {
      setPassLetraMinuscula(false);
      setValidPassword(false);
    }
    if (!hasSpecialChar) {
      setPassEspecial(false);
      setValidPassword(false);
    }
    if (!hasNumber) {
      setPassNumero(false);
      setValidPassword(false);
    }
    if (!hasMinLength) {
      setPassMinimo(false);
      setValidPassword(false);
    }
  }

  function validatePasswordConfirmed(value: string) {
    setPassPassword(true);
    setValidPassword(true);
    if (
      (form.password !== value && form.password2 !== value) ||
      (form.password2 !== value && form.password.length < 1) ||
      form.password2.length < 1
    ) {
      setPassPassword(false);
      setValidPassword(false);
    }
  }

  return (
    <form autoComplete="new-password" style={{ width: "100%" }}>
      <FormControl
        isRequired
        isInvalid={
          (!passLetraMaiuscula ||
            !passLetraMinuscula ||
            !passEspecial ||
            !passMinimo ||
            !passNumero) &&
          form.password.length > 0
        }
        marginBottom="15px"
      >
        <FormLabel htmlFor="password">Nova senha</FormLabel>
        <InputGroup size="lg">
          <Input
            id="password"
            name="password"
            autoComplete="new-password"
            type={show ? "text" : "password"}
            onChange={(e: { target: { value: string } }) => {
              setForm((prev: IFormPassword) => ({
                ...prev,
                password: e.target.value,
              }));
              validatePassword(e.target.value);
              validatePasswordConfirmed(e.target.value);
            }}
            value={form.password}
          />
          <InputRightElement width="3rem" cursor="pointer">
            <Flex h="2rem" onClick={() => setShow(!show)} alignItems="center">
              {show ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
            </Flex>
          </InputRightElement>
        </InputGroup>
        <Stack spacing={1} marginTop="10px">
          <ValidatedRole
            isValidated={passMinimo}
            text="Ter no mínimo 8 caracteres;"
          />
          <ValidatedRole
            isValidated={passEspecial}
            text="Incluir pelo menos uma caractere especial;"
          />
          <ValidatedRole
            isValidated={passLetraMaiuscula}
            text="Conter ao menos uma letra maiúscula;"
          />
          <ValidatedRole
            isValidated={passLetraMinuscula}
            text="Conter ao menos uma letra minúscula;"
          />
          <ValidatedRole
            isValidated={passNumero}
            text="Inserir ao menos um número."
          />
        </Stack>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!passPassword && form.password2.length > 0}
      >
        <FormLabel htmlFor="password2">Confirme a nova senha</FormLabel>
        <InputGroup size="lg">
          <Input
            id="password2"
            name="password2"
            autoComplete="new-password"
            type={show2 ? "text" : "password"}
            onChange={(e: { target: { value: string } }) => {
              setForm((prev: IFormPassword) => ({
                ...prev,
                password2: e.target.value,
              }));
              setPassword(e.target.value);
              validatePasswordConfirmed(e.target.value);
            }}
            value={form.password2}
          />
          <InputRightElement width="3rem" cursor="pointer">
            <Flex h="2rem" onClick={() => setShow2(!show2)} alignItems="center">
              {show2 ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
            </Flex>
          </InputRightElement>
        </InputGroup>

        {form.password2?.length > 0 && (
          <Alert marginTop="5px" status={!passPassword ? "warning" : "success"}>
            <AlertIcon />
            As duas senhas devem ser iguais
          </Alert>
        )}
      </FormControl>
    </form>
  );
};

export default ValidatePassword;
