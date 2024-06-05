import { INotificationsData } from "../../models/notifications";

export interface IBellNotification {
  notification: INotificationsData;
  onCloseBellNotification: () => void;
  index: number;
  setNotificationsData: React.Dispatch<
    React.SetStateAction<INotificationsData[]>
  >;
}
