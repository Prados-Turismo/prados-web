import {
  chakra,
  Box,
  Text as TextUI,
  Button as ButtonUI,
  MenuItem as MenuItemUI,
  MenuList as MenuListUI,
} from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

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
  },
});

export const Text = chakra(TextUI, {
  baseStyle: {
    display: {
      base: "none",
      "2xl": "block",
    },
  },
});

export const ButtonStyled = chakra(ButtonUI, {
  baseStyle: {
    display: "flex",
    maxWidth: "210px",
    justifyContent: "center",
    alignItems: "center",
    padding: {
      base: "0 10px",
      xl: "0 10px",
    },
    background: "transparent",
    color: "#333333",
    border: "0",

    "&:hover, &:active, &[data-active]": {
      background: "#fff",
    },

    "span:nth-of-type(1)": {
      display: "flex",
      minWidth: "24px",
      gap: "7px",
      alignItems: "center",
    },
  },
});

export const MenuList = chakra(MenuListUI, {
  baseStyle: {
    zIndex: "10",
    right: "0",
    border: "none",
    borderRadius: "2px",
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.16)",
  },
});

export const MenuItem = chakra(MenuItemUI, {
  baseStyle: {
    padding: "8px 16px",
    color: "#707070",
    lineHeight: "21px",
    fontSize: pixelToRem(14),
    "&:hover": {
      background: "#f9f9f9",
    },
    a: {
      width: "100%",
    },
    div: {
      width: "100%",
    },
  },
});
