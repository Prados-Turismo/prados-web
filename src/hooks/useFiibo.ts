import { useState } from "react";

import { useToastStandalone } from "./useToastStandalone";
import { apiRecord, apiPermissionNoAuth } from "../services/api";
import { IFormRegister } from "../models/register.model";
import { customTheme } from "../theme";

export const handleRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data: IFormRegister, demonstration: boolean) => {
    setIsLoading(true);

    const path = "/companies-associated/white-label";

    const treatedData = {
      ...data,
      hubSlug: demonstration ? "hub-demo" : customTheme?.content?.hubSlug,
      fromOnboard: true,
    };

    const response = await apiRecord
      .post(path, treatedData)
      .then(() => {
        return true;
      })
      .catch((error) => {
        useToastStandalone({
          description: error?.response?.data?.message,
          status: "error",
          duration: 15000,
        });
        return false;
      })
      .finally(() => {
        setIsLoading(false);
      });

    return response;
  };

  return {
    isLoading,
    register,
  };
};

export const handleCheckEmail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkEmail = async ({ email }: { email: string }) => {
    setIsLoading(true);

    const data = await apiPermissionNoAuth
      .get(`/auth/verify/${email}`)
      .then(({ data }) => {
        if (data) {
          useToastStandalone({
            title: "O e-mail preenchido já está registrado.",
            description: "Por favor, forneça um novo endereço de e-mail.",
            status: "info",
          });
        }

        return data;
      })
      .catch((error) => {
        useToastStandalone({
          title: "Erro ao fazer a solicitação",
          description: error?.response?.data?.message,
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    return data;
  };

  return {
    checkEmail,
    isLoading,
  };
};

export const handleResendCodeEmail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const resendCodeEmail = async ({ email }: { email: string }) => {
    setIsLoading(true);

    const data = await apiPermissionNoAuth
      .post(`/user/onboard/send-code-email`, {
        email,
      })
      .then((res) => {
        useToastStandalone({
          title: res?.data?.message[0],
          status: "success",
        });
      })
      .catch((error) => {
        useToastStandalone({
          title: "Erro ao reenviar e-mail!",
          description: error?.response?.data?.message,
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    return data;
  };

  return {
    resendCodeEmail,
    isLoading,
  };
};
