import { Box, chakra } from "@chakra-ui/react";

export const ContentWrapper = chakra(Box, {
  baseStyle: {
    height: "100%",
    width: "100%",
    minHeight: "600px",
  },
});

export const LoadingWrapper = chakra(Box, {
  baseStyle: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto 0",
  },
});
