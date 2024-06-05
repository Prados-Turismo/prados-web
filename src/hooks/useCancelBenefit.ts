import { useQuery } from "react-query";
import { IReasonsResponse, IUseReasonsResponse } from "../models/cancelBenefit";

import { apiRecord } from "../services/api";
import { keys } from "../services/query";
import { Warning } from "../errors";

const getReasons = (): IReasonsResponse => {
  const { isLoading, data } = useQuery(
    keys.reasons,
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/motivos-cancelamento-beneficios`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar as opções de motivos de cancelamento!",
          _error?.response?.status,
        );
      }
    },
    {
      staleTime: 1200000, // 20 minutes
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

export default function useCancelBenefit(): IUseReasonsResponse {
  return {
    getReasons,
  };
}
