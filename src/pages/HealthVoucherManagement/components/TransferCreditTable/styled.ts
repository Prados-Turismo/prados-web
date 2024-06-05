import { chakra } from "@chakra-ui/react"

export const TD = chakra("td", {
  baseStyle: {
    flex: 1,
    fontSize: "0.875rem",
    color: "text.third",
    ".SVG": {
      color: "text.third"
    }
  }
})
