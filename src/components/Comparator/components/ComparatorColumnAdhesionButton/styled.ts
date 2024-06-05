import { chakra, Flex } from "@chakra-ui/react";

export const ComparatorColumnAdhesionBox = chakra(Flex, {
  baseStyle: {
    h: "72px",
    minH: "72px",
    minW: "300px",
    w: "300px",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0 0",
    borderTop: "1px solid #E5E5E5",
    borderBottom: "1px solid #E5E5E5",
  },
});
