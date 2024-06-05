import { useEffect, useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithMenu from "../../Layouts/PageWithMenu";
import Menu from "../../components/Menu";

import SideBar from "./components/Sidebar";
import Section from "./components/Section";

import { IStatus } from "../../models/sidebar.model";
import { theme } from "../../theme";
import { useLocation } from "react-router-dom";

const Collaborator = () => {
  const location = useLocation();
  const [status, setStatus] = useState<IStatus>({
    title: "Área Financeira",
    menu: 1,
  });

  useEffect(() => {
    document.title = `${theme.content.project} - Área Financeira`;

    const menu = Number(location?.search?.split("menu=")[1]);

    if (menu) {
      setStatus({
        title: "Área Financeira",
        menu: menu,
      });
    }
  }, [location]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        aside={<SideBar status={status} onStatus={setStatus} />}
        section={<Section menu={status.menu} />}
      />
    </Dashboard>
  );
};

export default Collaborator;
