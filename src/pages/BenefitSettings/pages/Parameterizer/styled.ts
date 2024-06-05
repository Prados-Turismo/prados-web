import { chakra, Box } from "@chakra-ui/react";

export const Content = chakra(Box, {
  baseStyle: {
    height: "100%",
    "&.isLoading": {
      paddingTop: "100px",
    },

    ".benefitTD:hover": {
      color: "brand.500",
      cursor: "pointer",
    },
  },
});
