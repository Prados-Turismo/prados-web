import { chakra, Box } from "@chakra-ui/react";

export const Section = chakra(Box, {
  baseStyle: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: {
      base: "column",
      md: "row",
    },
    gap: "15px",
    padding: "0 15px",

    ".contentTop": {
      width: "100%",
      height: "90px",
      minHeight: "90px",
      display: "flex",
      alignItems: "end",
      margin: "40px 0 10px",
    },

    ".contentMain": {
      width: "100%",
      // height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      padding: "15px",
      border: "1px solid #E5E5E5",
      borderRadius: {
        base: "4px",
        md: "4px 4px 0 0",
      },
      // borderBottom: {
      //   md: "none"
      // }
    },
  },
});

export const Aside = chakra(Box, {
  baseStyle: {
    width: "100%",
    maxWidth: {
      md: "500px",
    },
    display: "flex",
    flexDirection: "column",
  },
});

export const Article = chakra(Box, {
  baseStyle: {
    width: {
      base: "100%",
    },

    display: "flex",
    flexDirection: "column",
  },
});
