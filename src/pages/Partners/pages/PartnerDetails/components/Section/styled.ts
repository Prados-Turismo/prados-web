import { chakra, Box } from "@chakra-ui/react"

export const SectionTop = chakra(Box, {
  baseStyle: {
    justifyContent: "start"
  }
})

export const Content = chakra(Box, {
  baseStyle: {
    ".searchWrap": {
      width: "100%",
      maxWidth: "600px"
    },

    ".contentWrap": {
      flexGrow: 1
    }
  }
})
