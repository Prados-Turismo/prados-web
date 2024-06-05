import { chakra, Box } from "@chakra-ui/react";

export const Content = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    flexGrow: 1,
  },
});
