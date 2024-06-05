import { useEffect } from "react";
import { useTheme } from "@chakra-ui/react";

import Dashboard from "../../Layouts/Dashboard";
import Menu from "../../components/Menu";
import { ModalPrivacyPolicy } from "../../components/ModalPrivacyPolicy";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../contexts/UserContext";

const PrivacyPolicy = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useGlobal();

  useEffect(() => {
    document.title = `${theme.content.project} - Política e Privacidade`;

    if (user && user?.termsOfPrivacy) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, user]);

  return (
    <>
      <Dashboard menu={<Menu />}>
        {user && !user?.termsOfPrivacy && <ModalPrivacyPolicy />}
      </Dashboard>
    </>
  );
};

export default PrivacyPolicy;
