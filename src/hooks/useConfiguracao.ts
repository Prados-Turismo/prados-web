import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IConfiguracaoArgs,
  IConfiguracaoResponse,
  ICreateConfiguracaoArgs,
  ICreateConfiguracaoResponse,
  IUpdateConfiguracaoArgs,
  IUpdateConfiguracaoResponse,
  IDeleteConfiguracaoResponse
} from "../models/configuracao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getConfiguracao = ({ page, size, nome, status }: IConfiguracaoArgs): IConfiguracaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.configuracao,
    ],
    async () => {
      const path = 'configuracoes/index';

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

const getAllConfiguracao = (): IConfiguracaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.configuracao,
    ],
    async () => {
      const path = 'configuracoes/findAll';

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

const createConfiguracao = (): ICreateConfiguracaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateConfiguracaoArgs) => {
      const urlPath = 'configuracoes/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {

          queryClient.invalidateQueries([keys.configuracao])

          useToastStandalone({
            title: "Configuração Salva!",
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

const updateConfiguracao = (): IUpdateConfiguracaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateConfiguracaoArgs) => {
      const urlPath = `configuracoes/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
         
          queryClient.invalidateQueries([keys.configuracao])

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

const deleteConfiguracao = (): IDeleteConfiguracaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `configuracoes/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.configuracao])

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

export default function useConfiguracao() {
  return {
    getConfiguracao,
    getAllConfiguracao,
    createConfiguracao,
    updateConfiguracao,
    deleteConfiguracao
  }
}
