import { Box, chakra, Button as ButtonUI } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const Header = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "space-between"
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

export const Content = chakra(Box, {
  baseStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    gap: "1rem",

    ">h3": {
      marginLeft: pixelToRem(24),
      marginTop: pixelToRem(24),
      color: "text.third",
      fontSize: pixelToRem(14)
    },

    ">button": {
      marginTop: "4.8125rem",
      width: "100%",
      maxWidth: "6.6875rem"
    }
  }
})

export const RecordsContainer = chakra("ul", {
  baseStyle: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: pixelToRem(16),
    "> li": {
      borderBottom: "1px solid",
      paddingBottom: pixelToRem(16),
      borderBottomColor: "#E5E5E5",
      paddingLeft: pixelToRem(24),
      paddingRight: pixelToRem(24),
      "&:first-of-type": {
        borderTop: "1px solid #E5E5E5",
        paddingTop: pixelToRem(16)
      }
    }
  }
})

export const Record = chakra("li", {
  baseStyle: {
    color: "text.third",
    fontSize: pixelToRem(14)
  }
})
