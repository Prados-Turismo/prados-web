import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const Content = chakra(Box, {
  baseStyle: {
    marginTop: "-35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "35px",
    fontSize: pixelToRem(14),
    fontWeight: "600",

    span: {
      color: "rgba(237, 123, 29, 1)"
    },

    "&.logged": {
      marginTop: "-40px",
      background: "white",
      borderTop: "1px solid #E5E5E5"
    }
  }
})
