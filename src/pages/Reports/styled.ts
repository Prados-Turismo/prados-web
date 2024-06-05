import { chakra, Box } from "@chakra-ui/react"

export const Content = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    flexGrow: 1,

    ".topWrap": {
      display: "flex",
      flexDirection: {
        base: "column",
        "2xl": "row"
      },
      gap: "25px",
      justifyContent: "space-between"
    },

    ".fieldsGroup": {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      padding: "0 15px",
      alignItems: {
        base: "baseline",
        lg: "end"
      },
      flexDirection: {
        base: "column",
        lg: "row"
      },

      span: {
        color: "text.third"
      },

      "> div": {
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        "&.input": {
          width: "280px"
        }
      }
    },

    ".buttonsGroup": {
      display: "flex",
      position: "absolute",
      top: {
        base: "-62px",
        lg: "12px"
      },
      right: "15px",
      gap: {
        base: "0px",
        lg: "10px"
      },
      alignItems: "center"
      // flexDirection: {
      //   base: "column",
      //   md: "row"
      // }
    }
  }
})
