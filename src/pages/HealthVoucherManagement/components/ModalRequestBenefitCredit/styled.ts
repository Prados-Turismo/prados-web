import {
  chakra,
  Box,
  Checkbox as CheckboxUI,
  Input as InputUI,
  Button as ButtonUI
} from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Container = chakra("form", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: pixelToRem(32),
    padding: "1.5rem 2rem",
    width: "100%"
  }
})

export const FormSection = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "0.625rem",
    ".inputWrapper": {
      display: "flex",
      justifyContent: "flex-start",
      gap: pixelToRem(16)
    },
    ".observationSpan": {
      fontWeight: 400,
      fontSize: "0.75rem",
      color: "text.fourth"
    },
    ".simpleInputContainer": {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    },
    ".inputLabel": {
      color: "text.third",
      fontWeight: 400,
      fontSize: "0.875rem"
    },
    ".includeCompanyWrapper": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      ".includeCompanyHeader": {
        display: "flex",
        justifyContent: "space-between",
        ">button": {
          color: "brand.500",
          cursor: "pointer"
        }
      },
      ".aditionalFieldsWrapper": {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        ".fieldWrapper": {
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between"
        },
        ".fileField": {
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem"
        }
      }
    },
    ".actionsDiv": {
      alignSelf: "flex-end",
      cursor: "pointer",
      display: "flex",
      gap: "0.75rem",
      alignItems: "center",
      color: "brand.500"
    }
  }
})

export const CheckboxWrapper = chakra("label", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: pixelToRem(16),
    border: "1px solid #E5E5E5",
    borderRadius: "2px",
    padding: "1rem 0",
    flex: 1,
    maxWidth: "19.4375rem",
    cursor: "pointer",
    ">label": {
      cursor: "pointer"
    }
  }
})

export const Checkbox = chakra(CheckboxUI, {
  baseStyle: {
    background: "#F9F9F9",
    marginLeft: "25px",

    borderColor: "text.fourth",
    "span[data-checked], span[data-checked][data-hover], span[data-checked]:hover":
      {
        background: "brand.500",
        borderColor: "brand.500",
        color: "contrast"
      }
  }
})

export const CurrencyInputWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "&::after": {
      display: "flex",
      alignItems: "center",
      content: '"R$"',
      position: "absolute",
      left: "1rem",
      width: "1rem",
      height: "1rem"
    },
    ">input[disabled]": {
      color: "text.first",
      "&::after": {
        color: "text.first"
      }
    }
  }
})
export const CurrencyInput = chakra(InputUI, {
  baseStyle: {
    paddingLeft: "2.5rem",
    color: "text.first",
    "&:placeholder": {
      color: "text.first"
    },
    "&:focus": {
      border: "1px solid",
      borderColor: "brand.500"
    }
  }
})

export const InputFileWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dashed",
    borderColor: "text.fourth",
    borderRadius: "4px",
    padding: "5px 0",
    cursor: "pointer",
    ">p": {
      color: "text.first",
      ">span": {
        color: "brand.500"
      }
    }
  }
})

export const Button = chakra(ButtonUI, {
  baseStyle: {
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem"
  }
})
