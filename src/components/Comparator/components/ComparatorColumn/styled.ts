import { chakra, Flex } from "@chakra-ui/react";

export const ComparatorColumnContent = chakra(Flex, {
  baseStyle: {
    flexDir: "column",
    alignItems: "center",
  },
});
