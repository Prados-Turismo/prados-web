import { Box, Button, Text, chakra } from "@chakra-ui/react";


export const StyledWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2rem",
    padding: "0.75rem 1.5rem"
  }
})

export const StyledDownloadLayoutButton = chakra(Button, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "Poppins",
    fontWeight: 400
  }
})

export const StyledRequiredText = chakra(Text, {
  baseStyle: {
    color: "#1f1f1f",
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 400,
    width: "100%"
  }
})


export const StyledDescription = chakra(Text, {
  baseStyle: {
    color: "text.third",
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "150%",
    maxWidth: "31.0625rem"
  }
})

export const StyledImportFileWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    width: "100%"
  }
})

export const StyledTitle = chakra(Text, {
  baseStyle: {
    color: "text.third",
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: "100%",
  }
})

export const ActionsWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "6.25rem"
  }
})


export const StyledCompleteWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
  }
})


export const StyledCompleteTitle = chakra(Text, {
  baseStyle: {
    color: "1f1f1f",
    fontFamily: "Poppins",
    fontSize: "1.25rem",
    fontWeight: 500,
  }
})

export const StyledCompleteParagraph = chakra(Text, {
  baseStyle: {
    color: "text.third",
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.3125rem",
    textAlign: "center"
  }
})
