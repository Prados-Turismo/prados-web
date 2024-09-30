import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ICreateLocalEmbarqueArgs,
  ICreateLocalEmbarqueResponse,
  IDeleteLocalEmbarqueResponse,
  ILocalEmbarqueArgs,
  ILocalEmbarqueResponse,
  IUpdateLocalEmbarqueArgs,
  IUpdateLocalEmbarqueResponse
} from "../models/local-embarque.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getLocalEmbarque = (): ILocalEmbarqueResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.localEmbarque
    ],
    async () => {
      const urlPath = 'local-embarque/findAll'

      try {
        const { data } = await apiPrados.get(urlPath)

        return data;
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    data: data || [],
    isLoading,
    count: data?.count || 0
  };
}

const getAllLocalEmbarque = ({ page, size, nome, status }: ILocalEmbarqueArgs): ILocalEmbarqueResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.localEmbarque,
      page,
      nome,
      status
    ],
    async () => {
      const path = 'local-embarque/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            status
          }
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

const createLocalEmbarque = (
  reset: () => void,
  handleClose: () => void
): ICreateLocalEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateLocalEmbarqueArgs) => {
      const urlPath = 'local-embarque/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          queryClient.invalidateQueries([keys.localEmbarque])
          reset()
          handleClose()


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

const updateLocalEmbarque = (
  reset: () => void,
  handleClose: () => void
): IUpdateLocalEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateLocalEmbarqueArgs) => {
      const urlPath = `local-embarque/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.localEmbarque])

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

const deleteLocalEmbarque = (): IDeleteLocalEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `local-embarque/delete/${id}`
      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.localEmbarque])

          useToastStandalone({
            title: "Excluído com sucesso!",
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

export default function useLocalEmbarque() {
  return {
    getLocalEmbarque,
    createLocalEmbarque,
    deleteLocalEmbarque,
    updateLocalEmbarque,
    getAllLocalEmbarque
  }
}
