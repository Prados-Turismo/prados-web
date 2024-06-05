import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const Section = chakra("section", {
  baseStyle: {
    width: "100%",
    padding: {
      base: "50px 30px 30px 0",
      xl: "50px 30px 30px 0",
      "2xl": "50px 30px 30px 0",
    },
    display: "flex",
    flexDirection: "row",
    gap: "25px",
  },
});

export const AvatarWrap = chakra(Box, {
  baseStyle: {
    width: {
      base: "110px",
      lg: "205px",
      xl: "275px",
      "2xl": "100%",
    },
    maxWidth: "400px",
    height: {
      base: "160px",
      lg: "300px",
      xl: "360px",
      "2xl": "590px",
    },
    backgroundPosition: "0 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: {
      base: "absolute",
      lg: "relative",
    },
    left: 0,
  },
});

export const ContentWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
  },
});

export const Hi = chakra("h2", {
  baseStyle: {
    fontSize: {
      base: pixelToRem(26),
      lg: pixelToRem(33),
      "2xl": pixelToRem(40),
    },
    fontWeight: "bold",
    color: "text.second",
    paddingLeft: {
      base: "120px",
      lg: "unset",
    },
  },
});

export const Company = chakra("h2", {
  baseStyle: {
    fontSize: {
      base: pixelToRem(26),
      lg: pixelToRem(35),
      "2xl": pixelToRem(40),
    },
    span: {
      fontSize: {
        base: pixelToRem(26),
        lg: pixelToRem(35),
        "2xl": pixelToRem(40),
      },
    },
    fontWeight: "bold",
    color: "text.second",
    paddingLeft: {
      base: "120px",
      lg: "unset",
    },
  },
});

export const Frase = chakra("p", {
  baseStyle: {
    marginTop: {
      base: "10px",
      xl: "10px",
    },
    fontSize: {
      base: pixelToRem(18),
      lg: pixelToRem(20),
    },
    color: "text.third",
    paddingLeft: {
      base: "80px",
      lg: "unset",
    },
  },
});

export const Cards = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: {
      base: "center",
      lg: "unset",
    },
    gap: "10px",
    marginTop: {
      base: "15px",
      "2xl": "30px",
    },
    flexWrap: "wrap",
  },
});
