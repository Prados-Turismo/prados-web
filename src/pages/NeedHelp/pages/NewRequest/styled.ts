import {
  chakra,
  Box,
  Text as TextUI,
  Checkbox as CheckboxUI,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";
import { PopoverContentDescription, PopoverContentTitle } from "../../../../components/ImplantationForm/ImplantationTabs/ActiveContractsTab/ContractDataAccordion/styled";

export const Content = chakra(Box, {
  baseStyle: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    ".newRequestTitle": {
      color: "#333",
      fontSize: pixelToRem(24),
      display: "flex",
      flexDirection: "column",
      lineHeight: "150%",
      textAlign: "center",
      fontWeight: 500,

      span: {
        fontSize: pixelToRem(24),
        color: "brand.500",
      },
    },
    ".newRequestForm": {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      width: "100%",
      maxWidth: "638px",
      marginTop: "40px",

      label: {
        color: "text.third",

        span: {
          color: "brand.500",
        },
      },

      input: {
        height: "42px",
      },
    },
  },
});

export const Text = chakra(TextUI, {
  baseStyle: {
    color: "rgb(229, 62, 62)",
    fontSize: pixelToRem(15),
    padding: "5px 0 0 5px",
    textAlign: "left",
    alignItems: "left",
    fontWeight: "500",
  },
});

export const FilesBoxDescription = chakra(TextUI, {
  baseStyle: {
    fontSize: "0.875rem",
  },
});

export const FileContent = chakra(Box, {
  baseStyle: {
    backgroundColor: "brand.500",
    color: "brandSecond.50",
    fontSize: "0.875rem",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.625rem",
    padding: "0.125rem 0.5rem",
    borderRadius: "0.125rem",
    fontFamily: "Poppins",
  },
});

export const DropZoneContainer = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
});

export const DropzoneBox = chakra(Box, {
  baseStyle: {
    flex: 1,
    display: "flex",
    fontSize: pixelToRem(17),
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "text.fourth",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    justifyContent: "center",
    color: "brand.color",
    outline: "none",
    transition: "border ease-in-out",

    "&:hover": {
      cursor: "pointer",
      borderColor: "brand.500",
    },
  },
});

export const StyledComma = chakra(TextUI, {
  baseStyle: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "black",
  },
});

export const StyledCheckbox = chakra(CheckboxUI, {
  baseStyle: {
    "span[data-checked]:nth-child(2), span[data-checked][data-hover]:nth-child(2), span[data-checked]:nth-child(2):hover":
    {
      background: "brand.500",
      borderColor: "brand.500",
      color: "contrast",
    },
  },
});

export const CheckboxWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
});

export const CheckboxLabel = chakra(TextUI, {
  baseStyle: {
    fontSize: "0.875rem",
    fontWeight: 400,
    fontFamily: "Inter",
    color: "text.third",
  },
});

export const FilesWrapper = chakra(TextUI, {
  baseStyle: {
    width: "100%",
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export const FileWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
  },
});

export const StyledPopoverContent = chakra(PopoverContent, {
  baseStyle: {
    width: "410px",
    height: "112px",
  }
})

export const StyledBody = chakra(PopoverBody, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    gap: "1rem",
    padding: "1rem"
  }
})

export const StylePopoverTitle = chakra(PopoverContentTitle, {
  baseStyle: {
    textAlign: "start",
    color: "#333",
    fontWeight: "500",
    fontSize: "0.875rem"
  }
})

export const StylePopoverParagraph = chakra(PopoverContentDescription, {
  baseStyle: {
    textAlign: "start",
    color: "#707070",
    fontWeight: "400",
    fontSize: "14px",
    overflowWrap: "break-word",
    height: "fit-content",
    maxWidth: "378px",
    wordBreak: "break-all"
  }
})
