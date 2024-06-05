import { useMutation } from "react-query";
import { apiRecord } from "../services/api";
import { ICheckByCpfArgs } from "../models/collaborator.model";
import { Warning } from "../errors";
import { useToastStandalone } from "./useToastStandalone";
import { useState } from "react";
import { IcorporateData } from "../models/partner.model";

const checkAnyByCpf = (
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { isLoading, mutate } = useMutation(async (data: ICheckByCpfArgs) => {
    try {
      await apiRecord
        .get(`/companies-associated/${data.cpf}/check-any-by-cpf`)
        .then(() => {
          setDisabled(false);
        });
    } catch (error: any) {
      setDisabled(true);
      throw new Warning(error.response.data.message, error?.response?.status);
    }
  });

  return {
    isLoading,
    mutate,
  };
};

const checkByCnpj = (
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setCompanyId?: (companyId: string) => void,
) => {
  const [corporate, setCorporate] = useState<IcorporateData | null>(null);

  const { isLoading, mutate } = useMutation(async (data: { cnpj: string }) => {
    try {
      setCorporate(null);
      await apiRecord
        .post<IcorporateData>(`/companies/check-company`, {
          cnpj: data?.cnpj,
          include: {
            companyAssociated: true,
          },
        })
        .then((res) => {
          if (
            res?.data?.companyAssociated &&
            !res.data.companyAssociated.isIssue
          ) {
            useToastStandalone({
              title: "CNPJ já registrado!",
              description:
                "Sua empresa possui cadastro ativo em nosso sistema, Entre em contato pelo 0800 591 6622 para mais detalhes.",
              status: "info",
            });

            setDisabled(true);
          } else if (res.data.irsSituation !== "ATIVA") {
            setDisabled(true);
          } else {
            setDisabled(false);
          }
          if (res.data && setCompanyId) setCompanyId(res.data.id);
          setCorporate(res?.data);
        });
    } catch (error: any) {
      setDisabled(true);
      throw new Warning(error.response.data.message, error?.response?.status);
    }
  });

  return {
    isLoading,
    mutate,
    corporate: corporate,
  };
};

export default function useSignUp() {
  return {
    checkAnyByCpf,
    checkByCnpj,
  };
}
