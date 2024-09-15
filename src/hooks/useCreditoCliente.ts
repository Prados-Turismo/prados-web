import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ICreditoClienteArgs,
  ICreditoClienteResponse,
  ICreateCreditoClienteArgs,
  ICreateCreditoClienteResponse,
  IUpdateCreditoClienteArgs,
  IUpdateCreditoClienteResponse,
  IDeleteCreditoClienteResponse
} from "../models/credito-cliente.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getCreditoCliente = ({ page, size }: ICreditoClienteArgs, id: string): ICreditoClienteResponse => {

  const { data, isLoading } = useQuery(
    [
      id
    ],
    async () => {
      const path = 'credito-cliente/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            idPessoa: id
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

const getAllCreditoCliente = (): ICreditoClienteResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.creditoCliente,
    ],
    async () => {
      const path = 'credito-cliente/findAll';

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

const createCreditoCliente = (
  reset: () => void,
  handleClose: () => void
): ICreateCreditoClienteResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateCreditoClienteArgs) => {
      const urlPath = 'credito-cliente/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.creditoCliente])

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

const updateCreditoCliente = (
  reset: () => void,
  handleClose: () => void
): IUpdateCreditoClienteResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateCreditoClienteArgs) => {
      const urlPath = `credito-cliente/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.creditoCliente])

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

const deleteCreditoCliente = (): IDeleteCreditoClienteResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `credito-cliente/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.creditoCliente])

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

export default function useCreditoCliente() {
  return {
    getCreditoCliente,
    getAllCreditoCliente,
    createCreditoCliente,
    updateCreditoCliente,
    deleteCreditoCliente
  }
}
