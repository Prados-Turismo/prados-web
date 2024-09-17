import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IOpcionalEmbarqueArgs,
  IOpcionalEmbarqueResponse,
  ICreateOpcionalEmbarqueArgs,
  ICreateOpcionalEmbarqueResponse,
  IUpdateOpcionalEmbarqueArgs,
  IUpdateOpcionalEmbarqueResponse,
  IDeleteOpcionalEmbarqueResponse
} from "../models/opcional-embarque.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getOpcionalEmbarque = ({ page, size }: IOpcionalEmbarqueArgs, id: string, idExcursao: string): IOpcionalEmbarqueResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.opcionalEmbarque,
      page
    ],
    async () => {
      const path = `opcional-embarque/index/${id}/${idExcursao}`

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
          },
        });
        queryClient.invalidateQueries([keys.products])
        queryClient.invalidateQueries([keys.opcionalEmbarque])

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

const getAllOpcionalEmbarque = (): IOpcionalEmbarqueResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.opcionalEmbarque,
    ],
    async () => {
      const path = 'opcional-embarque/findAll';

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

const createOpcionalEmbarque = (): ICreateOpcionalEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateOpcionalEmbarqueArgs) => {
      const urlPath = 'opcional-embarque/create'

      try {
        await apiPrados.post(urlPath, data).then((reponse) => {
          queryClient.invalidateQueries([keys.opcionalEmbarque])

          useToastStandalone({
            title: "Embarque Registrado!",
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

const updateOpcionalEmbarque = (): IUpdateOpcionalEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateOpcionalEmbarqueArgs) => {

      const urlPath = `opcional-embarque/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then((data) => {

          queryClient.invalidateQueries([keys.opcionalEmbarque])

          useToastStandalone({
            title: "Embarque Registrado!",
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

const deleteOpcionalEmbarque = (): IDeleteOpcionalEmbarqueResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `opcional-embarque/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.opcionalEmbarque])

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

export default function useOpcionalEmbarque() {
  return {
    getOpcionalEmbarque,
    getAllOpcionalEmbarque,
    createOpcionalEmbarque,
    updateOpcionalEmbarque,
    deleteOpcionalEmbarque
  }
}
