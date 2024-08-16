import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IReservaArgs,
  IReservaResponse,
  ICreateReservaArgs,
  ICreateReservaResponse,
  IUpdateReservaArgs,
  IUpdateReservaResponse,
  IDeleteReservaResponse
} from "../models/reservas.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getReserva = ({ page, size }: IReservaArgs): IReservaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.reserva,
      page
    ],
    async () => {
      const path = 'reserva/index';

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

const getAllReserva = (): IReservaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.excursaoQuarto,
    ],
    async () => {
      const path = 'reserva/findAll';

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

const createReserva = (
  reset: () => void,
  handleClose: () => void
): ICreateReservaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateReservaArgs) => {
      const urlPath = 'reserva/create'
      debugger

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.reserva])

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

const updateReserva = (
  reset: () => void,
  handleClose: () => void
): IUpdateReservaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateReservaArgs) => {
      const urlPath = `reserva/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.reserva])

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

const deleteReserva = (): IDeleteReservaResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `reserva/delete/${id}`
      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.reserva])

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

export default function useReserva() {
  return {
    getReserva,
    getAllReserva,
    createReserva,
    updateReserva,
    deleteReserva
  }
}
