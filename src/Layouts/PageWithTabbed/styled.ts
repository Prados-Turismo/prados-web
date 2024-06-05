import { chakra, Box } from "@chakra-ui/react"
import { pixelToRem } from "../../utils"

export const SectionWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    padding:"0 15px",
    flexGrow: 1,
    flexDirection: "column",
    gap: "30px"
  }
})

export const Title = chakra("h2", {
  baseStyle: {
    display: "flex",
    alignItems: "end",
    height: "110px",
    fontWeight: 500,
    fontSize: pixelToRem(24),
    color: "text.first"
  }
})

export const Section = chakra(Box, {
  baseStyle: {
    border: "1px solid #E5E5E5",
    borderRadius: "4px 4px 0 0",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
})

export const Aside = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
})

export const Article = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "35px 15px"
  }
})
