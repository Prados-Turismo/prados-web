import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const CardWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    maxW: {
      base: "240px",
      xl: "300px",
      "2xl": "372px",
    },
    padding: {
      base: "10px",
      "2xl": "20px 25px",
    },
    display: "flex",
    flexDirection: "column",
    gap: {
      base: "10px",
      "2xl": "25px",
    },
    border: "1px solid #E5E5E5",
    borderRadius: "2px",

    transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.16)",
      transform: "translateY(-8px)",
    },
  },
});

export const Icon = chakra(Box, {
  baseStyle: {
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brand.500",
    borderRadius: "100px",
    fontSize: pixelToRem(20),

    "& svg": {
      color: "contrast",
    },
  },
});

export const Title = chakra("h4", {
  baseStyle: {
    fontSize: pixelToRem(22),
    color: "text.first",
  },
});

export const Text = chakra("p", {
  baseStyle: {
    fontSize: pixelToRem(16),
    color: "text.third",
    flexGrow: 1,
  },
});
