import { Tab, chakra } from "@chakra-ui/react";







export const StyledTab = chakra(Tab, {
  baseStyle: {
    '&[aria-selected="true"]': {
      color: "brand.500"
    }
  }
})
