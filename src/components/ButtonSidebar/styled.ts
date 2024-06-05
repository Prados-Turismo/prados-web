import { chakra, Button as ButtonUI } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const Button = chakra(ButtonUI, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 400,
    fontSize: pixelToRem(16),
    background: "none",
    color: "text.second",
    borderRadius: "8px",
    padding: "9px 10px",
    height: "40px",

    "&:not(.active)": {
      border: "1px solid #D9D9D9",
    },

    "&.active": {
      background: "sideBarButton.50",
      color: "brand.500",
      border: "none",

      "&.multi .iconArrow": {
        transform: "rotate(90deg)",
      },
    },

    ":not(.active):hover": {
      background: "brand.50",
      // color: "contrast",
      border: "none",
    },

    ".iconArrow": {
      transition: "transform 100ms ease",
      "&.hide": {
        display: "none",
      },
    },

    ".text": {
      display: "flex",
      paddingLeft: "18px",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",

      "svg, img": {
        position: "absolute",
        left: "5px",
      },
    },
  },
});
