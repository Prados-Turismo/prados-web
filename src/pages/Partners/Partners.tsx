import { useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithMenu from "../../Layouts/PageWithMenu";
import Menu from "../../components/Menu";

import Section from "./components/Section";
import SideBar from "./components/Sidebar";

import { IStatus } from "../../models/sidebar.model";

const Partners = () => {
  const [status, setStatus] = useState<IStatus>({
    title: "Prestadores de Serviços",
    menu: window.location.href.split("menu=")[1] === "2" ? 2 : 1,
  });

  const theme = useTheme();

  useEffect(() => {
    document.title = `${theme.content.project} - Prestadores de Serviços`;
  }, [theme]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        aside={<SideBar status={status} onStatus={setStatus} />}
        section={<Section menu={status.menu} />}
      />
    </Dashboard>
  );
};

export default Partners;
