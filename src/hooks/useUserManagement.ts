import { useMutation, useQuery, useQueryClient } from "react-query";
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import {
  IColaboratorResponse,
  ICompanyUsersResponse,
  IUpdateBlockedUserArgs,
  IUpdateBlokedUserResponse,
  IUsePermissionsActivedArgs,
  IUsePermissionsActivedResponse,
  IUsePermissionsArgs,
  IUsePermissionsResponse,
  IUserSavePermissionsArgs,
  IUseSavePermissionsResponse,
} from "../models/userManagement.model";
import { apiPermission } from "../services/api";
import { keys } from "../services/query";
import { useToastStandalone } from "./useToastStandalone";
import React from "react";

const useCompanyUsers = ({
  status,
}: {
  status: "A" | "I";
}): ICompanyUsersResponse => {
  const { company, role } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.userManagement, "company", status],
    async () => {
      try {
        const data = await apiPermission
          .get<IColaboratorResponse>(
            `/user-company/${company!.id}/profile/${role?.id}/included`,
            {
              params: {
                active: status === "A" ? true : false,
                noCurrentUser: true,
              },
            },
          )
          .then(async (res: any) => {
            return res.data?.rows;
          });
        return data;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.data || `Erro ao buscar os usuários`,
          error?.response?.data?.statusCode,
        );
      }
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const useBrokerUsers = ({
  status,
}: {
  status: "A" | "I";
}): ICompanyUsersResponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.userManagement, "broker", status],
    async () => {
      try {
        const { data } = await apiPermission.get<IColaboratorResponse>(
          `/user-company/${company!.id}/profile/6/included`,
          {
            params: {
              active: status === "A" ? true : false,
              noCurrentUser: true,
            },
          },
        );

        return data.rows;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.data || `Erro ao buscar os usuários`,
          error?.response?.data?.statusCode,
        );
      }
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const useUserPermissions = ({
  roleId,
}: IUsePermissionsArgs): IUsePermissionsResponse => {
  const { data, isLoading } = useQuery(
    [keys.userManagement, "permission", roleId],
    async () => {
      try {
        const { data } = await apiPermission.get(
          `profile/${roleId}/permission`,
        );

        return data;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.data || `Erro ao buscar as permissões`,
          error?.response?.data?.statusCode,
        );
      }
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const useUserPermissionsActived = ({
  userId,
  roleId,
}: IUsePermissionsActivedArgs): IUsePermissionsActivedResponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.userManagement, "permissionActived", userId],
    async () => {
      try {
        const { data } = await apiPermission.get(
          `/user/${userId}/company/${
            company!.id
          }/profile/${roleId}/permissions`,
        );

        return data;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message ||
            `Erro ao buscar as permissões ativas do usuário`,
          error?.response?.data?.statusCode,
        );
      }
    },
    {
      staleTime: 0,
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const updateBlockedUser = (): IUpdateBlokedUserResponse => {
  const queryClient = useQueryClient();
  const { company, role } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateBlockedUserArgs) => {
      const payload = {
        active: !data.blocked,
      };

      return await apiPermission.patch(
        `user-company/user/${data.id}/company/${company!.id}/profile/${
          data.userTypeSelected === 2 ? 6 : role!.id
        }`,
        payload,
      );
    },
    {
      onSuccess: (res, variables) => {
        queryClient.invalidateQueries(keys.userManagement);
        useToastStandalone({
          description: `${
            res?.data?.blocked || variables.userTypeSelected !== 0
              ? "Usuário inativado com sucesso!"
              : "Usuário ativado com sucesso!"
          }`,
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const useSavePermissions = ({
  setPermissionsModal,
  roleId,
}: {
  setPermissionsModal: React.Dispatch<React.SetStateAction<boolean>>;
  roleId: string;
}): IUseSavePermissionsResponse => {
  const queryClient = useQueryClient();
  const { company } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async (data: IUserSavePermissionsArgs) => {
      const payload = {
        permissions: data.permissions,
      };

      try {
        return await apiPermission.put(
          `/user/${data.id}/company/${company?.id}/profile/${roleId}/permissions`,
          payload,
        );
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.data,
          error?.response?.data?.statusCode,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.userManagement);
        useToastStandalone({
          description: "Salvo com sucesso!",
        });
        setPermissionsModal(false);
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

export {
  useCompanyUsers,
  useSavePermissions,
  useBrokerUsers,
  updateBlockedUser,
  useUserPermissions,
  useUserPermissionsActived,
};
