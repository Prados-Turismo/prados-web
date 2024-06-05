import { Box, chakra } from "@chakra-ui/react";

export const StyledWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    padding: "0.75rem 1.5rem",
    width: "100%",
    height: "100%"
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

export const SelectLabelWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem"
  }
})

export const BrokerNameWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }
})
