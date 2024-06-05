import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const FieldWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "35px",

    a: {
      fontSize: pixelToRem(16),
      display: "inline",
      color: "text.first",
      lineHeight: "14px",
      borderBottom: "1px solid",
      borderBottomColor: "text.first",
    },

    button: {
      fontWeight: 500,
      padding: "0 60px",
    },
  },
});

export const Logo = chakra(Box, {
  baseStyle: {
    width: "170px",
    height: "70px",
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
    background: "#FFFFFF",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "32px",
    gap: "40px",

    h3: {
      fontSize: pixelToRem(20),
      fontWeight: 500,
      color: "text.second",
      textAlign: "center",
    },

    ".fieldsWrap": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  },
});
