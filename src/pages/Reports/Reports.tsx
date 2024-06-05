import { useEffect, useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithTabbed from "../../Layouts/PageWithTabbed";
import Menu from "../../components/Menu";

import SideBar from "./SideBar";
import Report from "./Report";

import { ISidebarReportStatus } from "../../models/report.model";
import { useLocation } from "react-router-dom";

const Reports = () => {
  const location = useLocation();
  const [status, setStatus] = useState<ISidebarReportStatus>(
    "A" as ISidebarReportStatus,
  );

  useEffect(() => {
    const menu = location?.search?.split("menu=")[1];

    if (menu) {
      setStatus(menu as ISidebarReportStatus);
    }
  }, [location?.search]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithTabbed
        title="Movimentações"
        aside={<SideBar status={status} onStatus={setStatus} />}
        article={<Report status={status} />}
      />
    </Dashboard>
  );
};

export default Reports;
