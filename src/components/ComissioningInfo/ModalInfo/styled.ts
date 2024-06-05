import { Text, chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../../utils"

const GenericText = chakra(Text, {
  baseStyle: {
    fontsize: pixelToRem(14),
    lineHeight: "14px",
    fontWeight: "bold"
  }
})

const Value = chakra(GenericText, {
  baseStyle: {
    fontWeight: "inherit",
    color: "text.third"
  }
})

export { GenericText, Value }
