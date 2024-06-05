import { chakra, Flex } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

export const ComparatorHeaderContent = chakra(Flex, {
  baseStyle: {
    position: "relative",
    flexDir: "column",
    alignItems: "center",
    borderBottom: "1px solid #E5E5E5",
    padding: "0 0 10px 0",
    height: "105px",
    minHeight: "105px",
    minW: "195px",
    w: "300px",

    ".title": {
      maxW: "131px",
      w: "max-content",
      textAlign: "center",
      fontSize: pixelToRem(13),

      span: {
        fontSize: pixelToRem(13),
      },
    },
  },
});
