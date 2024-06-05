import { useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithSideTop from "../../Layouts/PageWithSideTop";
import Menu from "../../components/Menu";

import Top from "./components/Top";
import SideBar from "./components/SideBar";
import Section from "./components/Section";

const Collaborator = () => {
  const [status, setStatus] = useState<number>(
    parseInt(window.location.href.split("sidebar=")[1]) || 1,
  );

  return (
    <Dashboard menu={<Menu />}>
      <PageWithSideTop
        top={<Top />}
        aside={<SideBar status={status} onStatus={setStatus} />}
        section={<Section menu={status} setStatusSideBar={setStatus} />}
      />
    </Dashboard>
  );
};

export default Collaborator;
