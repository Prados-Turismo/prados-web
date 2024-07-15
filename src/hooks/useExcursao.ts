import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IExcursaoArgs,
  IExcursaoResponse,
  ICreateExcursaoArgs,
  ICreateExcursaoResponse,
  IUpdateExcursaoArgs,
  IUpdateExcursaoResponse,
  IExcursaoListResponse
} from "../models/excursao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getExcursoes = ({ page, size }: IExcursaoArgs): IExcursaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.excursao,
      page
    ],
    async () => {
      const path = 'excursao/index';

      try {
        const { data } = await apiPrados.get(path, {
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
    isLoading
  };
}

const getExcursao = (id: string): IExcursaoListResponse => {

  const { data, isLoading } = useQuery(
    [keys.excursao],
    async () => {
      const path = `excursao/find/${id}`
      try {
        const { data } = await apiPrados.get(path)

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data || [],
    isLoading
  };

}

const createExcursao = (
  reset: () => void,
  handleClose: () => void
): ICreateExcursaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateExcursaoArgs) => {
      const urlPath = 'excursao/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.excursao])

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

const updateExcursao = (
  reset: () => void,
  handleClose: () => void
): IUpdateExcursaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateExcursaoArgs) => {
      const urlPath = `excursao/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then((data) => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.excursao])

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

const deleteExcursao = (): IUpdateExcursaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `excursao/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function (data) {
          queryClient.invalidateQueries([keys.excursao])

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

export default function useExcursoes() {
  return {
    getExcursoes,
    getExcursao,
    createExcursao,
    updateExcursao,
    deleteExcursao
  }
}
