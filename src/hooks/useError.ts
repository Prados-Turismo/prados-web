/* eslint-disable @typescript-eslint/no-explicit-any */
import { Warning } from "../errors";
import { useToastStandalone } from "./useToastStandalone";

const errorHandler = (error: any): void => {
  if (error instanceof Warning) {
    error.message.map((errMessage) => {
      useToastStandalone({
        description: errMessage,
        status: "error",
      });
    });
  } else {
    useToastStandalone({
      title: "Ocorreu um erro!",
      description: "Erro inesperado! Tente novamente mais tarde.",
      status: "error",
    });
  }
};

export default function useError() {
  return {
    errorHandler,
  };
}
