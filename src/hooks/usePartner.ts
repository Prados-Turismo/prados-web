/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiRecord } from "../services/api";
import { keys } from "../services/query";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import { ICompaniesAssociated } from "../models/companies-associated";
import {
  IDataPartnership,
  IGetPartnershipArgs,
  IPartnerDetailsResponse,
  IPartnershipArgs,
  IPartnershipResponse,
  IcorporateData,
} from "../models/partner.model";
import { useToastStandalone } from "./useToastStandalone";

const getPartnershipQuery = async ({
  companyId,
  corporateName,
  page,
  size,
}: IPartnershipArgs): Promise<{
  info: IDataPartnership[];
  count: number;
}> => {
  const { data } = await apiRecord.get(
    `/companies-associated/${companyId}/partnerships`,
    {
      params: {
        corporateName,
        page,
        size,
      },
    },
  );

  return {
    info: data?.rows,
    count: data?.count,
  };
};

const getPartnerships = ({
  companyId,
  corporateName,
  page,
  size,
}: IGetPartnershipArgs): IPartnershipResponse => {
  const { data, isLoading } = useQuery(
    [keys.partnerships, companyId, corporateName, size, page],
    () =>
      getPartnershipQuery({
        companyId,
        corporateName: corporateName,
        page,
        size,
      }),
  );

  return {
    data: data?.info || [],
    count: data?.count || 0,
    isLoading,
  };
};

const getPartnerDetailsQuery = async ({
  companyId,
}: IPartnershipArgs): Promise<{
  info: ICompaniesAssociated;
}> => {
  const { data: info } = await apiRecord.get(
    `/companies-associated/${companyId}`,
  );

  return {
    info,
  };
};

const getPartnerDetails = ({
  companyId,
}: IGetPartnershipArgs): IPartnerDetailsResponse => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery([keys.partners, companyId], () =>
    getPartnerDetailsQuery({
      companyId,
    }).catch((error) => {
      navigate("/prestadores-de-servico");
      useToastStandalone({
        title: error?.response?.data?.message,
        description: error?.response?.data?.data,
        status: "error",
      });
    }),
  );

  return {
    data: data?.info || null,
    isLoading,
  };
};

const checkByCnpj = (
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [corporate, setCorporate] = useState<IcorporateData | null>(null);

  const { isLoading, mutate } = useMutation(async (data: { cnpj: string }) => {
    try {
      setCorporate(null);
      await apiRecord
        .post(`/companies/check-company`, {
          cnpj: data?.cnpj,
          include: {
            companyAssociated: true,
          },
        })
        .then((res) => {
          if (res?.data?.companyAssociated) {
            useToastStandalone({
              title: "CNPJ já registrado!",
              description:
                "O CNPJ informado já está registrado em nosso sistema. Caso deseje obter mais informações, entre em contato pelo Canal de Atendimento.",
              status: "info",
            });
            setDisabled(true);
          } else {
            setDisabled(false);
          }
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

const updatePartnership = (companyId: string) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: {
      name: string;
      phone: string;
      email: string;
      preference: string;
      id: string;
    }) => {
      try {
        const payload = {
          companyContact: data,
        };
        await apiRecord.put(`/companies-associated/${companyId}`, payload);
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.partners, companyId]);
        queryClient.invalidateQueries([keys.partnerships, companyId]);

        useToastStandalone({
          title: "PJ editado com sucesso!",
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

const createPartnership = (setShowModal: any) => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: {
      id: string;
      name: string;
      email: string;
      cpf: string;
      phone: string;
      preference: string;
    }) => {
      try {
        await apiRecord.post(
          `/companies-associated/${company?.externalCompanyId}/partnerships`,
          data,
        );
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.partnerships]);
        setShowModal(false);

        useToastStandalone({
          title: "Cadastro concluído!",
          description:
            "O responsável pela empresa receberá um e-mail contendo as instruções para acessar a plataforma.",
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

export default function usePartner() {
  return {
    getPartnerships,
    getPartnerDetails,
    checkByCnpj,
    updatePartnership,
    createPartnership,
  };
}
