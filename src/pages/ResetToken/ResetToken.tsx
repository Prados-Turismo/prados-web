import { useTheme, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Centralized from "../../Layouts/Centralized";
import { FieldWrap, Logo } from "../Login/styled";

// Styles
import { Button, BoxButton, LinkHome } from "./styled";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";
import ValidatePassword from "../../components/ValidatePassword";

const ResetToken = () => {
  const theme = useTheme();
  const { resetCode } = useUser();
  const { isLoading, call } = resetCode();
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);

  const token = window.location.href.split("=")[1];

  useEffect(() => {
    document.title = `${theme.content.project} - Login`;
  }, [theme]);
  return (
    <Centralized>
      <FieldWrap>
        <LinkHome>
          <Link to="/">
            <Logo backgroundImage={theme.images.logoLogin}>
              {theme.content.project}
            </Logo>
          </Link>
        </LinkHome>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          background="#FFFFFF"
          border="1px solid #e2e8f0"
          borderRadius="16px"
          padding="32px"
          gap="40px"
        >
          <ValidatePassword
            setValidPassword={setValidatePassword}
            setPassword={setPassword}
          />
          <BoxButton>
            <Button
              isLoading={isLoading}
              isDisabled={!validatePassword}
              onClick={() =>
                call({
                  password: password,
                  passwordConfirmation: password,
                  code: token,
                })
              }
            >
              Salvar
            </Button>
          </BoxButton>
        </Box>
      </FieldWrap>
    </Centralized>
  );
};

export default ResetToken;
