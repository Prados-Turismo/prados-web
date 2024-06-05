import { chakra, Box as BoxUI } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const Box = chakra(BoxUI, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",

    h1: {
      display: "flex",
      alignItems: "center"
    },

    "h1, h2 span": {
      fontSize: pixelToRem(12),
      color: "#686969"
    },

    h2: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      padding: "5px 40px"
    }
  }
})
