import { useQuery } from "react-query";
import {
  ICivilStatusResponse,
  IDataParantage,
  IParentageResponse,
  IUseDependentResponse,
} from "../models/dependents.model";

import { apiRecord } from "../services/api";
import { keys } from "../services/query";
import { Warning } from "../errors";

// Types

const getParentage = (): IParentageResponse => {
  const { isLoading, data } = useQuery(
    keys.parentage,
    async () => {
      try {
        const { data } = await apiRecord.get("/parentescos");

        return data.filter(
          (el: IDataParantage) => el.nomeParentesco !== "Titular",
        );
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar os parentescos",
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

const getCivilStatus = (): ICivilStatusResponse => {
  const { isLoading, data } = useQuery(
    keys.civilStatus,
    async () => {
      try {
        const { data } = await apiRecord.get("/estado-civils");

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar o estado civil",
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

export default function useDependent(): IUseDependentResponse {
  return {
    getParentage,
    getCivilStatus,
  };
}
