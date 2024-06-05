import { chakra, Switch as SwitchUI } from "@chakra-ui/react"

export const Switch = chakra(SwitchUI, {
  baseStyle: {
    "span[data-checked]": {
      backgroundColor: "brand.500",
      span: {
        backgroundColor: "#fff"
      }
    }
  }
})
