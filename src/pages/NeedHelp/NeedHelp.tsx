import { useEffect } from "react";
import { useTheme } from "@chakra-ui/react";
import { ISidebarNeedHelp } from "../../models/needHelp.model";

// Styles
import { Content } from "./styled";
import NewRequest from "./pages/NewRequest";
import Requests from "./pages/Requests";
import useCompany from "../../hooks/useCompany";

const NeedHelp = ({
  status,
  incorrectBornDateData,
}: Pick<ISidebarNeedHelp, "status" | "incorrectBornDateData">) => {
  const theme = useTheme();
  useCompany();

  useEffect(() => {
    document.title = `${theme.content.project} - Canal de Atendimento`;
  }, [theme]);

  return (
    <Content>
      {["S"].includes(status) && (
        <NewRequest incorrectBornDateData={incorrectBornDateData} />
      )}
      {["A", "E"].includes(status) && <Requests status={status} />}
    </Content>
  );
};

export default NeedHelp;
