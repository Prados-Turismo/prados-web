import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ICategoriaTransacaoArgs,
  ICategoriaTransacaoResponse,
  ICreateCategoriaTransacaoArgs,
  ICreateCategoriaTransacaoResponse,
  IUpdateCategoriaTransacaoArgs,
  IUpdateCategoriaTransacaoResponse,
  IDeleteCategoriaTransacaoResponse
} from "../models/categoria-transacao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getCategoriaTransacao = ({ page, size, nome }: ICategoriaTransacaoArgs): ICategoriaTransacaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.categoriaTransacao,
      page,
      nome
    ],
    async () => {
      const path = 'categoria-transacao/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome
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

const getAllCategoriaTransacao = (): ICategoriaTransacaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.categoriaTransacao,
    ],
    async () => {
      const path = 'categoria-transacao/findAll';

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

const createCategoriaTransacao = (
  reset: () => void,
  handleClose: () => void
): ICreateCategoriaTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateCategoriaTransacaoArgs) => {
      const urlPath = 'categoria-transacao/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.categoriaTransacao])

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

const updateCategoriaTransacao = (
  reset: () => void,
  handleClose: () => void
): IUpdateCategoriaTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateCategoriaTransacaoArgs) => {
      const urlPath = `categoria-transacao/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.categoriaTransacao])

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

const deleteCategoriaTransacao = (): IDeleteCategoriaTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `categoria-transacao/delete/${id}`

      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.categoriaTransacao])

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

export default function useCategoriaTransacao() {
  return {
    getCategoriaTransacao,
    getAllCategoriaTransacao,
    createCategoriaTransacao,
    updateCategoriaTransacao,
    deleteCategoriaTransacao
  }
}
