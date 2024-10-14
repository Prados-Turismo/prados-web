import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IComissaoArgs,
  IComissaoResponse,
  ICreateComissaoArgs,
  ICreateComissaoResponse,
  IUpdateComissaoArgs,
  IUpdateComissaoResponse,
  IDeleteComissaoResponse
} from "../models/comissao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getComissao = ({ page, size, nome, status }: IComissaoArgs): IComissaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.comissao,
      page,
      nome,
      status
    ],
    async () => {
      const path = 'comissao/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            status,
            orderBy: 'data'
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

const getAllComissao = (): IComissaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.comissao,
    ],
    async () => {
      const path = 'comissao/findAll';

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

const createComissao = (
  reset: () => void,
  handleClose: () => void
): ICreateComissaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateComissaoArgs) => {
      const urlPath = 'comissao/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.comissao])

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

const updateComissao = (
  reset: () => void,
  handleClose: () => void
): IUpdateComissaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateComissaoArgs) => {
      const urlPath = `comissao/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.comissao])

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

const deleteComissao = (): IDeleteComissaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `comissao/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.comissao])

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

export default function useComissao() {
  return {
    getComissao,
    getAllComissao,
    createComissao,
    updateComissao,
    deleteComissao
  }
}
