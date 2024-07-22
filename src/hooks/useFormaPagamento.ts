import { useQuery } from "react-query";
import { apiPrados } from "../services/api";
import { Warning } from "../errors";
import { keys } from "../services/query";
import { IFormaPagamentoFindResponse } from "../models/forma-pagamento.model";

const getAllFormaPagamentos = (): IFormaPagamentoFindResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.formaPagamento
    ],
    async () => {
      const path = 'forma-pagamento/findAll';

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
}

export default function useFormaPagamento() {
  return {
    getAllFormaPagamentos
  }
}
