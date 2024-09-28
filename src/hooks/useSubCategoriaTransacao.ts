import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ISubCategoriaTransacaoArgs,
  ISubCategoriaTransacaoResponse,
  ICreateSubCategoriaTransacaoArgs,
  ICreateSubCategoriaTransacaoResponse,
  IUpdateSubCategoriaTransacaoArgs,
  IUpdateSubCategoriaTransacaoResponse,
  IDeleteSubCategoriaTransacaoResponse
} from "../models/subcategoria-transacao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getSubCategoriaTransacao = ({ page, size, nome }: ISubCategoriaTransacaoArgs): ISubCategoriaTransacaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.subCategoriaTransacao,
      page,
      nome
    ],
    async () => {
      const path = 'sub-categoria/index';

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

const getAllSubCategoriaTransacao = (): ISubCategoriaTransacaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.subCategoriaTransacao,
    ],
    async () => {
      const path = 'sub-categoria/findAll';

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

const createSubCategoriaTransacao = (
  reset: () => void,
  handleClose: () => void
): ICreateSubCategoriaTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateSubCategoriaTransacaoArgs) => {
      const urlPath = 'sub-categoria/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.subCategoriaTransacao])

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

const updateSubCategoriaTransacao = (
  reset: () => void,
  handleClose: () => void
): IUpdateSubCategoriaTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateSubCategoriaTransacaoArgs) => {
      const urlPath = `sub-categoria/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.subCategoriaTransacao])

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

const deleteSubCategoriaTransacao = (): IDeleteSubCategoriaTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `sub-categoria/delete/${id}`

      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.subCategoriaTransacao])

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

export default function useSubCategoriaTransacao() {
  return {
    getSubCategoriaTransacao,
    getAllSubCategoriaTransacao,
    createSubCategoriaTransacao,
    updateSubCategoriaTransacao,
    deleteSubCategoriaTransacao
  }
}
