import { chakra, Box, FormLabel as FormLabelUI } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const ModalContent = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    ".title": {
      height: "50px",
      minHeight: "50px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "30px",
      fontSize: pixelToRem(14),
      borderBottom: "1px solid #E5E5E5",
      fontWeight: "bold",
      margin: 0
    },

    ".subtitle": {
      padding: "25px",
      fontSize: pixelToRem(14),

      span: {
        color: "brand.500"
      }
    },

    ".detailsForm": {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "0 25px 25px",

      ".buttonBox": {
        display: "flex",
        justifyContent: "flex-end",

        button: {
          width: "203px",
          marginTop: "60px"
        }
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

export const Form = chakra("form", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",

    ".fieldsWrap": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",

      ".field": {
        input: {
          height: "42px",
          fontSize: pixelToRem(14)
        }
      }
    }
  }
})
