import { chakra, Box as BoxUI } from "@chakra-ui/react"

export const Box = chakra(BoxUI, {
  baseStyle: {
    width: "max-content",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      color: "brand.500"
    }
  }
})
