import { chakra, Box } from "@chakra-ui/react";

export const SelectContent = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    flexWrap: {
      base: "wrap",
    },
    gap: "16px",
  },
});
