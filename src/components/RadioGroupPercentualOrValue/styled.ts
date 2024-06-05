import {
  chakra,
  RadioGroup as RadioGroupUI,
  Stack as StackUI,
  Radio as RadioUI
} from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const RadioGroup = chakra(RadioGroupUI, {
  baseStyle: {
    "div label:nth-of-type(2)": {
      marginTop: "0"
    }
  }
})

export const Radio = chakra(RadioUI, {
  baseStyle: {
    background: "#F5F5F5",
    "&[data-checked]": {
      background: "#fff",
      border: "1px solid",
      borderColor: "brand.500",

      "&::before": {
        background: "brand.500",
        width: "8px",
        height: "8px"
      }
    },
    "&[data-checked]:hover": {
      background: "#fff",
      border: "1px solid",
      borderColor: "brand.500"
    }
  }
})

export const Stack = chakra(StackUI, {
  baseStyle: {
    paddingLeft: "30px",
    "label span": {
      fontSize: pixelToRem(14)
    },
    "label span[data-disabled][data-checked]": {
      opacity: "unset"
    }
  }
})
