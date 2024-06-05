import { Box, chakra, Button as ButtonUI } from "@chakra-ui/react"

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
    padding: "1.5rem",

    ">button": {
      marginTop: "4.8125rem",
      width: "100%",
      maxWidth: "6.6875rem"
    }
  }
})
