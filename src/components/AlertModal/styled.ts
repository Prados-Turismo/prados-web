import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const ContentModal = chakra(Box, {
  baseStyle: {
    width: "100%",
    padding: "10px 0",
    textAlign: "center",
    h1: {
      fontSize: pixelToRem(20),
      fontWeight: "600",
      marginTop: "15px",
    },
  },
});

export const ButtonBox = chakra(Box, {
  baseStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px 0 0",

    button: {
      width: "118px",
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

export const BodyContent = chakra(Box, {
  baseStyle: {
    fontSize: pixelToRem(20),
    padding: "20px",
  },
});
