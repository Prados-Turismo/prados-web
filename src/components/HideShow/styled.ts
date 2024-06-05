import { chakra, Box } from "@chakra-ui/react"

export const HideShowWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",

    ".contentWrap": {
      minWidth: "150px",
      height: "50px",
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "22px",
      lineHeight: "26px",
      color: "#333333",
      background: "#FFFFFF",
      border: "1px solid #DBDBDB",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "10px",
      padding: "0 20px"
    }
  }
})
