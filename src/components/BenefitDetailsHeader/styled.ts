import { chakra, Box } from "@chakra-ui/react";

export const Content = chakra(Box, {
  baseStyle: {
    display: "flex",
    padding: "24px",
    gap: "15px",
    color: "#1F1F1F",
    flexWrap: "wrap",

    li: {
      listStyle: "none",
    },

    ".detailsColumnA, .detailsColumnB": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      rowGap: "15px",
    },

    ".detailsColumnA": {
      fontWeight: "400",
      color: "#909090",
    },

    ".detailsColumnB": {
      color: "#121212",
      marginRight: "20px",
    },
  },
});
