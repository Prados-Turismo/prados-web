import { chakra, Box } from "@chakra-ui/react"

export const ComponentWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: "30px 0 45px"
  }
})
