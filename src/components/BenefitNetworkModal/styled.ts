import { chakra, Box } from "@chakra-ui/react";

export const ModalContent = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    ".title": {
      height: "50px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "30px",
      borderBottom: "1px solid #E5E5E5",
      fontSize: "14px",
      fontWeight: "bold",
      margin: 0,
    },

    ".details": {
      display: "flex",
      padding: "24px",
      columnGap: "24px",
      color: "#1F1F1F",

      ".linkMarkdown": {
        maxW: "950px",
        a: {
          textDecoration: "underline",
          color: "#0075bf",
        },
      },

      "h1, h4": {
        fontWeight: 600,
        margin: "0 0 10px",
      },

      p: {
        margin: "10px 0",
      },
    },
  },
});
