import { QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

import { ReactQueryDevtools } from "react-query/devtools";

import { queryClient } from "./services/query";
import { theme } from "./theme";
import { GlobalProvider } from "./contexts/UserContext";
import Fetching from "./components/Fetching/Fetching";
import Routes from "./routes";
import PoweredByFiibo from "./components/PoweredByFiibo";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <GlobalProvider>
          <Fetching />
          <Routes />
          <PoweredByFiibo />
        </GlobalProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
