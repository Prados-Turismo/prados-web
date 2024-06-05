import { chakra, Img as ImgUI } from "@chakra-ui/react"

export const Img = chakra(ImgUI, {
  baseStyle: {
    width: "auto",
    maxWidth: "120px",
    maxHeight: "45px",
    margin: "0 auto"
  }
})
