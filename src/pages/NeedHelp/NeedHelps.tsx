import { useEffect, useMemo, useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithTabbed from "../../Layouts/PageWithTabbed";
import Menu from "../../components/Menu";

import SideBar from "./SideBar";
import NeedHelp from "./NeedHelp";

import { ISidebarNeedHelpStatus } from "../../models/needHelp.model";
import { useSearchParams } from "react-router-dom";
import { IIncorrectBornDateData } from "./need-help";

const NeedHelps = () => {
  const [searchParams] = useSearchParams();

  const incorrectBornDate: IIncorrectBornDateData | undefined = useMemo(() => {
    const cpf = searchParams.get("incorrectBornDate");

    return cpf
      ? {
          message: `Estou tentando cadastrar um novo colaborador com o CPF ${cpf}, mas a data de nascimento está incorreta. Em anexo, envio o documento com foto oficial para comprovar os dados corretos.`,
        }
      : undefined;
  }, [searchParams]);

  const statusParam = useMemo(() => {
    return searchParams.get("status") || "";
  }, [searchParams]);
  const [status, setStatus] = useState<ISidebarNeedHelpStatus>(
    incorrectBornDate
      ? ("S" as ISidebarNeedHelpStatus)
      : ("A" as ISidebarNeedHelpStatus),
  );

  useEffect(() => {
    if (incorrectBornDate) setStatus("S" as ISidebarNeedHelpStatus);
  }, [incorrectBornDate]);

  useEffect(() => {
    if (statusParam) {
      setStatus(statusParam as ISidebarNeedHelpStatus);
    }
  }, [statusParam]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithTabbed
        title="Canal de Atendimento"
        aside={<SideBar status={status} onStatus={setStatus} />}
        article={
          <NeedHelp status={status} incorrectBornDateData={incorrectBornDate} />
        }
      />
    </Dashboard>
  );
};

export default NeedHelps;
