import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../../../../../utils"

export const AsideTop = chakra(Box, {
  baseStyle: {
    justifyContent: "start",

    h2: {
      fontWeight: 500,
      fontSize: pixelToRem(24),
      color: "text.first"
    }
  }
})

export const Aside = chakra(Box, {
  baseStyle: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
})
