import { chakra, Box } from "@chakra-ui/react"

export const SearchBox = chakra(Box, {
  baseStyle: {
    maxWidth: "400px",
    width: "100%",
    margin: "0 0 30px 20px"
  }
})

export const AlertText = chakra(Box, {
  baseStyle: {
    margin: "0 0 0 20px",
    fontWeight: "600"
  }
})

export const BoxButton = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 50px 0"
  }
})
