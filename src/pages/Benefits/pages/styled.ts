import { Box, chakra } from "@chakra-ui/react";

export const SectionTop = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "end",
    width: "max-content",
    position: "absolute",
    right: "30px",
    top: {
      base: "115px",
      sm: "130px",
    },
  },
});

export const Content = chakra(Box, {
  baseStyle: {
    marginTop: "140px",
    ".benefitTD:hover": {
      color: "brand.500",
      cursor: "pointer",
    },
  },
});
