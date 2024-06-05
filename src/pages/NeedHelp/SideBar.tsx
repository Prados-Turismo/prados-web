import { Box } from "@chakra-ui/layout";
import ButtonTabbed, { ButtonTabbedWrap } from "../../components/ButtonTabbed";

import {
  ISidebarNeedHelp,
  ISidebarNeedHelpStatus,
} from "../../models/needHelp.model";
import useNeedHelp from "../../hooks/useNeedHelp";
import { useGlobal } from "../../contexts/UserContext";

interface IItem {
  status: ISidebarNeedHelpStatus;
  name: string;
}

const SideBar = ({ status, onStatus }: ISidebarNeedHelp) => {
  const menuFirst: IItem[] = [
    {
      status: "S" as ISidebarNeedHelpStatus,
      name: "Nova Solicitação",
    },
    {
      status: "A" as ISidebarNeedHelpStatus,
      name: "Solicitações em Andamento",
    },
    {
      status: "E" as ISidebarNeedHelpStatus,
      name: "Solicitações Encerradas",
    },
  ];

  const { role } = useGlobal();

  const { getSupportNotifications } = useNeedHelp();
  const { data: notifications } = getSupportNotifications(role?.id as string);

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
            {item.status === "A" && notifications.length > 0 && (
              <Box
                position="absolute"
                width="18px"
                height="18px"
                top="3px"
                right="4px"
                background="brand.500"
                borderRadius="100%"
                color="#FFF"
                fontSize="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop="2px"
              >
                {notifications.length}
              </Box>
            )}
            {item.name}
          </ButtonTabbed>
        ))}
      </ButtonTabbedWrap>
    </>
  );
};

export default SideBar;
