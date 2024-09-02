import { useGlobal } from "../../contexts/UserContext";
import { getHost } from "../../utils";
import { Content } from "./styled";

const PoweredByFiibo = () => {
  const { user } = useGlobal();
  const host = getHost();

  const paths = [
    "/login",
    "/alterar-senha",
    "/abrasuaconta",
    "/lead",
    "/recuperar-senha",
    "/primeiro-acesso",
  ];

  return paths.includes(host?.pathname) ? (
    <Content className={`${user ? "logged" : ""}`}>
      powered by<span>&nbsp;Prados&nbsp;</span> &copy; {new Date().getFullYear()}
    </Content>
  ) : (
    <></>
  );
};

export default PoweredByFiibo;
