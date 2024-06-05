import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Aside = chakra(Box, {
  baseStyle: {
    width: "100%",
    height: {
      base: "60px",
      md: "110px"
    },
    display: "flex",
    flexDirection: "row",
    margin: "25px 0",
    justifyContent: "space-between",

    ".left": {
      display: "flex",
      alignItems: "end",
      justifyContent: "start",

      h2: {
        fontWeight: 500,
        fontSize: pixelToRem(24),
        color: "text.first"
      }
    },

    ".right": {
      display: "flex",
      alignItems: "end",
      justifyContent: "end"
    }
  }
})
