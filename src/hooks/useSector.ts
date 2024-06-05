/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useToastStandalone } from "./useToastStandalone";

import { apiRecord } from "../services/api";
import { keys } from "../services/query";

// Types
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import {
  IAddOccupationResponse,
  IAddSectorResponse,
  IDeleteOccupationResponse,
  IOccupationResponse,
  ISectorResponse,
  IUpdateOccupationResponse,
} from "../models/sector.model";

const getSector = (companyId: string): ISectorResponse => {
  const { isLoading, data } = useQuery(
    [keys.sector, companyId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${companyId}/sectors?orderBy=name&order=asc&page=1&size=500`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar as Categorias",
          _error?.response?.status,
        );
      }
    },
    {
      staleTime: 1200000, // 20 minutes
    },
  );

  return {
    data: data?.rows || [],
    isLoading,
  };
};

const addSector = (): IAddSectorResponse => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (name: string) => {
      await apiRecord.post(
        `/companies-associated/${company?.externalCompanyId}/sectors`,
        {
          name: name,
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.sector]);

        useToastStandalone({
          description: "Categoria adicionada com sucesso!",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const updateSector = (): IAddSectorResponse => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async ({
      sectorName,
      sectorId,
    }: {
      sectorName: string;
      sectorId: string;
    }) => {
      await apiRecord.put(
        `/companies-associated/${company?.externalCompanyId}/sectors/${sectorId}`,
        {
          name: sectorName,
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.sector]);

        useToastStandalone({
          description: "Categoria atualizada com sucesso!",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const deleteSector = (): IAddSectorResponse => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      await apiRecord.delete(
        `/companies-associated/${company?.externalCompanyId}/sectors/${id}`,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.sector]);

        useToastStandalone({
          description: "Categoria removida com sucesso!",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const getOccupation = (sectorId: string): IOccupationResponse => {
  const { isLoading, data } = useQuery(
    [keys.occupation, sectorId],
    async () => {
      try {
        if (sectorId === "") {
          return [];
        } else {
          const { data } = await apiRecord.get(
            `/companies-associated/sectors/${sectorId}/positions?orderBy=name&order=asc&page=1&size=500`,
          );

          return data;
        }
      } catch (_error: any) {
        throw new Warning("Erro ao buscar as Subcategorias", _error?.response?.status);
      }
    },
    {
      staleTime: 1200000, // 20 minutes
    },
  );
  return {
    data: data?.rows || [],
    isLoading,
  };
};

const addOccupation = (): IAddOccupationResponse => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async ({
      sectorId,
      occupationName,
    }: {
      sectorId: string;
      occupationName: string;
    }) => {
      await apiRecord.post(
        `/companies-associated/sectors/${sectorId}/positions`,
        {
          name: occupationName,
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.occupation]);

        useToastStandalone({
          description: "Subcategoria adicionada com sucesso!",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const updateOccupation = (): IUpdateOccupationResponse => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async ({
      sectorId,
      positionId,
      occupationName,
    }: {
      sectorId: string;
      positionId: string;
      occupationName: string;
    }) => {
      await apiRecord.put(
        `/companies-associated/sectors/${sectorId}/positions/${positionId}`,
        {
          name: occupationName,
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.occupation]);

        useToastStandalone({
          description: "Subcategoria atualizada com sucesso!",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const deleteOccupation = (): IDeleteOccupationResponse => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async ({
      positionId,
      sectorId,
    }: {
      positionId: string;
      sectorId: string;
    }) => {
      await apiRecord.delete(
        `/companies-associated/sectors/${sectorId}/positions/${positionId}`,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.occupation]);

        useToastStandalone({
          description: "Subcategoria deletada com sucesso!",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

export default function useSector() {
  return {
    getSector,
    getOccupation,
    addSector,
    updateSector,
    deleteSector,
    addOccupation,
    updateOccupation,
    deleteOccupation,
  };
}
