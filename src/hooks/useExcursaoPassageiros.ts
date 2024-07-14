import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IExcursaoPassageiroArgs,
  IExcursaoPassageiroResponse,
  ICreateExcursaoPassageiroArgs,
  ICreateExcursaoPassageiroResponse,
  IUpdateExcursaoPassageiroArgs,
  IUpdateExcursaoPassageiroResponse,
  IExcursaoPassageiroListResponse
} from "../models/excursao-passageiro.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const listExcursaoPassageiros = (idExcursao: string): IExcursaoPassageiroListResponse => {
  const { data, isLoading } = useQuery(
    [],
    async () => {
      const path = `excursao-passageiros/list-passageiros-filtered/${idExcursao}`;

      try {
        const { data } = await apiPrados.get(path);

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

const getExcursaoPassageiros = (): IUpdateExcursaoPassageiroResponse => {

  const { isLoading, mutate } = useMutation(
    async (idExcursao: string) => {
      const urlPath = `excursao-passageiros/find/${idExcursao}`

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

const createExcursaoPassageiro = (
  reset: () => void,
  handleClose: () => void
): ICreateExcursaoPassageiroResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateExcursaoPassageiroArgs) => {
      const urlPath = 'excursao-passageiros/create'
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

const updateExcursaoPassageiro = (
  reset: () => void,
  handleClose: () => void
): IUpdateExcursaoPassageiroResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateExcursaoPassageiroArgs) => {
      const urlPath = `excursao-passageiros/update/${data.id}`;

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

const deleteExcursaoPassageiro = (): IUpdateExcursaoPassageiroResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `excursao-passageiros/delete/${id}`

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

export default function useExcursaoPassageiro() {
  return {
    listExcursaoPassageiros,
    getExcursaoPassageiros,
    createExcursaoPassageiro,
    updateExcursaoPassageiro,
    deleteExcursaoPassageiro
  }
}
