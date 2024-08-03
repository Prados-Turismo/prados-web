import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";
import {
  IDeleteEnderecoResponse,
  IEndereco
} from "../models/endereco.model";

const buscaCep = (): IDeleteEnderecoResponse => {
  const { isLoading, mutate } = useMutation(
    [
      keys.pessoas
    ],
    async (cep: string) => {
      const path = `endereco/busca-cep/${cep}`;

      try {
        const { data } = await apiPrados.get(path);        
        
        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  );

  return {
    isLoading,
    mutate
  }
}


export default function useEndereco() {
  return {
    buscaCep
  }
}
