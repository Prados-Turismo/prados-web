import { chakra, Box } from "@chakra-ui/react";

export const Scroll = chakra(Box, {
  baseStyle: {
    padding: "15px",
    overflow: "auto",
    flexGrow: {
      base: 0,
      lg: 1,
    },
  },
});

export const Table = chakra(Box, {
  baseStyle: {
    maxHeight: {
      // base: "60vh",
    },
    padding: {
      base: "15px",
    },
    overflow: {
      base: "auto",
    },
    // flexGrow: {
    //   base: 0,
    //   lg: 1,
    // },

    // width: {
    //   base: "100%",
    //   "2xl": "100%",
    // },
    // minWidth: "840px",
    paddingTop: "10px",
    display: "flex",
    flexDirection: "column",
    // overflowY: "hidden",
    gap: "15px",
  },
});

export const THead = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    minWidth: "1057px",
    padding: "0 30px 0 30px",

    span: {
      fontWeight: 700,
      color: "text.second",
    },
  },
});

export const TBody = chakra(Box, {
  baseStyle: {
    maxHeight: {
      // lg: "60vh",
    },
    padding: {
      lg: "0 15px",
    },
    // overflow: {
    //   lg: "auto",
    // },
    // flexGrow: {
    //   base: 0,
    //   lg: 1,
    // },

    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
});

export const TR = chakra(Box, {
  baseStyle: {
    height: "max-content",
    background: "#fff",
    minWidth: "1030px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid #E5E5E5",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    padding: "0 15px",

    span: {
      color: "text.second",
    },

    "&.parameterizerTR": {
      zIndex: 1,
    },

    "&.clickable": {
      ":hover": {
        background: "#e5e5e5",
      },
    },
  },
});

export const TD = chakra("span", {
  baseStyle: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40px",
    fontSize: "14px",
    textAlign: "center",
    "&.benefitTD:hover": {
      color: "brand.500",
    },
    "& span": {
      fontSize: "14px",
    },
  },
});

export const TH = chakra("span", {
  baseStyle: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "600 !important",
    textAlign: "center",
  },
});

export const IconsGroup = chakra("span", {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "20px",
    fontSize: "20px",
  },
});

export const TRWrap = chakra(Box, {
  baseStyle: {
    cursor: "pointer",
  },
});

export const TableChild = chakra(Box, {
  baseStyle: {
    background: "rgb(255, 255, 255)",
    border: "1px solid rgb(217, 217, 217)",
    borderRadius: "0px 0px 10px 10px",
    margin: "0px 5px",
    paddingTop: "30px",

    "> div:last-child": {
      "> div": {
        border: "none",
      },
    },
  },
});

export const TableLoading = chakra(Box, {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    minHeight: "290px",
  },
});
