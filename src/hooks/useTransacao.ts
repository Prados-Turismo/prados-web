import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ITransacaoArgs,
  ITransacaoResponse,
  ICreateTransacaoArgs,
  ICreateTransacaoResponse,
  IUpdateTransacaoArgs,
  IUpdateTransacaoResponse,
  IDeleteTransacaoResponse
} from "../models/transacao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getTransacoes = ({ page, size }: ITransacaoArgs): ITransacaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiro,
      page
    ],
    async () => {
      const path = 'financeiro/index';

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

const createTransacao = (
  reset: () => void,
  handleClose: () => void
): ICreateTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateTransacaoArgs) => {
      const urlPath = 'financeiro/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.financeiro])

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

const updateTransacao = (
  reset: () => void,
  handleClose: () => void
): IUpdateTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateTransacaoArgs) => {
      const urlPath = `financeiro/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.financeiro])

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

const deleteTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro, keys.contaBancaria])

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

const efetivarTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/efetivar-transacao/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro])
          queryClient.invalidateQueries([keys.contaBancaria])

          useToastStandalone({
            title: "Efetivada com sucesso!",
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

const desefetivarTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/des-efetivar/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro])
          queryClient.invalidateQueries([keys.contaBancaria])

          useToastStandalone({
            title: "Desefetivada com sucesso!",
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

const setVistoTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/set-visto-admin/${id}`

      try {
        await apiPrados.patch(urlPath, { visto: true }).then(function () {
          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Marcada como vista com sucesso!",
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

const removeVistoTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/set-visto-admin/${id}`

      try {
        await apiPrados.patch(urlPath, { visto: false }).then(function () {
          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Marcada como vista com sucesso!",
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

export default function useTransacao() {
  return {
    getTransacoes,
    createTransacao,
    updateTransacao,
    deleteTransacao,
    efetivarTransacao,
    desefetivarTransacao,
    setVistoTransacao,
    removeVistoTransacao
  }
}
