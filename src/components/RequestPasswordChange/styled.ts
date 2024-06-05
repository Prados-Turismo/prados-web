import { Stack, Text, chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

const PadlockContainer = chakra(Stack, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 120,
    width: "100%",
    height: 120,
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.25)",
    borderRadius: "24px",
    m: "38px auto"
  }
})
const Title = chakra(Text, {
  baseStyle: {
    fontWeight: "bold",
    fontSize: pixelToRem(24),
    mb: "18px !important",
    textAlign: "center",
    letterSpacing: "1px"
  }
})
const Description = chakra(Text, {
  baseStyle: {
    fontSize: pixelToRem(17),
    textAlign: "center",
    maxW: 495,
    color: "text.third",
    letterSpacing: "0.3px",
    "> strong": { fontSize: pixelToRem(16) }
  }
})

export { PadlockContainer, Title, Description }
