import { useEffect, useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithMenu from "../../Layouts/PageWithMenu";
import Menu from "../../components/Menu";

import Section from "./components/Section";

import { IStatus } from "../../models/sidebar.model";
import { theme } from "../../theme";
import { useLocation } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import useTransacao from "../../hooks/useTransacao";
import { ISelect } from "../../models/generics.model";

const RelatorioCategorias = () => {
  const location = useLocation();
  const { getTransacoesCategorias } = useTransacao();

  const [currentPage, setCurrentPage] = useState(1);
  const [codigoCategoria, setCategoria] = useState<ISelect | null>(null);
  const [codigoSubCategoria, setSubCategoria] = useState<ISelect | null>(null);
  const [dataTransacao, setDataTransacao] = useState('')

  const menuBack =
    parseInt(window.location.href?.split("menu=")[1]?.split("?")[0]) || null;
  const [status, setStatus] = useState<IStatus>({
    title: "Transações",
    menu: menuBack || 1,
  });

  const registerPerPage = 10;
  const categoriasResponse = getTransacoesCategorias({
    size: registerPerPage,
    page: 1,
    dataTransacao,
    codigoCategoria: codigoCategoria?.value as string,
    codigoSubCategoria: codigoSubCategoria?.value as string
  });

  useEffect(() => {
    document.title = `${theme.content.project} - Transações`;

    const menuPath = parseInt(
      location.search?.split("menu=")[1]?.split("?")[0],
    );

    if (location?.search) {
      setStatus({
        title: "Transações",
        menu: menuPath,
      });
    }
  }, [location.search]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        aside={
          <SideBar
            status={status}
            onStatus={setStatus}
            {...{
              categoriasResponse
            }}
          />
        }
        section={
          <Section
            menu={status.menu}
            {...{
              categoriasResponse,
              currentPage,
              setCurrentPage,
              codigoCategoria,
              setCategoria,
              codigoSubCategoria,
              setSubCategoria,
              dataTransacao,
              setDataTransacao
            }}
          />
        }
      />
    </Dashboard>
  );
};

export default RelatorioCategorias;
