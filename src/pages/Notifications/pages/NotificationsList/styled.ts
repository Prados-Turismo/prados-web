import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

export const Icon = chakra(Box, {
  baseStyle: {
    width: "28px",
    minW: "28px",
    height: "28px",
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
