import { useMutation, useQuery } from "react-query";
import { apiPrados } from "../services/api";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";
import {
  ICreateFormaPagamentoArgs,
  ICreateFormaPagamentoResponse,
  IDeleteFormaPagamentoResponse,
  IFormaPagamentoArgs,
  IFormaPagamentoResponse,
  IUpdateFormaPagamentoArgs,
  IUpdateFormaPagamentoResponse
} from "../models/forma-pagamento.model";
import { useToastStandalone } from "./useToastStandalone";

const getAllFormaPagamentos = (): IFormaPagamentoResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.formaPagamento
    ],
    async () => {
      const path = 'forma-pagamento/findAll';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            ativo: true
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  );

  return {
    data: data || [],
    isLoading,
    count: data.count || 0
  };
}

const getFormaPagamento = ({ page, size }: IFormaPagamentoArgs): IFormaPagamentoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.formaPagamento,
      page
    ],
    async () => {
      const path = 'forma-pagamento/index';

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

const createFormaPagamento = (
  reset: () => void,
  handleClose: () => void
): ICreateFormaPagamentoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateFormaPagamentoArgs) => {
      const urlPath = 'forma-pagamento/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.formaPagamento])

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

const updateFormaPagamento = (
  reset: () => void,
  handleClose: () => void
): IUpdateFormaPagamentoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateFormaPagamentoArgs) => {
      const urlPath = `forma-pagamento/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.formaPagamento])

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

const deleteFormaPagamento = (): IDeleteFormaPagamentoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `forma-pagamento/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.formaPagamento])

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

export default function useFormaPagamento() {
  return {
    getAllFormaPagamentos,
    deleteFormaPagamento,
    getFormaPagamento,
    updateFormaPagamento,
    createFormaPagamento
  }
}
