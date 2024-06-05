import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToastStandalone } from "./useToastStandalone";
import { apiPermissionNoAuth, apiPermission } from "../services/api";

// Types
import {
  IUseUser,
  IForgetArgs,
  IForgetResponse,
  IValidateCodeArgs,
  IValidateCodeResponse,
  IResetResponse,
  IResetArgs,
  IResetTokenArgs,
  IResetTokenResponse,
  IValidateNewUserResponse,
  IValidateNewUserCallArgs,
} from "../models/user.model";
import { useGlobal } from "../contexts/UserContext";

export default function useUser(): IUseUser {
  const navigate = useNavigate();

  const forgetPassword = (): IForgetResponse => {
    const [isLoading, setIsLoading] = useState(false);

    const call = async (data: IForgetArgs) => {
      setIsLoading(true);

      await apiPermissionNoAuth
        .post("/auth/resetPassword", { ...data, origin: "PORTAL" })
        .then(() => {
          useToastStandalone({
            description:
              "Uma mensagem com os dados de recuperação de senha foi enviada para o seu e-mail",
            status: "success",
          });

          navigate("/login");
        })
        .catch((error) => {
          const errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message
            : [error.response.data.message];

          errorMessage.forEach((message: string) => {
            useToastStandalone({
              description: message,
              status: "error",
            });
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return {
      isLoading,
      call,
    };
  };

  const resetPassword = (): IResetResponse => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useGlobal();

    const call = async (password: IResetArgs) => {
      setIsLoading(true);

      const data = {
        password: password.password,
        confirmationPassword: password.password,
      };

      await apiPermission
        .put(`/user/${user?.id}`, data)
        .then(() => {
          useToastStandalone({
            description: "Senha alterada com sucesso!",
            status: "success",
          });
        })
        .catch((error) => {
          useToastStandalone({
            title: "Erro ao alterar a senha",
            description: error?.response?.data?.message || "",
            status: "error",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return {
      isLoading,
      call,
    };
  };

  const resetCode = (): IResetTokenResponse => {
    const [isLoading, setIsLoading] = useState(false);

    const call = async (password: IResetTokenArgs) => {
      setIsLoading(true);

      const data = {
        password: password.password,
        confirmationPassword: password.passwordConfirmation,
      };

      await apiPermissionNoAuth
        .post(`/auth/changePassword`, data, {
          headers: {
            Authorization: `Bearer ${password.code}`,
          },
        })
        .then(() => {
          useToastStandalone({
            description: "Senha criada com sucesso!",
            status: "success",
          });
          window.location.href = "/";
        })
        .catch((error) => {
          useToastStandalone({
            title: "Erro ao criar a senha",
            description: error?.response?.data?.message || "",
            status: "error",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return {
      isLoading,
      call,
    };
  };

  const validateCode = (): IValidateCodeResponse => {
    const [isLoading, setIsLoading] = useState(false);

    const call = async (data: IValidateCodeArgs) => {
      setIsLoading(true);

      await apiPermissionNoAuth
        .post("/auth/validateCode", { code: data.codigo, email: data.username })
        .then((response) => {
          useToastStandalone({
            title: "Código validado!",
            description:
              "Seu código foi validado, agora você precisa criar sua senha",
            status: "success",
            duration: 15000,
          });

          navigate(`/alterar-senha?token=${response.data.accessToken}`);
        })
        .catch((error) => {
          const errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message
            : [error.response.data.message];

          errorMessage.forEach((message: string) => {
            useToastStandalone({
              description: message,
              status: "error",
            });
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return {
      isLoading,
      call,
    };
  };

  const validateNewUser = (
    handleNextStep: () => void,
  ): IValidateNewUserResponse => {
    const [isLoading, setIsLoading] = useState(false);

    const call = async (data: IValidateNewUserCallArgs) => {
      setIsLoading(true);

      const payload = {
        code: data?.code,
        email: data?.email,
        password: data?.password,
        confirmationPassword: data?.confirmationPassword,
        sendCreatedAccountEmail: true
      };

      await apiPermissionNoAuth
        .post("/auth/changePasswordWithCode", payload)
        .then(() => {
          handleNextStep();
        })
        .catch((error) => {
          const errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message
            : [error.response.data.message];

          errorMessage.forEach((message: string) => {
            useToastStandalone({
              description: message,
              status: "error",
            });
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return {
      isLoading,
      call,
    };
  };

  return {
    forgetPassword,
    resetPassword,
    resetCode,
    validateCode,
    validateNewUser,
  };
}
