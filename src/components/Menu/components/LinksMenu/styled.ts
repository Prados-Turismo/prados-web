import { chakra, Box } from "@chakra-ui/react";

export const Links = chakra(Box, {
  baseStyle: {
    display: "flex",
    w: "100%",
    flexDirection: {
      base: "column",
      xl: "row",
    },
    gap: {
      base: "25px",
      "2xl": "30px",
    },
    borderLeft: {
      base: "unset",
      xl: "1px solid #E5E5E5",
    },
    padding: {
      base: "20px 0 0 0",
      xl: "0 0 0 20px",
    },
    alignItems: {
      base: "left",
      xl: "center",
    },
    a: {
      width: "max-content",
      fontSize: "15px",
      color: "text.fourth",
      position: "relative",

      ":not(.link-hover-disabled)": {
        "&:hover, &.active-link": {
          color: "text.first",

          "&:before": {
            content: "''",
            width: "100%",
            top: "35px",
            borderBottom: "3px solid",
            borderColor: "brand.500",
            position: "absolute",
          },
        },
      },
    },
  },
});
