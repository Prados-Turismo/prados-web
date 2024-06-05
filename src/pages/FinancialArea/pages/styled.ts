import { chakra, Box, Input as InputUI } from "@chakra-ui/react";

export const SectionTop = chakra(Box, {
  baseStyle: {
    justifyContent: "end",
    flexDirection: "column",
    gap: "15px",
  },
});

export const Content = chakra(Box, {
  baseStyle: {
    height: "100%",
    ".competenceWrap": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: "15px",
      alignItems: "center",
      justifyContent: "space-between",

      "> span": {
        fontSize: "14px",
        lineHeight: "18px",
        color: "#7F7F7F",
      },

      "> div": {
        width: "100%",
      },
    },

    ".contentWrap": {
      flexGrow: 1,
    },
  },
});

export const Field = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    paddingRight: "0.75rem",
    border: " 1px solid #E5E5E5",
    borderRadius: "2px",
    maxHeight: "2.625rem",
    maxWidth: "12.5rem",
    ".SVG": {
      color: "text.forth",
      transition: "color 0.2s ease-in",
    },
    transition: "color 0.2s ease-in",
    "&:focus-within": {
      border: "1px solid",
      borderColor: "brand.500",
      ".SVG": {
        color: "brand.500",
      },
    },
  },
});

export const Input = chakra(InputUI, {
  baseStyle: {
    border: "none",
  },
});

export const FiltersWrapper = chakra(Box, {
  baseStyle: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
});
