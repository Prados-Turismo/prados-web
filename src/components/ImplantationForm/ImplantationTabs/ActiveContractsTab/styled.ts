import { Box, Text, chakra } from "@chakra-ui/react";

export const StyledWrapper = chakra(Box, {
  baseStyle: {
    gap: "2rem",
    padding: "0.75rem 1.5rem",
    height: "100%",
  },
});

export const ContractAccordionDataWrapper = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

export const FormWrapper = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
});
export const Title = chakra(Text, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
});

export const HelpContentWrapper = chakra(Box, {
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
    gap: "1rem",
  },
});

export const HelpContentTitle = chakra(Text, {
  baseStyle: {
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
});

export const HelpContentDescription = chakra(Text, {
  baseStyle: {
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    lineHeight: "1.3125rem",
    color: "text.third",
  },
});

export const ActionsWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "6.25rem",
  },
});

export const NotSendMessageFeedback = chakra(Box, {
  baseStyle: {
    fontFamily: "Poppins",
    fontSize: "0.875rem",
    lineHeight: "1.3125rem",
    maxWidth: "30.625rem",
  },
});

export const HandleFieldWrapper = chakra(Box, {
  baseStyle: {
    width: "100%",
    padding: "1.125rem 1.5rem",
  },
});
