import { chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const Wrap = chakra("div", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: pixelToRem(24),
    marginTop: pixelToRem(24)
  }
})
