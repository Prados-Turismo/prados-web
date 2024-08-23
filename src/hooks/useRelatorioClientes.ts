import { useQuery } from "react-query";
import { apiPrados } from "../services/api";
import { Warning } from "../errors";
import { keys } from "../services/query";
import { IRelatorioClientesArgs, IRelatorioClientesResponse } from "../models/relatorio-clientes.model";

const getRelatorioClientesPorPessoa = ({ pessoaId, page, size, options = {} }: IRelatorioClientesArgs): IRelatorioClientesResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.relatorioClientes,
      pessoaId,
      page
    ],
    async () => {
      if (!pessoaId) {
        return {
          rows: [],
          count: 0,
          sum: 0
        }
      }

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
    },
    options
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
