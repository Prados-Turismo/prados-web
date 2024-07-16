import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ICreateExcursaoOnibusResponse,
  IExcursaoOnibus,
} from "../models/excursao.onibus.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const createExcursaoOnibus = (): ICreateExcursaoOnibusResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IExcursaoOnibus) => {
      const urlPath = 'excursao-onibus/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          queryClient.invalidateQueries([keys.excursaoPassageiro])

          useToastStandalone({
            title: "Assento(s) Registrado(s)!",
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

// const updateExcursaoOnibus = (): IUpdateExcursaoOnibusResponse => {

//   const { isLoading, mutate } = useMutation(
//     async (data: IUpdateExcursaoOnibusArgs) => {
//       const urlPath = `passageiro-Onibus/update/${data.id}`;
//       try {
//         await apiPrados.put(urlPath, data).then((data) => {

//           queryClient.invalidateQueries([keys.excursaoOnibus])

//           useToastStandalone({
//             title: "Atualizado com sucesso!",
//             status: "success"
//           })
//         })
//       } catch (error: any) {
//         throw new Warning(error.response.data.message, error?.response?.status);
//       }
//     }
//   )

//   return {
//     isLoading,
//     mutate
//   }
// }

export default function useExcursaoOnibus() {
  return {
    createExcursaoOnibus,
    // updateExcursaoOnibus
  }
}
