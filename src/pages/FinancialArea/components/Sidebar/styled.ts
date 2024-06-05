import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const AsideTop = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "start",

    "&.flex-between": {
      flex: 1,
      background: "red",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center"
    },

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
