import { useEffect, useState } from "react";

import Dashboard from "../../../../Layouts/Dashboard";
import PageWithoutMenu from "../../../../Layouts/PageWithoutMenu";
import Menu from "../../../../components/Menu";

import Section from "./components/Section";

import { IStatus } from "../../../../models/sidebar.model";
import { theme } from "../../../../theme";
import { useLocation } from "react-router-dom";

const Ticket = () => {
  const location = useLocation();
  const menuBack =
    parseInt(window.location.href?.split("menu=")[1]?.split("?")[0]) || null;
  const [status, setStatus] = useState<IStatus>({
    title: "Ticket",
    menu: menuBack || 1,
  });

  useEffect(() => {
    document.title = `${theme.content.project} - Ticket`;

    const menuPath = parseInt(
      location.search?.split("menu=")[1]?.split("?")[0],
    );

    if (location?.search) {
      setStatus({
        title: "Ticket",
        menu: menuPath,
      });
    }
  }, [location.search]);

  return (
    <PageWithoutMenu
      title="Ticket"
      article={<Section menu={status.menu} />}
    />
  );
};

export default Ticket;
