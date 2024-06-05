import { useQuery } from "react-query";

import { keys } from "../services/query";
import { apiRecord } from "../services/api";
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import { IAPIResponse, IFormData } from "../models/broker-tab-implant";

const getForms = (): IFormData => {
  const { company } = useGlobal();

  const { data, isLoading } = useQuery(keys.hasForm, async () => {
    try {
      const { data } = await apiRecord.get<IAPIResponse>(
        `/possuiFormulario/${company!.externalCompanyId}`,
      );

      return data;
    } catch (error: any) {
      throw new Warning(
        "Erro ao buscar o formulário de implantação",
        error?.response?.status,
      );
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

export const useGetForm = () => ({ getForms });
