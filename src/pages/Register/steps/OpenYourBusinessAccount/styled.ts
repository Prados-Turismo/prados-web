import { chakra, Text } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

export const CheckBoxTitle = chakra(Text, {
  baseStyle: {
    fontSize: pixelToRem(14),
    color: "#707070",

    span: {
      textDecoration: "underline",
      cursor: "pointer",
      margin: "0 6px",
      fontSize: pixelToRem(14),
    },
  },
});
