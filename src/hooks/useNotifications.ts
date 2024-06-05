/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { keys } from "../services/query";
import { useGlobal } from "../contexts/UserContext";
import {
  IGetNotificationsArgs,
  IGetNotificationsResponse,
  IReadNotificationReponse,
  IUseNotifications,
} from "../models/notifications";
import { apiRecord } from "../services/api";
import { Warning } from "../errors";
import { useState } from "react";

const getNotifications = ({
  size,
  page,
}: IGetNotificationsArgs): IGetNotificationsResponse => {
  const { user, role } = useGlobal();
  const [textFilter, setTextFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const { data, isLoading, isRefetching } = useQuery(
    [keys.notifications, user?.id, role?.id, page, textFilter, categoryFilter],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/platform-notification/user/${user?.id}/profile/${role?.id}?page=${page}&size=${size}`,
          {
            params: {
              textFilter,
              categoryFilter: categoryFilter?.value,
            },
          },
        );

        return data;
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    read: data?.read,
    isLoading,
    isRefetching,
    setTextFilter,
    setCategoryFilter,
    categoryFilter,
  };
};

const readNotification = (): IReadNotificationReponse => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: { read: boolean; notificationsIds: string[] }) => {
      try {
        const payload = {
          read: data?.read,
          ids: data?.notificationsIds,
        };
        await apiRecord.put(`/platform-notification`, payload);
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.notifications]);
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

export default function useNotifications(): IUseNotifications {
  return {
    getNotifications,
    readNotification,
  };
}
