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

const RelatorioFornecedor = () => {
  const location = useLocation();
  const { getTransacoesFornecedores } = useTransacao();

  const [currentPage, setCurrentPage] = useState(1);
  const [codigoFornecedor, setFornecedor] = useState<ISelect | null>(null);
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')

  const menuBack =
    parseInt(window.location.href?.split("menu=")[1]?.split("?")[0]) || null;
  const [status, setStatus] = useState<IStatus>({
    title: "Relatório de Fornecedores",
    menu: menuBack || 1,
  });

  const registerPerPage = 10;
  const fornecedorResponse = getTransacoesFornecedores({
    size: registerPerPage,
    page: 1,
    dataInicio,
    dataFim,
    codigoFornecedor: codigoFornecedor?.value as string
  });

  useEffect(() => {
    document.title = `${theme.content.project} - Relatório de Fornecedores`;

    const menuPath = parseInt(
      location.search?.split("menu=")[1]?.split("?")[0],
    );

    if (location?.search) {
      setStatus({
        title: "Relatório de Fornecedores",
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
              fornecedorResponse
            }}
          />
        }
        section={
          <Section
            menu={status.menu}
            {...{
              fornecedorResponse,
              currentPage,
              setCurrentPage,
              codigoFornecedor,
              setFornecedor,
              dataInicio,
              setDataInicio,
              dataFim,
              setDataFim
            }}
          />
        }
      />
    </Dashboard>
  );
};

export default RelatorioFornecedor;
