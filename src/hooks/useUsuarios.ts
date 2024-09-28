import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IUsuarioArgs,
  IUsuarioResponse,
  ICreateUsuarioArgs,
  ICreateUsuarioResponse,
  IUpdateUsuarioArgs,
  IUpdateUsuarioResponse,
  IDeleteUsuarioResponse
} from "../models/usuarios.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getUsuario = ({ page, size, nome, status }: IUsuarioArgs): IUsuarioResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.usuario,
      page,
      nome,
      status
    ],
    async () => {
      const path = 'usuarios/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            status,
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

const getAllUsuario = (): IUsuarioResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.usuario,
    ],
    async () => {
      const path = 'usuarios/findAll';

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

const createUsuario = (
  reset: () => void,
  handleClose: () => void
): ICreateUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateUsuarioArgs) => {
      const urlPath = 'usuarios/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.usuario])

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

const updateUsuario = (
  reset: () => void,
  handleClose: () => void
): IUpdateUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateUsuarioArgs) => {
      const urlPath = `usuarios/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.usuario])

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

const deleteUsuario = (): IDeleteUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `usuarios/delete/${id}`
      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.usuario])

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

export default function useUsuario() {
  return {
    getUsuario,
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
  }
}
