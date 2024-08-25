import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

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

export const Wrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",

    ".title": {
      fontSize: pixelToRem(15),
      color: "text.second",
      textAlign: "center",
      position: "relative",
      zIndex: 1,

      "&:before": {
        content: "''",
        borderTop: "1px solid #E5E5E5",
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        zIndex: -1
      },

      span: {
        backgroundColor: "white",
        padding: "0 15px"
      }
    },

    ".menu": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }
  }
})
