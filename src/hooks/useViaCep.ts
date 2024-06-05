/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useMutation } from "react-query";
import { Warning } from "../errors";
import { ICepData } from "../models/via-cep.model";

const getCep = () => {
  const { isLoading, mutate, data } = useMutation(
    async ({ cep }: { cep: string }) => {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning("Erro ao consultar o CEP", _error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    mutate,
    data: data as ICepData,
  };
};

export default function useViaCep() {
  return {
    getCep,
  };
}
