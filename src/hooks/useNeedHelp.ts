/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";

import { apiRecord, apiSupport } from "../services/api";
import { keys, queryClient } from "../services/query";

// Types
import {
  ICancelRequest,
  IDataTopic,
  IMessageArgs,
  IMessageResponse,
  INeedHelpArgs,
  INeedHelpResponse,
  ISupportNotificationMessage,
  ISupportNotificationsResponse,
  ISubmitIndicateProduct,
  ISubmitRequest,
  ITopicResponse,
  IUseNeedHelp,
} from "../models/needHelp.model";
import { useState } from "react";
import { useToastStandalone } from "./useToastStandalone";
import { Warning } from "../errors";
import { useGlobal } from "../contexts/UserContext";

const getNeedHelp = ({
  currentPage,
  pageSize,
  status,
  company,
  selectedRole,
}: INeedHelpArgs): INeedHelpResponse => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    [keys.needHelp, status, currentPage],
    async () => {
      try {
        const { data } = await apiSupport.get(
          `/calls/${selectedRole}/${company}?page=${currentPage}&size=${pageSize}${
            status === "E"
              ? `&status=closed`
              : "&status=pending&status=answered"
          }`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar solicitações",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading: isFetching || isLoading,
    refetch,
  };
};

const getMessageChat = ({
  currentPage,
  selectedRole,
  callId,
}: IMessageArgs): IMessageResponse => {
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading } = useQuery(
    [keys.message, selectedRole, currentPage, callId],
    async () => {
      try {
        const { data } = await apiSupport.get(
          `/calls/${callId}?page=1&size=200`,
        );

        const messages = data.rows.map((message: any) => message.id);
        await apiSupport
          .put(`/calls/notifications/messages`, {
            messagesId: messages,
          })
          .then(() => {
            queryClient.invalidateQueries(keys.supportNotifications);
            queryClient.fetchQuery(keys.supportNotifications);
          });

        return data.rows;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar as mensagens",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data || [],
    hasMore,
    isLoading,
  };
};

const getTopic = (role: string): ITopicResponse => {
  const { data, isLoading } = useQuery([keys.topics], async () => {
    try {
      const selectedRole =
        role === "3" ? "beneficiary" : role === "6" ? "brokerAgent" : "company";

      const { data } = await apiSupport.get<{
        count: number;
        rows: IDataTopic[];
      }>(`/call-reasons?enviroment=${selectedRole}&page=1&size=100`);

      return [
        ...data.rows.filter((el: IDataTopic) => el.name !== "Outros"),
        data.rows.filter((el: IDataTopic) => el.name === "Outros")[0],
      ];
    } catch (_error: any) {
      throw new Warning("Erro ao listar os assuntos", _error?.response?.status);
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

const getSupportNotifications = (
  role: string,
): ISupportNotificationsResponse => {
  const { company } = useGlobal();
  if (company?.externalCompanyId) {
    const selectedRole =
      role === "3" ? "beneficiary" : role === "6" ? "brokerAgent" : "company";
    const { isLoading, data } = useQuery(
      [keys.supportNotifications],
      async () => {
        try {
          const { data } = await apiSupport.get<ISupportNotificationMessage[]>(
            `/calls/notifications/unread/${company!.externalCompanyId}`,
            {
              params: {
                enviroment: selectedRole,
              },
            },
          );

          return data;
        } catch (error: any) {
          throw new Warning(
            "Erro ao buscar as notificações",
            error?.response?.status,
          );
        }
      },
    );

    return {
      isLoading,
      data: data || [],
    };
  } else {
    return {
      isLoading: false,
      data: [],
    };
  }
};

const handleCancelRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cancelRequest = async ({
    requestId,
    solverUser,
    solverUserName,
    notificationId,
  }: ICancelRequest) => {
    setIsLoading(true);
    const data = {
      solverUser,
      solverUserName,
    };

    await apiSupport
      .put(`/calls/${requestId}`, data)
      .then(async () => {
        await apiSupport
          .put(`/calls/notifications/messages`, {
            messagesId: notificationId,
          })
          .then(() => {
            queryClient.invalidateQueries(keys.supportNotifications);
            queryClient.fetchQuery(keys.supportNotifications);
            queryClient.invalidateQueries(keys.notifications);
            queryClient.fetchQuery(keys.notifications);
          });
        queryClient.invalidateQueries([keys.needHelp]);
        queryClient.fetchQuery([keys.needHelp]);
        useToastStandalone({
          title: "Solicitação encerrada com sucesso!",
          status: "success",
        });
      })
      .catch((err) => {
        useToastStandalone({
          title: "Não foi possível encerrar a solicitação!",
          description: `${err?.response?.data?.message || ""}`,
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    cancelRequest,
    isLoading,
  };
};

const handleSubmitRequest = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const submitRequest = async ({ data, role, companyId }: ISubmitRequest) => {
    setIsLoadingSubmit(true);

    const selectedRole =
      role === "3"
        ? "beneficiaries"
        : role === "6"
        ? "broker-agents"
        : "companies";

    await apiSupport
      .post(`/calls/${selectedRole}/${companyId}`, data)
      .then(async (res) => {
        queryClient.invalidateQueries([keys.needHelp, "A"]);
        queryClient.fetchQuery([keys.needHelp, "A"]);
        queryClient.invalidateQueries(keys.notifications);
        queryClient.fetchQuery(keys.notifications);
        useToastStandalone({
          title: "Chamado aberto!",
          description: `${res?.data?.message}, você receberá uma resposta em até 48h.`,
          status: "success",
          duration: 10000,
        });
      })
      .catch((err) => {
        useToastStandalone({
          title: "Não foi possível enviar a solicitação!",
          description: `${err?.response?.data?.message || ""}`,
          status: "error",
        });
      })
      .finally(() => {
        setIsLoadingSubmit(false);
      });
  };

  return {
    submitRequest,
    isLoadingSubmit,
  };
};

const handleSubmitIndicatProduct = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { role, company } = useGlobal();

  const submitRequest = async ({ data }: ISubmitIndicateProduct) => {
    setIsLoadingSubmit(true);

    const selectedRole =
      role!.id === "3"
        ? "beneficiaries"
        : role!.id === "6"
        ? "broker-agents"
        : "companies";

    await apiSupport
      .post(`/calls/${selectedRole}/${company?.externalCompanyId}`, data)
      .then(async () => {
        setIsSuccess(true);
        queryClient.invalidateQueries([keys.needHelp, "A"]);
        queryClient.fetchQuery([keys.needHelp, "A"]);
        queryClient.invalidateQueries(keys.notifications);
        queryClient.fetchQuery(keys.notifications);
      })
      .catch((err) => {
        setIsSuccess(false);
        useToastStandalone({
          title: "Não foi possível enviar a solicitação!",
          description: `${err?.response?.data?.message || ""}`,
          status: "error",
        });
      })
      .finally(() => {
        setIsLoadingSubmit(false);
      });
  };

  return {
    submitRequest,
    isLoadingSubmit,
    isSuccess,
  };
};

const handleDownloadDocument = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const downloadDocument = (id: number) => {
    setIsloading(true);
    apiRecord
      .get(`/chamados/download/mensagens/${id}`)
      .then((res) => {
        if (res?.data?.url.length > 0) {
          window.open(`${res?.data?.url}`, "_self");
        } else {
          useToastStandalone({
            title: "Documento não encontrado!",
            status: "error",
          });
        }
      })
      .catch((err) => {
        useToastStandalone({
          title: "Não foi possível fazer o download!",
          description: `${err?.response?.data?.data}`,
          status: "error",
        });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return {
    downloadDocument,
    isLoading,
  };
};

const handleShareCall = async (callId: string, shared: boolean) => {
  return apiSupport.patch(`/calls/shared/${callId}`, {
    shared,
  });
};

export default function useNeedHelp(): IUseNeedHelp {
  return {
    getNeedHelp,
    getTopic,
    handleCancelRequest,
    handleSubmitRequest,
    handleSubmitIndicatProduct,
    handleDownloadDocument,
    getSupportNotifications,
    getMessageChat,
    handleShareCall,
  };
}
