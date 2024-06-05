import { chakra, Box, keyframes } from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingWrap = chakra(Box, {
  baseStyle: {
    position: "relative",
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "40px 0 60px",

    ".loadingLoader": {
      height: "200px",
      width: "200px",
      position: "absolute",
      borderTop: "2px solid gray",
      borderBottom: "2px solid gray",
      borderRadius: "50%",
      animation: `${spin} 2s infinite linear`,
    },

    ".loadingBox": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",

      img: {
        width: "100px",
      },

      p: {
        fontSize: "16px",
      },
    },
  },
});
