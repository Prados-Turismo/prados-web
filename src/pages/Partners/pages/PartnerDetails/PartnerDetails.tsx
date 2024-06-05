import { useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Dashboard from "../../../../Layouts/Dashboard";
import PageWithMenu from "../../../../Layouts/PageWithMenu";
import Menu from "../../../../components/Menu";
import { IStatus } from "../../../../models/sidebar.model";
import Section from "./components/Section";
import SideBar from "./components/Sidebar/SideBar";

const PartnersDetails = () => {
  const theme = useTheme();
  const [status, setStatus] = useState<IStatus>({
    title: "Prestadores de Serviços",
    menu: 1,
  });

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

export default PartnersDetails;
