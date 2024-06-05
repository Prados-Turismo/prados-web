import { chakra, Box } from "@chakra-ui/react";

export const FieldWrap = chakra(Box, {
  baseStyle: {
    position: "relative",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    padding: "5px 40px",
    width: "100%",
    background: "#FFF",
  },
});

export const Magnifier = chakra("button", {
  baseStyle: {
    position: "absolute",
    top: "11px",
    left: "15px",
    zIndex: 0,

    svg: {
      color: "text.fourth",
    },
  },
});

export const Form = chakra("form", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    border: "none",

    input: {
      width: "100%",
      height: "26px",

      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    },
  },
});

export const Clear = chakra("button", {
  baseStyle: {
    position: "absolute",
    top: "11px",
    right: "15px",
    zIndex: 0,

    svg: {
      color: "text.fourth",
    },
  },
});
