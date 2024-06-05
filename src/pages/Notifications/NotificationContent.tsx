import { Content } from "./styled";
import { ISidebarNotifications } from "../../models/notifications";
import NotificationsList from "./pages/NotificationsList";

const NotificationContent = ({
  status,
}: Pick<ISidebarNotifications, "status">) => {
  return <Content>{["N"].includes(status) && <NotificationsList />}</Content>;
};

export default NotificationContent;
