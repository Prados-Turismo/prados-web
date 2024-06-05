import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const PaginationWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: {
      base: "column",
      lg: "row"
    },
    gap: {
      base: "20px",
      lg: "10px"
    },

    ".buttonsWrap": {
      display: "flex",
      gap: "10px"
    }
  }
})

export const Text = chakra("button", {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    fontWeight: 400,
    fontSize: pixelToRem(16),
    color: "text.third",

    "&.active": {
      cursor: "pointer",
      color: "text.first"
    }
  }
})

export const Button = chakra("button", {
  baseStyle: {
    width: "42px",
    height: "42px",
    fontWeight: 400,
    fontSize: pixelToRem(16),
    background: "none",
    color: "text.third",
    borderRadius: "4px",

    "&:hover, &.active": {
      background: "brand.500",
      color: "contrast"
    }
  }
})
