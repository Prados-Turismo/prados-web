import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IContaBancariaArgs,
  IContaBancariaResponse,
  ICreateContaBancariaArgs,
  ICreateContaBancariaResponse,
  IUpdateContaBancariaArgs,
  IUpdateContaBancariaResponse,
  IDeleteContaBancariaResponse
} from "../models/conta-bancaria.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getContaBancaria = ({ page, size }: IContaBancariaArgs): IContaBancariaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.contaBancaria,
      page
    ],
    async () => {
      const path = 'conta-bancaria/index';

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

const getAllContaBancaria = (): IContaBancariaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.contaBancaria,
    ],
    async () => {
      const path = 'conta-bancaria/findAll';

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

const createContaBancaria = (
  reset: () => void,
  handleClose: () => void
): ICreateContaBancariaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateContaBancariaArgs) => {
      const urlPath = 'conta-bancaria/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.contaBancaria])

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

const updateContaBancaria = (
  reset: () => void,
  handleClose: () => void
): IUpdateContaBancariaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateContaBancariaArgs) => {
      const urlPath = `conta-bancaria/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.contaBancaria])

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

const deleteContaBancaria = (): IDeleteContaBancariaResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `conta-bancaria/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.contaBancaria])

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

export default function useContaBancaria() {
  return {
    getContaBancaria,
    getAllContaBancaria,
    createContaBancaria,
    updateContaBancaria,
    deleteContaBancaria
  }
}
