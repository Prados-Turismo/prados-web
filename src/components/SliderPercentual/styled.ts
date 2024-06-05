import {
  chakra,
  Box,
  Text as TextUI,
  Slider as SliderUI,
  SliderTrack as SliderTrackUI,
  SliderFilledTrack as SliderFilledTrackUI,
  SliderThumb as SliderThumbUI
} from "@chakra-ui/react"

export const Text = chakra(TextUI, {
  baseStyle: {
    textAlign: "center",
    color: "text.fourth"
  }
})

export const Content = chakra(Box, {
  baseStyle: {
    maxWidth: "120px",
    marginLeft: "17px"
  }
})

export const Slider = chakra(SliderUI, {
  baseStyle: {}
})

export const SliderTrack = chakra(SliderTrackUI, {
  baseStyle: {}
})
export const SliderFilledTrack = chakra(SliderFilledTrackUI, {
  baseStyle: {
    background: "brand.500"
  }
})
export const SliderThumb = chakra(SliderThumbUI, {
  baseStyle: {
    backgroundColor: "#fff",
    borderColor: "brand.500",

    "&::before": {
      border: "3px solid",
      borderColor: "brand.500",
      borderRadius: "50%",
      content: `""`
    }
  }
})
