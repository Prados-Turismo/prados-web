import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Card = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1))",
    borderRadius: pixelToRem(8),
    overflow: "hidden",

    ".wrapIcon": {
      display: "flex",
      height: "100%",
      padding: pixelToRem(28),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "brand.500",
      color: "#FFFFFF",

      "> svg": {
        fontSize: pixelToRem(32)
      }
    },

    ".wrapContent": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },

    ".wrapTitle": {
      fontWeight: 400,
      fontSize: pixelToRem(20),
      lineHeight: pixelToRem(30),
      color: "#333333"
    },

    ".wrapText": {
      fontWeight: 400,
      fontSize: pixelToRem(14),
      lineHeight: pixelToRem(21),
      color: "text.fourth"
    },

    ".wrapValue": {
      fontWeight: 500,
      fontSize: pixelToRem(20),
      wordBreak: "keep-all",
      lineHeight: pixelToRem(30),
      color: "brand.500",
      marginRight: pixelToRem(24)
    }
  }
})
