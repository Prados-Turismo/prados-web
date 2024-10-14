/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "react-query";

// Api
import { apiPrados } from "../services/api";

// Types
import {
  ICreateFornecedorArgs,
  ICreateFornecedorResponse,
  IDeleteFornecedorResponse,
  IFornecedor,
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
    count: 0,
    isLoading
  };
}

const getFornecedores = ({ page, size, status, nome }: IFornecedorArgs): IFornecedorResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.fornecedores,
      page,
      status,
      nome
    ],
    async () => {
      const path = 'fornecedor/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            status,
            nome,
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
      data.cnpj = extractNumbers(data.cnpj) || ''

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
      data.cnpj = extractNumbers(data.cnpj) || ''

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

const fornecedorPromiseOptions = async (search: string, _loadedOptions: any, { page }: any) => {

  const path = 'fornecedor/index';
  const itensPerPage = 20;

  const { data } = await apiPrados.get(path, {
    params: {
      page,
      size: itensPerPage,
      nome: search,
      orderBy: 'nome'
    },
  });

  return {
    options: data.rows.map((item: IFornecedor) => ({
      label: item.nome,
      value: item.id
    })),
    hasMore: data.count > (page * itensPerPage),
    additional: {
      page: page + 1,
    }
  }
}

export default function useFornecedor() {
  return {
    getAllFornecedores,
    deleteFornecedor,
    getFornecedores,
    updateFornecedor,
    createFornecedor,
    fornecedorPromiseOptions
  };
}
