import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const Wrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",

    ".title": {
      fontSize: pixelToRem(15),
      color: "text.second",
      textAlign: "center",
      marginBottom: "25px",
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
      marginBottom: {
        lg: "45px"
      }
    }
  }
})
