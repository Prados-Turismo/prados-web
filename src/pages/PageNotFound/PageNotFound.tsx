import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import searchBackground from "../../assets/search-background.svg";
import Menu from "../../components/Menu";
import Dashboard from "../../Layouts/Dashboard";

const PageNotFound = () => {
  const [more900] = useMediaQuery("(min-width: 900px)");

  return (
    <Dashboard menu={<Menu />}>
      <Box
        as="section"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        margin="auto 0"
        padding={more900 ? "0 200px" : "0 20px"}
      >
        <Box
          as="article"
          display="flex"
          flexDirection="column"
          gap="15px"
          width="100%"
          maxWidth="870px"
          color="#13130F"
          fontSize="18px"
        >
          <Text color="#707070" fontWeight="bold">
            404 erro
          </Text>
          <Text fontSize={more900 ? "3rem" : "1.5rem"} fontWeight="bold">
            Página não encontrada...
          </Text>
          <Text color="#707070">
            Lamentamos, não foi possível encontrar essa página. O link que você
            tentou acessar pode estar incorreto ou a página não está mais
            disponível.
          </Text>

          <Link to="/">
            <Button marginTop="15px">Início</Button>
          </Link>
        </Box>

        {more900 && <img src={searchBackground} alt="Busca" />}
      </Box>
    </Dashboard>
  );
};

export default PageNotFound;
