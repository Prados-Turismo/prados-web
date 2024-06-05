import { useQuery } from "react-query";

import {
  ICorretorsCompanyResponse,
  ICorretorsHubsResponse,
  IMultiUserResponse,
} from "../models/multiUser.model";
import { apiRecord } from "../services/api";
import { keys } from "../services/query";
import { Warning } from "../errors";

const getCorretorsHubs = (): ICorretorsHubsResponse => {
  const { data, isLoading } = useQuery(keys.corretorsHubs, async () => {
    try {
      const { data } = await apiRecord.get("/corretors/listar/hubs");
      return data;
    } catch (_error: any) {
      throw new Warning(
        "Não foi possível listar os Hubs!",
        _error?.response?.status,
      );
    }
  });

  return {
    hubsData: data || [],
    loadingHubs: isLoading,
  };
};

const getCorretorsCompany = (idHub: number): ICorretorsCompanyResponse => {
  const { data, isLoading } = useQuery(keys.corretorsHubs, async () => {
    try {
      const { data } = await apiRecord.get(
        `/corretors/listar/empresas?hub=${idHub}`,
      );

      return data;
    } catch (_error: any) {
      throw new Warning(
        "Não foi possível listar os Hubs!",
        _error?.response?.status,
      );
    }
  });

  return {
    companyData: data || [],
    loadingCompany: isLoading,
  };
};

export default function useMultiUser(): IMultiUserResponse {
  return {
    getCorretorsHubs,
    getCorretorsCompany,
  };
}
