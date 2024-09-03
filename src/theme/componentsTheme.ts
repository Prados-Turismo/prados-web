import { pixelToRem } from "../utils";

const componentsTheme = {
  Button: {
    baseStyle: {
      borderRadius: "100px",
    },
    defaultProps: {
      colorScheme: "orange",
    },
    variants: {
      solid: () => ({
        fontWeight: 400,
        fontSize: pixelToRem(14),
        color: "contrast",
      }),

      outline: () => ({
        fontWeight: 400,
        fontSize: pixelToRem(14),
        borderColor: "brand.500",
        color: "brand.500",
      }),

      contrast: () => ({
        fontWeight: 400,
        fontSize: pixelToRem(14),
        border: "1px solid #dadada",
        borderRadius: "4px",
        color: "text.second",

        ":hover, &.active": {
          backgroundColor: "brand.500",
          border: "1px solid transparent",
          color: "contrast",
        },
      }),
    },
  },
  Input: {
    sizes: {
      md: {
        field: {
          height: "40px",
          padding: "0 8px",
        },
      },
    },
    defaultProps: {
      focusBorderColor: "#9db4ce",
    },
  },
};

export default componentsTheme;
