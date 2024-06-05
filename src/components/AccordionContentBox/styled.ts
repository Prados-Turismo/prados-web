import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const Content = chakra(Box, {
  baseStyle: {
    zIndex: "2",
    background: "#F9F9F9",
    minWidth: "1030px",
    margin: "-10px 0 30px 0",
    padding: "0 20px 20px",
    border: "1px solid #E5E5E5",
    borderTop: "unset",
    opacity: 0,
    transform: "translateY(-20px)",
    animation: "animeLeft 0.3s forwards",

    "@keyframes animeLeft": {
      to: {
        opacity: 1,
        transform: "initial",
      },
    },
  },
});

export const Title = chakra(Box, {
  baseStyle: {
    color: "#1F1F1F",
    fontSize: pixelToRem(18),
    textAlign: "center",
    padding: "20px 0 10px",
  },
});

export const SubTitle = chakra(Box, {
  baseStyle: {
    fontSize: pixelToRem(15),
    padding: "0 20px 8px",
  },
});

export const ContentBox = chakra(Box, {
  baseStyle: {},
});
