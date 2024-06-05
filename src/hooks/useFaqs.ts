import { useQuery } from "react-query";
import { Question } from "../pages/CommonQuestions/types";
import { apiSupport } from "../services/api";
import { Warning } from "../errors";
import { keys } from "../services/query";

const getFaqs = ({ userType }: { userType: string }) => {
  const { data, isLoading } = useQuery<{
    rows: Question[];
  }>([keys.commonQuestions, userType], async () => {
    const type =
      userType === "CORRETOR"
        ? "brokerAgent"
        : userType === "EMISSOR"
        ? "issuer"
        : "company";
    try {
      const { data } = await apiSupport.get(
        `/common-questions?page=1&size=1000&userType=${type}`,
      );

      return data;
    } catch (err: any) {
      throw new Warning(
        `Erro ao buscar as perguntas frequentes`,
        err.response.status,
      );
    }
  });

  return { data: data?.rows, isLoading };
};

export function useFaqs() {
  return { getFaqs };
}
