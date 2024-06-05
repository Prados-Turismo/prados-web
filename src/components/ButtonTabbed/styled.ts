import { chakra, Box, Button as ButtonUI } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const ButtonTabbedWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: {
      base: "column",
      lg: "row"
    },
    gap: "30px",
    padding: "0 15px 0",
    borderBottom: "1px solid #E5E5E5"
  }
})

export const Button = chakra(ButtonUI, {
  baseStyle: {
    display: "flex",
    fontWeight: 400,
    fontSize: pixelToRem(16),
    background: "none",
    color: "text.fourth",
    borderRadius: "8px",
    padding: "9px 20px",
    height: "65px",
    position: "relative",

    "&:hover, &.active": {
      background: "none",
      color: "text.first",

      "&:before": {
        content: "''",
        width: "100%",
        top: "62px",
        borderBottom: "3px solid",
        borderColor: "brand.500",
        position: "absolute"
      }
    }
  }
})
