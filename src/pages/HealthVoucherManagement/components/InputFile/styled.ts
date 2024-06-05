import { chakra } from "@chakra-ui/react"

export const InputFileWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dashed",
    borderColor: "text.first",
    borderRadius: "4px",
    padding: "0.625rem 0",
    cursor: "pointer",
    ">p": {
      color: "text.first",
      ">span": {
        color: "brand.500"
      }
    },
    ">ul": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.75rem",
      ">li": {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",

        ">span": {
          color: "text.third"
        },
        ">button": {
          color: "text.third"
        }
      }
    }
  }
})
