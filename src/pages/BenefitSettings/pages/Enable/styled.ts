import { chakra, Box } from "@chakra-ui/react"

export const Content = chakra(Box, {
  baseStyle: {
    ".benefitTD:hover": {
      color: "brand.500",
      cursor: "pointer"
    }
  }
})
