import { Box, chakra } from "@chakra-ui/react";


export const ContentWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    padding: "3.75rem 2.625rem"
  }
})
