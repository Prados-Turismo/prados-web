import {
  useTheme,
} from "@chakra-ui/react";
import { useEffect } from "react";

import Dashboard from "../../Layouts/Dashboard";
import Menu from "../../components/Menu";

const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    document.title = `${theme.content.project} - Home`;
  }, [theme]);

  return (
    <Dashboard menu={<Menu onBoardingCompleted={true} />}>
      <></>
    </Dashboard>
  );
};

export default Home;
