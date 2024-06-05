import { useMutation, useQueryClient } from "react-query";
import { apiPermission, apiRecord } from "../services/api";
import { useToastStandalone } from "./useToastStandalone";
import { keys } from "../services/query";
import { useGlobal } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface ISendTerm {
  name: string;
  cpf: string;
  email: string;
  useTerm: true;
}

const acceptTerm = (companyId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsUseTerm } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async (data: ISendTerm) => {
      await apiRecord.put(`/companies-associated/${companyId}/use-term`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.invalidateQueries(["fetch-company-data-into-forms-terms"]);
        queryClient.invalidateQueries([keys.home]);
        setIsUseTerm(true);
        navigate("/");

        useToastStandalone({
          title: "Termo aceito com sucesso!",
          status: "success",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const acceptTermOfPrivacy = (userId: string, handleClose: () => void) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => {
      if (!userId) {
        return { isLoading: false, mutate: () => null };
      }
      await apiPermission.post(`/user/${userId}/term-of-privacy`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.invalidateQueries(["fetch-company-data-into-forms-terms"]);
        queryClient.invalidateQueries([keys.home]);
        handleClose();

        useToastStandalone({
          title: "Política de privacidade aceita com sucesso!",
          status: "success",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const useTermsAndPolicy = () => ({ acceptTerm, acceptTermOfPrivacy });
export default useTermsAndPolicy;
