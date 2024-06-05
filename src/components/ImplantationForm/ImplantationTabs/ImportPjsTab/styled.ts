import { Box, chakra, Checkbox as CheckboxUI } from "@chakra-ui/react";

export const StyledWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2rem",
    padding: "0.75rem 1.5rem"
  }
})


export const CheckboxWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem"
  }
})

export const Checkbox = chakra(CheckboxUI, {
  baseStyle: {
    ['span[data-checked]:nth-child(2), span[data-checked][data-hover]:nth-child(2), span[data-checked]:nth-child(2):hover']: {
      background: "brand.500",
      backgroundColor: "brand.500",
      borderColor: "brand.500",
      color: "white"
    }
  }
})
