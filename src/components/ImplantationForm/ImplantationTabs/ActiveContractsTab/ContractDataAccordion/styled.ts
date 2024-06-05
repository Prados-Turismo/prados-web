import { Box, Text, chakra } from "@chakra-ui/react";

export const StyledTitleWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

export const Title = chakra(Text, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 500
  }
})

export const PopoverContentWrapper = chakra(Box, {
  baseStyle: {
    backgroundColor: "white",
    color: "black",
    width: "100%",
    height: "100%",
    padding: "1rem",
    borderRadius: "0.125rem",
    boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.16)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }
})


export const PopoverContentTitle = chakra(Text, {
  baseStyle: {
    color: "#1f1f1f",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "0.875rem"
  }
})

export const PopoverContentDescription = chakra(Text, {
  baseStyle: {
    color: "text.third",
    fontSize: "0.875rem",
    lineHeight: "1.3125rem"
  }
})
