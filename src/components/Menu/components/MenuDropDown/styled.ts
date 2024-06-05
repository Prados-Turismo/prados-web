import {
  chakra,
  Box,
  Text as TextUI,
  Button as ButtonUI,
  MenuItem as MenuItemUI,
  MenuList as MenuListUI,
} from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

import userIcon from "../../../../assets/icons/menuDropDown/user.png";

export const Text = chakra(TextUI, {
  baseStyle: {
    display: {
      base: "none",
      "2xl": "block",
    },
  },
});

export const CircleBox = chakra(Box, {
  baseStyle: {
    display: "flex",
    backgroundColor: "brand.500",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    minWidth: "24px",
    height: "24px",
  },
});

export const Button = chakra(ButtonUI, {
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
    border: "1px solid #E5E5E5",

    "&:hover, &:active, &[data-active]": {
      background: "#f9f9f9",
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

export const UserImage = chakra(Box, {
  baseStyle: {
    width: "14px",
    height: "14px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: userIcon,
    textIndent: "-99999px",
  },
});
