import { apiRecord } from "../services/api";
import { useQuery } from "react-query";
import { Warning } from "../errors";
import { keys } from "../services/query";
import { IBroker } from "../models/broker-tab-implant";

const getBrokerList = () => {
  const { data, isLoading } = useQuery(keys.brokerList, async () => {
    try {
      const { data } = await apiRecord.get<{ rows: IBroker[] }>(
        "/companies-broker",
      );

      return data.rows;
    } catch (error: any) {
      throw new Warning(
        "Erro ao buscar a listagem dos vídeos tutoriais",
        error?.response?.status,
      );
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

export const useBroker = () => ({
  getBrokerList,
});
