import {
  chakra,
  Box,
  FormLabel as FormLabelUI,
  Input as InputUI,
  FormControl as FormControlUI
} from "@chakra-ui/react"
import { pixelToRem } from "../../../../../utils"

export const Content = chakra(Box, {
  baseStyle: {
    ".formTop": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "max-content",
      marginBottom: "50px",

      ".title": {
        color: "#1F1F1F",
        fontSize: pixelToRem(20),
        padding: "9px"
      },

      ".buttonBox": {
        display: "flex",
        gap: "15px"
      }
    }
  }
})

export const FormLabel = chakra(FormLabelUI, {
  baseStyle: {
    fontSize: pixelToRem(14),
    span: {
      color: "brand.500"
    }
  }
})

export const Input = chakra(InputUI, {
  baseStyle: {
    "&[readonly]": {
      background: "#F9F9F9"
    }
  }
})

export const Form = chakra("form", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",

    ".fieldsWrap": {
      width: "100%",
      maxWidth: "685px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",

      ".field": {
        ".fieldInput": {
          width: "100%",
          display: "flex",
          flexDirection: "column",

          "select[disabled]": {
            opacity: "1"
          }
        },

        input: {
          height: "42px",
          fontSize: pixelToRem(14)
        }
      }
    }
  }
})

export const FormControl = chakra(FormControlUI, {
  baseStyle: {
    display: "flex",
    alignContent: "center",

    label: {
      display: "flex",
      alignItems: "center",
      minWidth: "152px"
    }
  }
})
