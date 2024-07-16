import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ICreateExcursaoEmbarqueArgs,
  ICreateExcursaoEmbarqueResponse,
  IExcursaoEmbarque,
  IUpdateExcursaoEmbarqueArgs,
  IUpdateExcursaoEmbarqueResponse
} from "../models/excursao-embarque.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const createExcursaoEmbarque = (): ICreateExcursaoEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateExcursaoEmbarqueArgs) => {
      const urlPath = 'passageiro-embarque/create'

      try {
        await apiPrados.post(urlPath, data).then((reponse) => {
          queryClient.invalidateQueries([keys.excursaoPassageiro])

          useToastStandalone({
            title: "Embarque Registrado!",
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

const updateExcursaoEmbarque = (): IUpdateExcursaoEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateExcursaoEmbarqueArgs) => {
      const urlPath = `passageiro-embarque/embarcou`;
      try {
        await apiPrados.put(urlPath, data).then((data) => {

          queryClient.invalidateQueries([keys.excursaoPassageiro])

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

export default function useExcursaoEmbarque() {
  return {
    createExcursaoEmbarque,
    updateExcursaoEmbarque
  }
}
