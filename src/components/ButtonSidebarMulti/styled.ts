import { chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const Button = chakra("button", {
  baseStyle: {
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: pixelToRem(24),
    padding: `0 ${pixelToRem(24)}`,
    color: "text.fourth",
    fontWeight: 400,

    "&.active": {
      color: "brand.500",
      fontWeight: 500
    }
  }
})
