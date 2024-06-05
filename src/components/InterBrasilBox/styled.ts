import { chakra, Box as BoxUI } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const Box = chakra(BoxUI, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",

    img: {
      w: {
        base: "120px",
        sm: "max-content"
      }
    },

    w: {
      base: "280px",
      sm: "max-content"
    },

    "h1, h2 span": {
      fontSize: pixelToRem(13),
      color: "#686969"
    },

    h2: {
      display: "flex",
      justifyContent: "space-between",
      padding: {
        base: "0 0",
        sm: "0 40px"
      }
    }
  }
})
