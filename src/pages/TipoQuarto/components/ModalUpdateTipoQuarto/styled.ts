import { chakra, Box } from "@chakra-ui/react"

export const FieldWrap = chakra(Box, {
  baseStyle: {
    span: {
      display: "flex",
      gap: "5px",
      marginBottom: "3px"
    }
  }
})
