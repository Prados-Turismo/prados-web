import { Box, chakra } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const ItemGroup = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
});

export const Item = chakra(Box, {
  baseStyle: {
    padding: "10px 16px",
    borderRadius: "100px",
    color: "#8A8A8A",
    fontSize: pixelToRem(14),
    border: "1px solid #E5E5E5",
    cursor: "pointer",

    "&:hover": {
      borderColor: "text.fourth",
    },

    "&.selected": {
      color: "brand.500",
      borderColor: "brand.500",
    },
  },
});
