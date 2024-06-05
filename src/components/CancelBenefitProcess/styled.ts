import { chakra, Checkbox as CheckboxUI } from "@chakra-ui/react"

export const Checkbox = chakra(CheckboxUI, {
  baseStyle: {
    borderColor: "#909090",
    "span[data-checked]:nth-child(2), span[data-checked][data-hover]:nth-child(2), span[data-checked]:nth-child(2):hover":
      {
        background: "brand.500",
        borderColor: "brand.500",
        color: "contrast"
      }
  }
})
