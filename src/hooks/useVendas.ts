import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IVendasArgs,
  IVendasResponse,
  ICreateVendasArgs,
  ICreateVendasResponse,
  IUpdateVendasArgs,
  IUpdateVendasResponse,
  IDeleteVendasResponse
} from "../models/vendas.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getVendas = ({ page, size }: IVendasArgs): IVendasResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.vendas,
      page
    ],
    async () => {
      const path = 'vendas/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
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

const getAllVendas = (): IVendasResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.vendas,
    ],
    async () => {
      const path = 'vendas/findAll';

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

const createVendas = (
  reset: () => void,
  handleClose: () => void
): ICreateVendasResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateVendasArgs) => {
      const urlPath = 'vendas/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.vendas])

          useToastStandalone({
            title: "Venda realizada!",
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

const updateVendas = (
  reset: () => void,
  handleClose: () => void
): IUpdateVendasResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateVendasArgs) => {
      const urlPath = `vendas/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.vendas])

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

const deleteVendas = (): IDeleteVendasResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `vendas/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.vendas])

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

const efetivarVenda = (): IDeleteVendasResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `vendas/efetivar/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.vendas])

          useToastStandalone({
            title: "Efetivada com sucesso!",
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

const desEfetivarVenda = (): IDeleteVendasResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `vendas/desefetivar/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.vendas])

          useToastStandalone({
            title: "Desefetivada com sucesso!",
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

export default function useVendas() {
  return {
    getVendas,
    getAllVendas,
    createVendas,
    updateVendas,
    deleteVendas,
    efetivarVenda,
    desEfetivarVenda
  }
}
