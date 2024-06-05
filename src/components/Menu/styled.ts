import {
  chakra,
  Box,
  Button,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";

export const DrawerHeaderMain = chakra(DrawerHeader, {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    borderBottomWidth: "1px",
  },
});

export const DrawerBodyMain = chakra(DrawerBody, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
  },
});

export const DrawerFooterMain = chakra(DrawerFooter, {
  baseStyle: {
    borderTopWidth: "1px",
  },
});

export const MenuWithLogo = chakra(Box, {
  baseStyle: {
    display: "flex",
    width: {
      base: "100%",
      // xl: "unset"
    },
    margin: {
      base: "0 -66px 0 0",
      xl: "unset",
    },
    alignItems: "center",
    justifyContent: {
      base: "center",
      xl: "unset",
    },
    flexDirection: "row",
    gap: {
      base: "10px",
      xl: "10px",
    },
  },
});

export const ButtonOpenMenuMobile = chakra(Button, {
  baseStyle: {
    width: "40px",
    height: "40px",
    padding: "0",
    outline: "none",
    borderRadius: "0.375rem",
    border: "1px solid #e2e8f0",
    background: "transparent",
    color: "#505050",
    "&:hover": {
      background: "#f1efef",
    },
  },
  variants: "outline",
});

export const Logo = chakra(Box, {
  baseStyle: {
    width: "120px",
    height: "42px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    textIndent: "-99999px",
  },
});

export const LogoMobile = chakra(Box, {
  baseStyle: {
    width: "111px",
    height: "42px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    textIndent: "-99999px",
  },
});

export const MenuMain = chakra(Box, {
  baseStyle: {
    width: "100%",
    paddingRight: "20px",
    display: {
      base: "none",
      xl: "flex",
    },
  },
});

export const MenuMainMobile = chakra(Box, {
  baseStyle: {
    display: {
      base: "flex",
      xl: "none",
    },
    position: "absolute",
    left: "30px",
  },
});
