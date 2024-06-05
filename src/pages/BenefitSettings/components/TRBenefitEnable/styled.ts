import { chakra, Box, Checkbox as CheckboxUI } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

export const Checkbox = chakra(CheckboxUI, {
  baseStyle: {
    background: "#F9F9F9",

    span: {
      border: "1px solid",
      borderColor: "#909090",
    },
    "span[data-checked], span[data-checked][data-hover], span[data-checked]:hover":
      {
        background: "brand.500",
        borderColor: "brand.500",
        color: "contrast",
      },
  },
});

export const ContentModal = chakra(Box, {
  baseStyle: {
    padding: "50px",
    textAlign: "center",
    h1: {
      fontSize: pixelToRem(20),
      fontWeight: "600",
    },
  },
});

export const InfoIcon = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    padding: "0 0 20px",
    svg: {
      fill: "brand.500",
    },
  },
});
