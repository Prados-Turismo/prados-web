import { chakra, Box } from "@chakra-ui/react";

export const Wrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "15px",
    padding: "0 15px",
  },
});

export const Section = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: {
      base: "column",
      lg: "row",
    },
    gap: "15px",
  },
});

export const Aside = chakra(Box, {
  baseStyle: {
    width: "100%",
    maxWidth: {
      lg: "360px",
    },
    display: "flex",
    flexDirection: "column",
    border: "1px solid #E5E5E5",
    borderRadius: {
      base: "4px",
      lg: "4px 4px 0 0",
    },
    // borderBottom: {
    //   lg: "none"
    // },
    padding: "15px",
  },
});

export const Article = chakra(Box, {
  baseStyle: {
    width: {
      base: "100%",
    },
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    border: "1px solid #E5E5E5",
    borderRadius: {
      base: "4px",
      lg: "4px 4px 0 0",
    },
    // borderBottom: {
    //   lg: "none",
    // },
    paddingBottom: "40px",
  },
});
