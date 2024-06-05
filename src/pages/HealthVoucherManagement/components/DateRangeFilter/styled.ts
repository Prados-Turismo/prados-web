import { Box, chakra, Input as InputUI } from "@chakra-ui/react"

export const FiltersContainer = chakra(Box, {
  baseStyle: {
    display: "flex",

    alignItems: "center",
    gap: "1rem",
    ".untilSpan": {
      color: "text.third",
      fontWeight: 400,
      fontSize: "0.875rem"
    }
  }
})

export const Field = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    paddingRight: "0.75rem",
    border: " 1px solid #E5E5E5",
    borderRadius: "2px",
    maxHeight: "2.625rem",
    maxWidth: "12.5rem",
    ".SVG": {
      color: "text.forth",
      transition: "color 0.2s ease-in"
    },
    transition: "color 0.2s ease-in",
    "&:focus-within": {
      border: "1px solid",
      borderColor: "brand.500",
      ".SVG": {
        color: "brand.500"
      }
    },
    "input[type='date']::-webkit-calendar-picker-indicator": {
      opacity: 0,
      width: "100%",
      position: "absolute",
      zIndex: 10
    },
    "input[type='date']": {
      appearance: "none",
      outline: "none",
      background: "transparent",
      overflow: "hidden"
    }
  }
})

export const Input = chakra(InputUI, {
  baseStyle: {
    border: "none"
  }
})
