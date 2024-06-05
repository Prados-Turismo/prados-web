import ButtonTabbed, { ButtonTabbedWrap } from "../../components/ButtonTabbed";
import {
  ISidebarNotifications,
  ISidebarNotificationsStatus,
} from "../../models/notifications";

interface IItem {
  status: ISidebarNotificationsStatus;
  name: string;
}

const SideBar = ({ status, onStatus }: ISidebarNotifications) => {
  const menuFirst: IItem[] = [
    {
      status: "N" as ISidebarNotificationsStatus,
      name: "Notificações",
    },
  ];

  return (
    <>
      <ButtonTabbedWrap>
        {menuFirst.map((item) => (
          <ButtonTabbed
            key={item.status}
            selected={status === item.status}
            onClick={() => {
              onStatus(item.status);
            }}
          >
            {item.name}
          </ButtonTabbed>
        ))}
      </ButtonTabbedWrap>
    </>
  );
};

export default SideBar;
