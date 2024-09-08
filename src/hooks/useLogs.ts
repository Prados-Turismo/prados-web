import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ILogsArgs,
  ILogsResponse,
  ICreateLogsArgs,
  ICreateLogsResponse,
  IUpdateLogsArgs,
  IUpdateLogsResponse,
  IDeleteLogsResponse
} from "../models/logs.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";
import { getDifferencesWithNewValues } from "../utils/logDataFormater";

const getLogs = ({ page, size }: ILogsArgs): ILogsResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.logs,
      page
    ],
    async () => {
      const path = 'log/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size
          },
        });

        if (data?.rows) {
          for (const value of data.rows) {
            if (value.tipo === 'UPDATE') {
              let changes
              let newData = value.newData && value.newData !== '' ? JSON.parse(value.newData) : null;
              let oldData = value.oldData && value.oldData !== '' ? JSON.parse(value.oldData) : null;

              if (newData && oldData) {
                changes = getDifferencesWithNewValues(newData, oldData);
                Object.assign(value, { changes });
              }
            }
          }
        }

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

const getAllLogs = (): ILogsResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.logs,
    ],
    async () => {
      const path = 'log/findAll';

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

const createLogs = (
  reset: () => void,
  handleClose: () => void
): ICreateLogsResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateLogsArgs) => {
      const urlPath = 'log/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.logs])

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

const updateLogs = (
  reset: () => void,
  handleClose: () => void
): IUpdateLogsResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateLogsArgs) => {
      const urlPath = `log/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.logs])

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

const deleteLogs = (): IDeleteLogsResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `log/delete/${id}`

      try {
        await apiPrados.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.logs])

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

export default function useLogs() {
  return {
    getLogs,
    getAllLogs,
    createLogs,
    updateLogs,
    deleteLogs
  }
}
