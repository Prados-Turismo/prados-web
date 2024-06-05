import { chakra, Radio as RadioUI } from "@chakra-ui/react"

export const Radio = chakra(RadioUI, {
  baseStyle: {
    width: "8px",
    height: "8px",
    cursor: "default",

    "&[data-checked]": {
      color: "unset"
    },
    "&[data-checked]::before": {
      borderColor: "unset",
      background: "unset"
    }
  }
})
