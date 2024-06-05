import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_SUBJECT,
} from "../utils/enumFormat";

export enum ISidebarNotificationsStatus {
  N = "notifications",
}

export interface ISidebarNotifications {
  status: ISidebarNotificationsStatus;
  onStatus: (status: ISidebarNotificationsStatus) => void;
}

type NotificationCategoryKey = keyof typeof NOTIFICATION_CATEGORY;
type NotificationSubjectKey = keyof typeof NOTIFICATION_SUBJECT;

export interface INotificationsData {
  id: string;
  category: NotificationCategoryKey;
  subject: NotificationSubjectKey;
  message: string;
  companyId: string;
  batchInvoiceId: string;
  callProtocol: string;
  callStatus: string;
  beneficiaryId: string;
  partnerId: string;
  adherenceStatus: string;
  adherenceProposalId: string;
  read: boolean;
  createdAt: string;
}

export interface IGetNotificationsResponse {
  data: INotificationsData[];
  count: number;
  read: number;
  isLoading: boolean;
  isRefetching: boolean;
  setTextFilter: React.Dispatch<React.SetStateAction<string | null>>;
  setCategoryFilter: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    } | null>
  >;
  categoryFilter: {
    label: string;
    value: string;
  } | null;
}

export interface IReadNotificationReponse {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      read: boolean;
      notificationsIds: string[];
    },
    unknown
  >;
}

export interface IGetNotificationsArgs {
  size: number;
  page: number;
}

export interface IUseNotifications {
  getNotifications: (args: IGetNotificationsArgs) => IGetNotificationsResponse;
  readNotification: () => IReadNotificationReponse;
}
