import { useEffect, useState } from "react";

import Dashboard from "../../../../Layouts/Dashboard";
import PageWithMenu from "../../../../Layouts/PageWithMenu";
import Menu from "../../../../components/Menu";

import Section from "../Voucher/components/Section";

import { IStatus } from "../../../../models/sidebar.model";
import { theme } from "../../../../theme";
import { useLocation } from "react-router-dom";
import SideBar from "../Voucher/components/SideBar"

const Voucher = () => {
  const location = useLocation();
  const menuBack =
    parseInt(window.location.href?.split("menu=")[1]?.split("?")[0]) || null;
  const [status, setStatus] = useState<IStatus>({
    title: "Voucher",
    menu: menuBack || 1,
  });

  useEffect(() => {
    document.title = `${theme.content.project} - Voucher`;

    const menuPath = parseInt(
      location.search?.split("menu=")[1]?.split("?")[0],
    );

    if (location?.search) {
      setStatus({
        title: "Voucher",
        menu: menuPath,
      });
    }
  }, [location.search]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        section={<Section menu={status.menu} />}
        aside={<SideBar status={status} onStatus={setStatus} />}
      />
    </Dashboard>
  );
};

export default Voucher;
