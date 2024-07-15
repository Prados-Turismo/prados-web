import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ILocalEmbarqueResponse
} from "../models/local-embarque.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getLocalEmbarque = (): ILocalEmbarqueResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.localEmbarque
    ],
    async () => {
      const urlPath = 'local-embarque/findAll'

      try {
        const { data } = await apiPrados.get(urlPath)

        return data;
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    data: data || [],
    isLoading
  };
}

export default function useLocalEmbarque() {
  return {
    getLocalEmbarque
  }
}
