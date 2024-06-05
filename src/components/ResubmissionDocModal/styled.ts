import { chakra, Box } from "@chakra-ui/react"

export const Content = chakra(Box, {
  baseStyle: {
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    flexGrow: 1,

    ".benefitTD": {
      fontWeight: "bold"
    },

    ".benefitTD:hover": {
      color: "brand.500",
      cursor: "pointer"
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
      minHeight: "50px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "30px",
      borderBottom: "1px solid #E5E5E5",
      fontSize: "14px",
      fontWeight: "bold",
      margin: 0
    },

    ".details": {
      display: "flex",
      padding: "24px",
      columnGap: "24px",
      color: "#1F1F1F",

      ".detailsColumnA, .detailsColumnB": {
        display: "flex",
        flexDirection: "column",
        rowGap: "15px"
      },

      ".detailsColumnA": {
        fontWeight: "600"
      },

      ".detailsColumnB": {
        color: "#707070"
      },

      "h1, h4": {
        fontWeight: 600,
        margin: "0 0 10px"
      },

      p: {
        margin: "10px 0"
      }
    }
  }
})
