import {
  chakra,
  Box,
  Button as ButtonUI,
  Alert as AlertUI,
  Text as TextUI,
  Input as InputUI
} from "@chakra-ui/react"

export const Input = chakra(InputUI, {
  baseStyle: {
    height: "42px"
  }
})

export const LinkHome = chakra(Box, {
  baseStyle: {
    width: "max-content",
    margin: "0 auto",
    a: {
      color: "unset",
      borderBottomColor: "unset"
    }
  }
})

export const Button = chakra(ButtonUI, {
  baseStyle: {
    minWidth: "130px",
    marginLeft: "10px"
  }
})

export const Alert = chakra(AlertUI, {
  baseStyle: {
    borderRadius: "5px",
    padding: "5px 10px"
  }
})

export const Text = chakra(TextUI, {
  baseStyle: {
    span: {
      color: "#E53E3E"
    }
  }
})

export const BoxButton = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "flex-end"
  }
})
