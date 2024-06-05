import { useQuery } from "react-query";
import { useGlobal } from "../contexts/UserContext";
import { apiRecord } from "../services/api";
import { ICompaniesAssociated } from "../models/companies-associated";
import { Warning } from "../errors";

const useCompany = () => {
  const { company, setIsUseTerm, setCompanyStatus } = useGlobal();

  const { data, isLoading, error } = useQuery(
    ["fetch-company-data-into-forms", company?.externalCompanyId],
    async () => {
      try {
        const { data } = await apiRecord.get<ICompaniesAssociated>(
          `/companies-associated/${company?.externalCompanyId}`,
        );

        const companyStatus = data?.companyAssociated?.companyStatus.find(
          (status) => status?.active,
        );

        setIsUseTerm(data?.companyAssociated?.useTerm ? true : false);

        setCompanyStatus(companyStatus);

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message[0] || "Ocorreu um erro inesperado!",
          error?.response?.status,
        );
      }
    },
  );

  return { companyData: data, isLoading, error };
};

export default useCompany;
