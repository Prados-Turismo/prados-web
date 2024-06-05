import { chakra, Flex } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

export const ComparatorColumnDetailsContent = chakra(Flex, {
  baseStyle: {
    padding: "15px 0 5px",
    margin: "15px 35px 0",
    borderTop: "1px solid #E5E5E5",
  },
});

export const ComparatorColumnDetailsTitle = chakra(Flex, {
  baseStyle: {
    flexDir: "column",
    fontWeight: 500,
    gap: "10px",
    minW: "195px",
    w: "195px",

    span: {
      fontSize: pixelToRem(14),
    },
  },
});
