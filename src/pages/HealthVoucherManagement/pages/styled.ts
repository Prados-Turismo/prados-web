import {
  chakra,
  Box,
  Grid,
  GridItem,
  Input as InputUI,
  Button as ButtonUI
} from "@chakra-ui/react"
import { pixelToRem } from "../../../utils"

export const Content = chakra(Box, {
  baseStyle: {
    border: "1px solid #e5e5e5",
    marginTop: pixelToRem(137),
    borderRadius: 4,
    padding: `${pixelToRem(40)} ${pixelToRem(24)}`
  }
})

export const DashboardSection = chakra("section", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: pixelToRem(24),
    marginBottom: pixelToRem(56)
  }
})

export const DashboardGrid = chakra(Grid, {
  baseStyle: {
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: pixelToRem(24)
  }
})

export const DashboardSectionTitle = chakra("h4", {
  baseStyle: {
    fontWeight: 400,
    fontSize: pixelToRem(24),
    lineHeight: pixelToRem(36),
    color: "#000000"
  }
})

export const DashboardItem = chakra(GridItem, {
  baseStyle: {}
})

//Transactional History
export const TransactionalHistoryTop = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    marginBottom: pixelToRem(40),

    ".searchArea": {
      display: "flex",
      alignItems: "center",
      minWidth: "50%",
      border: "1px solid #E5E5E5",
      borderRadius: "100px",
      overflow: "hidden",

      label: {
        padding: `${pixelToRem(14)} ${pixelToRem(24)}`
      },

      input: {
        width: "100%"
      }
    },

    ".valueArea": {
      display: "flex",
      alignItems: "center",
      gap: pixelToRem(12),

      ".valueBox": {
        fontWeight: 500,
        fontSize: pixelToRem(22),
        lineHeight: "120%",
        color: "text.first",
        wordSpacing: pixelToRem(12),
        padding: `${pixelToRem(8)} ${pixelToRem(18)}`,
        border: "1px solid #DBDBDB",
        boxShadow: " 0px 2px 4px rgba(0, 0, 0, 0.25)",
        maxWidth: "14.1875rem",
        borderRadius: "10px",
        "&:disabled": {
          background: "white"
        }
      }
    }
  }
})

export const ExportCsvContainer = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: pixelToRem(24),

    button: {
      display: "flex",
      alignItems: "center",
      gap: pixelToRem(8),
      background: "#5B42C2",
      borderRadius: "5px",
      color: "#FFFFFF",
      fontWeight: 700,
      fontSize: pixelToRem(10),
      lineHeight: pixelToRem(15),
      padding: pixelToRem(8)
    }
  }
})

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

export const ActionsContainer = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "flex-end",
    justifyContent: "center"
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

export const OutlinedButton = chakra(ButtonUI, {
  baseStyle: {
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "transparent",
    color: "brand.500",
    border: "1px solid",
    borderColor: "brand.500",
    "&:hover": {
      background: "brand.500",
      color: "white"
    }
  }
})
