import { FormControl, FormLabel, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components and Utils
import { useGlobal } from "../../contexts/UserContext";

// Styles
import { Content, Button, BoxButton, Input } from "./styled";

import useUser from "../../hooks/useUser";
import ValidatePassword from "../../components/ValidatePassword";

const ResetPassword = () => {
  const theme = useTheme();
  const { user } = useGlobal();
  const [password, setPassword] = useState("");
  const { resetPassword } = useUser();
  const { isLoading, call } = resetPassword();
  const [changePassword, setChangePassword] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  useEffect(() => {
    document.title = `${theme.content.project} - Senha`;
  }, [theme]);

  return (
    <Content>
      <FormControl>
        <FormLabel htmlFor="nome">Nome</FormLabel>
        <Input
          isReadOnly
          borderColor="gray.300"
          id="nome"
          name="nome"
          type="text"
          value={user?.username}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">E-mail</FormLabel>
        <Input
          isReadOnly
          borderColor="gray.300"
          id="email"
          name="email"
          type="email"
          value={user?.email}
        />
      </FormControl>

      {changePassword && (
        <ValidatePassword
          setValidPassword={setValidatePassword}
          setPassword={setPassword}
        />
      )}

      <BoxButton>
        {!changePassword ? (
          <Button onClick={() => setChangePassword(true)}>Alterar senha</Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setChangePassword(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              isLoading={isLoading}
              isDisabled={!validatePassword}
              onClick={() => call({ password: password })}
            >
              Salvar
            </Button>
          </>
        )}
      </BoxButton>
    </Content>
  );
};

export default ResetPassword;
