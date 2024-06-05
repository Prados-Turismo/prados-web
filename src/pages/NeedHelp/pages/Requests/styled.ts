import {
  chakra,
  Box,
  PopoverContent,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";
import {
  PopoverContentDescription,
  PopoverContentTitle,
} from "../../../../components/ImplantationForm/ImplantationTabs/ActiveContractsTab/ContractDataAccordion/styled";

export const Content = chakra(Box, {
  baseStyle: {
    height: "100%",
    ".alertMessage": {
      display: "flex",
      justifyContent: "center",
      fontSize: pixelToRem(14),
      marginLeft: "20px",
    },
  },
});

export const StyledPopoverContent = chakra(PopoverContent, {
  baseStyle: {
    width: "410px",
    height: "112px",
  },
});

export const StyledBody = chakra(PopoverBody, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    gap: "1rem",
    padding: "1rem",
  },
});

export const StylePopoverTitle = chakra(PopoverContentTitle, {
  baseStyle: {
    textAlign: "start",
    color: "#333",
    fontWeight: "500",
    fontSize: "0.875rem",
  },
});

export const StylePopoverParagraph = chakra(PopoverContentDescription, {
  baseStyle: {
    textAlign: "start",
    color: "#707070",
    fontWeight: "400",
    fontSize: "14px",
    overflowWrap: "break-word",
    height: "fit-content",
    maxWidth: "378px",
    wordBreak: "break-all",
  },
});
