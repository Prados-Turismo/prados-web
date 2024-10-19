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
  IDeleteReservaResponse,
  IReservaFindResponse,
  IReserva,
} from "../models/reservas.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getReserva = (
  {
    page,
    size,
    status,
    filter
  }: IReservaArgs): IReservaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.reserva,
      page,
      status,
      filter
    ],
    async () => {
      const path = 'reserva/index';
      let nome, reserva

      if (filter) {

        if (/\d/.test(filter)) {
          reserva = parseInt(filter)
        } else {
          nome = filter
        }
      }

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            status,
            reserva,
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

const findReserva = (id: string): IReservaFindResponse => {

  const { data, isLoading } = useQuery(
    [
    ],
    async () => {
      const path = `reserva/find/${id}`;
      queryClient.invalidateQueries([keys.reserva])

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
    isLoading,
  };
}

const getAllReservas = (): IReservaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.reserva,
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
      data.plataforma = 2

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.reserva])
          queryClient.invalidateQueries([keys.excursao])

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
          queryClient.invalidateQueries([keys.excursao])

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
        await apiPrados.patch(urlPath).then(function () {
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


const createCreditoCliente = (
  reset: () => void,
  handleClose: () => void): IDeleteReservaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IReserva) => {
      const urlPath = `reserva/cancelar/${data.id}`;

      try {
        await apiPrados.post(urlPath, data).then(function () {

          reset()
          handleClose()

          queryClient.invalidateQueries([keys.reserva])

          useToastStandalone({
            title: "Crédito gerado com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status)
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const sendTicketMail = (): IDeleteReservaResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `reserva/send-ticket-mail/${id}`;

      try {

        await apiPrados.get(urlPath)

        useToastStandalone({
          title: "E-mail enviado com sucesso!",
          status: "success"
        })

      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status)
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const reservaPromiseOptions = async (search: string, _loadedOptions: any, { page }: any) => {

  const path = 'reserva/index';
  const itensPerPage = 20;

  const { data } = await apiPrados.get(path, {
    params: {
      page,
      size: itensPerPage,
      nome: search,
      orderBy: 'reserva'
    },
  });

  return {
    options: data.rows.map((item: IReserva) => ({
      label: item.reserva,
      value: item.id
    })),
    hasMore: data.count > (page * itensPerPage),
    additional: {
      page: page + 1,
    }
  }
}

export default function useReserva() {
  return {
    getReserva,
    getAllReservas,
    createReserva,
    updateReserva,
    deleteReserva,
    findReserva,
    createCreditoCliente,
    sendTicketMail,
    reservaPromiseOptions
  }
}
