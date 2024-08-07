/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "react-query";

// Api
import { apiPrados } from "../services/api";

// Types
import {
  ICreateFornecedorArgs,
  ICreateFornecedorResponse,
  IDeleteFornecedorResponse,
  IFornecedorArgs,
  IFornecedorResponse,
  IUpdateFornecedorArgs,
  IUpdateFornecedorResponse
} from "../models/fornecedor.model";

// Keys
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";
import { useToastStandalone } from "./useToastStandalone";
import { extractNumbers } from "../utils/fieldValidation";

const getAllFornecedores = (): IFornecedorResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.fornecedores
    ],
    async () => {
      const path = 'fornecedor/findAll';

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
    count: data.count || 0,
    isLoading
  };
}

const getFornecedores = ({ page, size }: IFornecedorArgs): IFornecedorResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.fornecedores,
      page
    ],
    async () => {
      const path = 'fornecedor/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            orderBy: 'nome'
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

const createFornecedor = (
  reset: () => void,
  handleClose: () => void
): ICreateFornecedorResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateFornecedorArgs) => {

      const urlPath = 'fornecedor/create'
      data.telefone = data.telefone ? extractNumbers(data.telefone) : null
      data.telefoneContato = data.telefoneContato ? extractNumbers(data.telefoneContato) : null

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.fornecedores])

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

const updateFornecedor = (
  reset: () => void,
  handleClose: () => void
): IUpdateFornecedorResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateFornecedorArgs) => {

      const urlPath = `fornecedor/update/${data.id}`;
      data.telefone = data.telefone ? extractNumbers(data.telefone) : null
      data.telefoneContato = data.telefoneContato ? extractNumbers(data.telefoneContato) : null

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.fornecedores])

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

const deleteFornecedor = (): IDeleteFornecedorResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `fornecedor/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.fornecedores])

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

export default function useFornecedor() {
  return {
    getAllFornecedores,
    deleteFornecedor,
    getFornecedores,
    updateFornecedor,
    createFornecedor
  };
}
