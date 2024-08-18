import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IRankingClienteArgs,
  IRankingClienteResponse,
  ICreateRankingClienteArgs,
  ICreateRankingClienteResponse,
  IUpdateRankingClienteArgs,
  IUpdateRankingClienteResponse,
  IDeleteRankingClienteResponse
} from "../models/ranking-cliente.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getRankingCliente = ({ page, size }: IRankingClienteArgs): IRankingClienteResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.rankingCliente,
      page
    ],
    async () => {
      const path = 'ranking-clientes/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            orderBy: 'nome'
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
    isLoading
  };
}

const getAllRankingCliente = (): IRankingClienteResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.rankingCliente,
    ],
    async () => {
      const path = 'ranking-clientes/findAll';

      try {
        const { data } = await apiPrados.get(path);

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data || [],
    count: data?.count || 0,
    isLoading
  };
}

const createRankingCliente = (
  reset: () => void,
  handleClose: () => void
): ICreateRankingClienteResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateRankingClienteArgs) => {
      const urlPath = 'ranking-clientes/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.rankingCliente])

          useToastStandalone({
            title: "Cadastro concluído!",
            status: "success",
          });
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const updateRankingCliente = (
  reset: () => void,
  handleClose: () => void
): IUpdateRankingClienteResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateRankingClienteArgs) => {
      const urlPath = `ranking-clientes/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.rankingCliente])

          useToastStandalone({
            title: "Atualizado com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const deleteRankingCliente = (): IDeleteRankingClienteResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `ranking-clientes/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.rankingCliente])

          useToastStandalone({
            title: "Excluída com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

export default function useRankingCliente() {
  return {
    getRankingCliente,
    getAllRankingCliente,
    createRankingCliente,
    updateRankingCliente,
    deleteRankingCliente
  }
}
