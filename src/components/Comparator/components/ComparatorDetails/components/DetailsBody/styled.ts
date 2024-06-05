import { chakra, Flex } from "@chakra-ui/react";
import { pixelToRem } from "../../../../../../utils";

export const ComparatorColumnDetailsBody = chakra(Flex, {
  baseStyle: {
    flexDir: "column",
    gap: "10px",
    minW: "300px",
    w: "300px",
    alignContent: "center",
    maxHeight: "200px",
    overflow: "auto",

    "span, p": {
      textAlign: "center",
      fontSize: pixelToRem(14),
    },

    "span p": {
      padding: "0 5px",
    },
  },
});
