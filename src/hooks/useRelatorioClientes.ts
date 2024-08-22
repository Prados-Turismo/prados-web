import { useQuery } from "react-query";
import { apiPrados } from "../services/api";
import { Warning } from "../errors";
import { keys } from "../services/query";
import { IRelatorioClientesArgs, IRelatorioClientesResponse } from "../models/relatorio-clientes.model";

const getRelatorioClientesPorPessoa = ({ pessoaId, page, size }: IRelatorioClientesArgs): IRelatorioClientesResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.excursaoQuarto,
      pessoaId,
      page
    ],
    async () => {
      try {
        const { data } = await apiPrados.get(`relatorios/clientes/${pessoaId}`, {
          params: {
            page,
            size
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    sum: data?.sum || 0
  };
}

export default function useRelatorioClientes() {
  return {
    getRelatorioClientesPorPessoa,
  }
}
