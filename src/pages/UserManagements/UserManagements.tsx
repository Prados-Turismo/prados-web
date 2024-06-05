import { useEffect, useState } from "react";
import { useTheme } from "@chakra-ui/react";
import Dashboard from "../../Layouts/Dashboard";
import Menu from "../../components/Menu";
import PageWithTabbed from "../../Layouts/PageWithTabbed";
import { IReactSelected, ISidebarUserManagementStatus } from "./types";
import SideBar from "./SideBar";
import UserManagement from "./pages/UserManagement";
import { useCompanyUsers, useBrokerUsers } from "../../hooks/useUserManagement";

const UserManagements = () => {
  const theme = useTheme();

  const [status, setStatus] = useState<ISidebarUserManagementStatus>(
    "A" as ISidebarUserManagementStatus,
  );

  const [userTypeSelected, setUserTypeSelected] = useState<IReactSelected>({
    label: "Usuários Conta Empresarial",
    value: 0,
  });

  const usersData =
    userTypeSelected.value === 0
      ? useCompanyUsers({ status })
      : useBrokerUsers({ status });

  useEffect(() => {
    document.title = `${theme.content.project} - Gestão de Usuários`;
  }, [theme]);

  return (
    <>
      <Dashboard menu={<Menu />}>
        <PageWithTabbed
          title="Gestão de Usuários"
          aside={
            <SideBar
              status={status}
              onStatus={setStatus}
              setUserTypeSelected={setUserTypeSelected}
              userTypeSelected={userTypeSelected}
              setStatus={setStatus}
            />
          }
          article={
            <UserManagement
              status={status}
              usersData={usersData}
              userTypeSelected={userTypeSelected}
            />
          }
        />
      </Dashboard>
    </>
  );
};

export default UserManagements;
