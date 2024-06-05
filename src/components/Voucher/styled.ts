import { Box, chakra } from "@chakra-ui/react"

export const VoucherWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
    gap: "30px",

    ".pix": {
      display: "flex",
      alignItems: "center",
      gap: "5px"
    }
  }
})

export const ModalContent = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    ".title": {
      height: "50px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "30px",
      borderBottom: "1px solid #E5E5E5",
      fontSize: "14px",
      fontWeight: "bold",
      margin: 0
    },

    ".content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,

      ".action": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px"
      }
    }
  }
})
