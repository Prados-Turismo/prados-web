import { getHost, pixelToRem } from "../utils";
import getTheme from "./getTheme";

const host = getHost();
const hostname = host.hostname;
const customTheme = getTheme(hostname);

const styles = {
  global: {
    "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontSize: {
        base: pixelToRem(14),
        md: pixelToRem(16),
      },
    },

    "::-webkit-scrollbar-track": {
      backgroundColor: "#f4f4f4",
    },
    "::-webkit-scrollbar": {
      width: "16px",
      background: "#f4f4f4",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#dad7d7",
      border: "unset !important",
      borderRadius: "unset !important",
      backgroundColor: "rgba(0, 0, 0, 0.2) !important",
    },

    ".swal2-icon.swal2-info": {
      borderColor: "brand.500",
      color: "brand.500",
    },

    ".swal2-actions": {
      flexDirection: "row-reverse",
      outline: "none",

      ".swal2-cancel": {
        borderRadius: "4px",
        minWidth: "100px",
        backgroundColor: "#F5F5F5",
        color: "#505050",
        // border: "1px solid",
        // borderColor: "brand.500",

        "&:hover": {
          background: "#F9F9F9 !important",
        },
      },

      ".swal2-confirm": {
        borderRadius: "4px",
        minWidth: "100px",
        backgroundColor: "brand.500",
        color: "contrast",

        "&:focus": {
          outline: "none",
          boxShadow: "none",
        },
      },
    },

    "html, body, #root": {
      height: "100%",
      backgroundColor: "#FFF",
    },

    "#root": {
      display: "flex",
      flexDirection: "column",
    },

    "body, input, textarea, select, button, table, tr, th": {
      fontFamily: "'Roboto', sans-serif !important",
      fontWeight: 400,
      color: "text.second",
    },

    button: {
      cursor: "pointer",
    },

    a: {
      color: "inherit",
      textDecoration: "none",
    },

    th: {
      textTransform: "unset !important",
      fontSize: "14px !important",
      fontWeight: "500 !important",
    },

    input: {
      _disabled: {
        bg: "hsl(0, 0%, 95%)",
        color: "hsl(0, 0%, 60%)",
        opacity: "1 !important",
      },

      _focusVisible: {
        outline: "none!important",
        boxShadow: "none!important",
      },
    },

    ".error": {
      fontSize: pixelToRem(14),
      color: "red.500",
    },

    ".required": {
      fontSize: pixelToRem(14),
      color: "red.500",
    },

    ".chakra-select__wrapper select:focus": {
      borderColor: "brand.500",
      boxShadow: "unset",

      "> option:hover": {
        background: "red",
      },
    },

    ".select-fields": {
      "> .select__control--menu-is-open": {
        borderColor: `${customTheme.colors.brand[500]} !important`,
        boxShadow: "unset",

        option: {
          background: "brand.500",
        },
      },
      ".select__option--is-selected": {
        backgroundColor: customTheme.colors.brand[500],
      },

      "> div:not(.select__menu)": {
        borderColor: "inherit",
        boxShadow: "unset",

        ".select__indicator-separator": {
          borderColor: "inherit",
          boxShadow: "unset",
        },
      },

      ".select__loading-indicator": {
        span: {
          width: "8px",
          height: "8px",
        },
      },

      "&.large": {
        flex: "1",
        "> div:not(.select__menu)": {
          height: "40px",
        },
      },

      "&.multi": {
        flex: "1"
      },
    },
  },
};

export default styles;
