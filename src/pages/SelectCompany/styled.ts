import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const Section = chakra("section", {
  baseStyle: {
    width: "100%",
    height: "100%",
    padding: {
      base: "50px 0 0 0",
      xl: "50px 30px 0 0",
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

export const ListCompaniesWrap = chakra(Box, {
  baseStyle: {
    height: "100%",
    border: "1px solid #E5E5E5",
    // borderBottom: "none",
    borderRadius: "10px 10px 0 0",
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

export const UserName = chakra("h2", {
  baseStyle: {
    fontSize: {
      base: pixelToRem(26),
      lg: pixelToRem(35),
      "2xl": pixelToRem(40),
    },
    fontWeight: "bold",
    color: "brand.500",
    paddingLeft: {
      base: "120px",
      lg: "unset",
    },
  },
});

export const Phrase = chakra("p", {
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
      base: "120px",
      lg: "unset",
    },
  },
});
