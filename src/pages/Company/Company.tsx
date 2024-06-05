import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@chakra-ui/react";
import { FaRegIdCard } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";

import Dashboard from "../../Layouts/Dashboard";
import PageWithMenu from "../../Layouts/PageWithMenu";
import Menu from "../../components/Menu";

import { useGlobal } from "../../contexts/UserContext";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

export interface Button {
  key: "DADOS_CADASTRAIS" | "DOCUMENTOS" | "SETORES_E_CARGOS";
  icon: React.ReactNode;
  title: string;
  active: boolean;
  isVisible: boolean;
}

export default function Company() {
  const theme = useTheme();
  const { isIssuer } = useGlobal();

  const [activeButton, setActiveButton] =
    useState<Button["key"]>("DADOS_CADASTRAIS");

  const buttons = useMemo<Button[]>(
    () => [
      {
        key: "DADOS_CADASTRAIS",
        icon: <FiUserCheck />,
        title: "Dados Cadastrais",
        active: activeButton === "DADOS_CADASTRAIS",
        isVisible: true,
      },
      {
        key: "SETORES_E_CARGOS",
        icon: <FaRegIdCard />,
        title: "Categorias e Subcategorias",
        active: activeButton === "SETORES_E_CARGOS",
        isVisible: !isIssuer,
      },
    ],
    [activeButton, isIssuer],
  );

  const onClickButton = (button: Button) => {
    setActiveButton(button.key);
  };

  useEffect(() => {
    document.title = `${theme.content.project} - Dados da Empresa`;
  }, [theme]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        aside={<Sidebar buttons={buttons} onClickButton={onClickButton} />}
        section={<Content activeButton={activeButton} />}
      ></PageWithMenu>
    </Dashboard>
  );
}
