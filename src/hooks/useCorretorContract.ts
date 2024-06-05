import { useQuery } from "react-query";
import { apiRecord } from "../services/api";
import { keys } from "../services/query";

// Types
import {
  IContractArgs,
  IContractResponse,
  ICorretorsCompaniesFilteredResponse,
  ICorretorsCompaniesResponse,
  IProposalArgs,
  IProposalResponse,
  IProposalStatusResponse,
  IUseCorretorContract,
} from "../models/corretorContract.model";
import { Warning } from "../errors";

const getContract = ({
  currentPage,
  pageSize,
  type,
  mySales,
  searchParam,
}: IContractArgs): IContractResponse => {
  const { data, isLoading } = useQuery(
    [keys.contract, currentPage, type, mySales, searchParam],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/corretors/listar/movimentacao?tipoAgrupamento=${type}&page=${currentPage}&size=${pageSize}&minhasVendas=${mySales}${
            searchParam || ""
          }`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar os contratos",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
  };
};

const getProposal = ({ proposalId }: IProposalArgs): IProposalResponse => {
  const { data, isLoading } = useQuery(
    [keys.contract, `proposal-${proposalId}`],
    async () => {
      try {
        const { data } = await apiRecord.get(`/proposta-adesaos/${proposalId}`);

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar os dados da proposta",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const getCorretorsCompanies = (): ICorretorsCompaniesResponse => {
  const { data, isLoading } = useQuery(
    [keys.contract, "companies"],
    async () => {
      try {
        const { data } = await apiRecord.get("/corretors/listar/empresas");
        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar as Empresas!",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    companiesData: data || [],
    loadingCompanies: isLoading,
  };
};

const getCorretorsCompaniesFiltered = (
  hubId: number | undefined,
): ICorretorsCompaniesFilteredResponse => {
  const { data, isLoading } = useQuery(
    [keys.contract, "companies"],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/corretors/listar/empresas?hub=${hubId}`,
        );
        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar as Empresas!",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    companiesData: data || [],
    loadingCompanies: isLoading,
  };
};

const getProposalStatus = (): IProposalStatusResponse => {
  const { data, isLoading } = useQuery([keys.contract, "status"], async () => {
    try {
      const { data } = await apiRecord.get("/status-proposta-adesaos");
      return data;
    } catch (_error: any) {
      throw new Warning(
        "Não foi possível listar os Status!",
        _error?.response?.status,
      );
    }
  });

  return {
    statusData: data || [],
    loadingStatus: isLoading,
  };
};

export default function useCorretorContract(): IUseCorretorContract {
  return {
    getContract,
    getProposal,
    getCorretorsCompanies,
    getCorretorsCompaniesFiltered,
    getProposalStatus,
  };
}
