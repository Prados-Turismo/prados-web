/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { useGlobal } from "../contexts/UserContext";
import {
  IPermissionsArgs,
  IPermissionsData,
  IPermissionsResponse,
  IUsePermissionsResponse,
} from "../models/permissions";
import { apiPermission } from "../services/api";
import { keys } from "../services/query";

import { Warning } from "../errors";

const getPermissions = ({
  userId,
  companyId,
}: IPermissionsArgs): IPermissionsResponse => {
  const { user, setPermissions } = useGlobal();

  const isCanNotAccess = user?.profiles.every(
    (profile) => profile.name === "CORRETOR",
  );

  if (isCanNotAccess) {
    return {
      data: [],
      isLoading: false,
    };
  }

  const { data, isLoading } = useQuery(keys.permissions, async () => {
    try {
      const { data } = await apiPermission.get(
        `/user/${userId}/company/${companyId}/permissions`,
      );

      const result = data.map((el: IPermissionsData) => el?.domain);

      setPermissions({
        collaborator: result.includes("COLABORADORES"),
        product: result.includes("PRODUTOS"),
        partner: result.includes("PJ`S"),
        financialArea: result.includes("ÁREA FINANCEIRA"),
        companyData: result.includes("DADOS DA EMPRESA"),
        userManagement: result.includes("GESTÃO DE USUÁRIOS"),
        healthVoucherManagement: result.includes("GESTÃO PROMOÇÃO A SAÚDE"),
        reports: result.includes("MOVIMENTAÇÕES"),
        adhesion: result.includes("ADESÃO"),
        productSettings: result.includes("CONFIGURAÇÕES DE PRODUTOS"),
        notifications: true,
      });

      return result;
    } catch (error: any) {
      if (error?.response?.data?.message[0] !== "Empresa não encontrada") {
        throw new Warning(
          `Erro ao buscar as permissões de acesso`,
          error.response.status,
        );
      }
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

export default function usePermissions(): IUsePermissionsResponse {
  return {
    getPermissions,
  };
}
