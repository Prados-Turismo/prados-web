import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ITipoQuartoArgs,
  ITipoQuartoResponse,
  ICreateTipoQuartoArgs,
  ICreateTipoQuartoResponse,
  IUpdateTipoQuartoArgs,
  IUpdateTipoQuartoResponse,
  IDeleteTipoQuartoResponse
} from "../models/tipo-quarto.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getTipoQuartos = ({ page, size, nome, status }: ITipoQuartoArgs): ITipoQuartoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.tipoQuarto,
      page,
      nome,
      status
    ],
    async () => {
      const path = 'tipo-quarto/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            status
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

const getAllTipoQuartos = (): ITipoQuartoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.excursaoQuarto,
    ],
    async () => {
      const path = 'tipo-quarto/findAll';

      try {
        const { data } = await apiPrados.get(path);
        queryClient.invalidateQueries([keys.excursaoQuarto])

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

const createTipoQuarto = (
  reset: () => void,
  handleClose: () => void
): ICreateTipoQuartoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateTipoQuartoArgs) => {
      const urlPath = 'tipo-quarto/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.tipoQuarto])

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

const updateTipoQuarto = (
  reset: () => void,
  handleClose: () => void
): IUpdateTipoQuartoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateTipoQuartoArgs) => {
      const urlPath = `tipo-quarto/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.tipoQuarto])

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

const deleteTipoQuarto = (): IDeleteTipoQuartoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `tipo-quarto/delete/${id}`

      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.tipoQuarto])

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

export default function useTipoQuarto() {
  return {
    getTipoQuartos,
    getAllTipoQuartos,
    createTipoQuarto,
    updateTipoQuarto,
    deleteTipoQuarto
  }
}
