/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";

// Api
import { apiPrados } from "../services/api";

// Types
import {
  IFornecedorResponse
} from "../models/fornecedor.model";

// Keys
import { Warning } from "../errors";
import { keys } from "../services/query";

const getAllFornecedores = (): IFornecedorResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.fornecedores
    ],
    async () => {
      const path = 'fornecedor/findAll';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            ativo: true
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  );

  return {
    data: data || [],
    isLoading
  };
};

export default function useFornecedor() {
  return {
    getAllFornecedores
  };
}
