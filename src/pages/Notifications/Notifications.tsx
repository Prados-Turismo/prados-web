import { useEffect, useState } from "react";
import Dashboard from "../../Layouts/Dashboard";
import PageWithTabbed from "../../Layouts/PageWithTabbed";
import Menu from "../../components/Menu";
import { useTheme } from "@chakra-ui/react";
import { ISidebarNotificationsStatus } from "../../models/notifications";
import NotificationContent from "./NotificationContent";

const Notifications = () => {
  const theme = useTheme();
  const [status, setStatus] = useState<ISidebarNotificationsStatus>(
    "N" as ISidebarNotificationsStatus,
  );

  useEffect(() => {
    document.title = `${theme.content.project} - Notificações`;
  }, [theme]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithTabbed
        title="Notificações"
        // aside={<SideBar status={status} onStatus={setStatus} />}
        aside={<></>}
        article={<NotificationContent status={status} />}
      />
    </Dashboard>
  );
};

export default Notifications;
