import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const FieldWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: "35px",

    a: {
      fontSize: pixelToRem(16),
      display: "inline",
      color: "brand.600",
      lineHeight: "14px",
      borderBottom: "1px solid",
      borderBottomColor: "brand.600",

      "&.firstAccess": {
        fontSize: pixelToRem(18),
      },

      "&.getFiibo": {
        color: "text.first",
        borderBottomColor: "text.first",
      },
    },

    button: {
      fontWeight: 500,
      padding: "0 60px",
    },
  },
});

export const Logo = chakra(Box, {
  baseStyle: {
    width: "250px",
    height: "90px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    textIndent: "-99999px",
    margin: "0 auto",
  },
});

export const Form = chakra("form", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "32px",
    gap: "40px",

    ".title": {
      fontSize: pixelToRem(20),
      fontWeight: 500,
      color: "text.second",
    },

    ".fieldsWrap": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      textAlign: "right",
    },
  },
});
