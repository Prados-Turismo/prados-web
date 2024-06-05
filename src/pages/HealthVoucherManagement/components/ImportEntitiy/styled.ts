import { Box, chakra, Button as ButtonUI } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Content = chakra(Box, {
  baseStyle: {
    border: "1px solid #e5e5e5",
    marginTop: pixelToRem(137),
    borderRadius: 4,
    padding: `${pixelToRem(40)} ${pixelToRem(24)}`
  }
})

export const Header = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "space-between",
    ".searchArea": {
      display: "flex",
      alignItems: "center",
      minWidth: "50%",
      border: "1px solid #E5E5E5",
      borderRadius: "100px",
      overflow: "hidden",

      label: {
        padding: `${pixelToRem(14)} ${pixelToRem(24)}`
      },

      input: {
        width: "100%"
      }
    },
    ".actionsArea": {
      display: "flex",
      gap: "0.5rem"
    }
  }
})

export const Button = chakra(ButtonUI, {
  baseStyle: {
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem"
  }
})

export const OutlinedButton = chakra(ButtonUI, {
  baseStyle: {
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "transparent",
    color: "brand.500",
    border: "1px solid",
    borderColor: "brand.500",
    "&:hover": {
      background: "brand.500",
      color: "white"
    }
  }
})
