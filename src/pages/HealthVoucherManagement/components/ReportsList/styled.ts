import { Box, chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Content = chakra(Box, {
  baseStyle: {
    border: "1px solid #e5e5e5",
    marginTop: pixelToRem(137),
    borderRadius: 4,
    padding: `${pixelToRem(40)} ${pixelToRem(24)}`
  }
})
