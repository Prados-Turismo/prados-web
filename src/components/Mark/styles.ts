import { Box, chakra } from "@chakra-ui/react"

export const MarkStyled = chakra(Box, {
  baseStyle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",

    "&.available": {
      backgroundColor: "#31A5C2"
    },

    "&.process": {
      backgroundColor: "#FA9127"
    },

    "&.active": {
      backgroundColor: "#13DA63"
    }
  }
})
