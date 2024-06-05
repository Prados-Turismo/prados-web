import { Box, chakra } from "@chakra-ui/react"

export const BoxCard = chakra(Box, {
  baseStyle: {
    w: "max-content",
    h: "max-content",
    cursor: "pointer",
    padding: "10px",
    borderWidth: "1px",
    borderRadius: "4px",
    borderColor: "#D2D2D2",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#333333",
    fontWeight: "400",

    "&:hover": {
      borderColor: "brand.500"
    },

    _checked: {
      bg: "brand.50",
      color: "brand.500",
      borderColor: "brand.500",
      fontWeight: "500",

      ".inputRadio": {
        borderColor: "brand.500",
        ".inputRadioChecked": {
          borderRadius: "50%",
          w: "8px",
          h: "8px",
          bgColor: "brand.500"
        }
      }
    },
    _focus: {
      boxShadow: "none"
    },

    ".inputRadio": {
      borderRadius: "50%",
      border: "1px solid",
      borderColor: "#D2D2D2",
      bgColor: "#f5f5f5",
      w: "14px",
      h: "14px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }
})
