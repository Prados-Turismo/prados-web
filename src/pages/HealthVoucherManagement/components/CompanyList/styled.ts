import { Box, Button, chakra, Switch as SwitchUI } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Header = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    }
  }
})

export const Content = chakra(Box, {
  baseStyle: {
    border: "1px solid #e5e5e5",
    marginTop: pixelToRem(137),
    borderRadius: 4,
    padding: `${pixelToRem(40)} ${pixelToRem(24)}`,
    ">.companyHeaderArea": {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      fontSize: "1rem",
      lineHeight: "150%"
    }
  }
})

export const OutlinedButton = chakra(Button, {
  baseStyle: {
    backgroundColor: "white",
    color: "brand.500",
    border: "1px solid",
    borderColor: "brand.500",
    ":hover": {
      color: "white",
      backgroundColor: "brand.500"
    }
  }
})

export const Switch = chakra(SwitchUI, {
  baseStyle: {
    "span[data-checked]": {
      backgroundColor: "brand.500",
      span: {
        backgroundColor: "#fff"
      }
    }
  }
})

export const SearchInputWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    minWidth: "50%",
    maxWidth: "700px",
    border: "1px solid #E5E5E5",
    borderRadius: "100px",
    overflow: "hidden",
    marginBottom: "0.5rem",
    label: {
      padding: `${pixelToRem(14)} ${pixelToRem(24)}`
    },

    input: {
      width: "100%"
    }
  }
})

export const ExpandButton = chakra("button", {
  baseStyle: {
    cursor: "pointer",
    color: "#5C42C2",
    "&:disabled": {
      color: "#5C42C299",
      cursor: "not-allowed"
    }
  }
})
