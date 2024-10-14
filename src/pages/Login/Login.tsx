import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme, Input, Button } from "@chakra-ui/react";

// Hooks
import { useGlobal } from "../../contexts/UserContext";

// Estilos
import Centralized from "../../Layouts/Centralized";
import { FieldWrap, Logo, Form } from "./styled";

// Funções de utilidade
import { minContent } from "../../utils/messagesError";
import RequestPasswordChange from "../../components/RequestPasswordChange/RequestPasswordChange";

const handleSubmitRegisterSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: `O usuário ${minContent(3)}`,
    }),
  password: z.string().min(3, {
    message: `A senha ${minContent(3)}`,
  }),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

const Login = () => {
  const theme = useTheme();
  const { user, signIn, userAccess } = useGlobal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });

  const handleSubmitRegister = ({
    username,
    password,
  }: IhandleSubmitRegister) => {
    setLoading(true);
    signIn({
      username,
      password,
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    document.title = `${theme.content.project} - Login`;
  }, [theme]);

  return (
    <Centralized>
      {userAccess?.firstAccess && (
        <RequestPasswordChange
          isOpen={userAccess.firstAccess}
          userEmail={userAccess?.userEmail as string}
        />
      )}

      <FieldWrap>
        <Logo backgroundImage={theme.images.logoLogin}>
          {theme.content.project}
        </Logo>

        <Form onSubmit={handleSubmit(handleSubmitRegister)}>
          <h3 className="title">Acesso Empresarial</h3>

          <div className="fieldsWrap">
            <div className="field">
              <Input
                height={50}
                placeholder="Usuário"
                type="text"
                {...register("username")}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>

            <div className="field">
              <Input
                height={50}
                placeholder="Senha"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <span>
              <Link to="/recuperar-senha" className="forgetPassword">
                Esqueci a senha
              </Link>
            </span>
          </div>

          <Button type="submit" isLoading={loading}>
            Entrar
          </Button>
        </Form>
      </FieldWrap>
    </Centralized>
  );
};

export default Login;
