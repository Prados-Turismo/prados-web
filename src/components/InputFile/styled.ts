import { Stack, Text } from "@chakra-ui/layout"
import { customTheme } from "../../theme"
import { chakra } from "@chakra-ui/system"

const Title = chakra(Text, {
  baseStyle: {
    color: "#1F1F1F",
    fontSize: 14,
    "> span": { color: customTheme.colors.brand[500] }
  }
})

const UploadButton = chakra(Stack, {
  baseStyle: {
    display: "flex",
    borderRadius: "2px",
    height: 42,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    mt: "inherit !important",
    cursor: "pointer"
  }
})

export { Title, UploadButton }
