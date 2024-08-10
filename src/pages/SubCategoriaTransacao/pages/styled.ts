import { chakra, Box } from "@chakra-ui/react"

export const SectionTop = chakra(Box, {
  baseStyle: {
    justifyContent: "end"
  }
})

export const Content = chakra(Box, {
  baseStyle: {
    ".searchWrap": {
      maxWidth: "600px",
      display: "flex",
      flexDir: "column",
      gap: "5px"
    },

    ".contentWrap": {
      flexGrow: 1
    }
  }
})
