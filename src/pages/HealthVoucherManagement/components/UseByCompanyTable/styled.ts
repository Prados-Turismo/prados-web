import { chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../../../utils"

export const SearchInputWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    minWidth: "50%",
    maxWidth: "700px",
    border: "1px solid #E5E5E5",
    borderRadius: "100px",
    overflow: "hidden",
    marginBottom: "0.5rem",
    label: {
      padding: `${pixelToRem(14)} ${pixelToRem(24)}`
    },

    input: {
      width: "100%"
    }
  }
})
