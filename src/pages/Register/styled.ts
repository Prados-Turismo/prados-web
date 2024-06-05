import {
  Box,
  chakra,
  Button as ButtonUI,
  Text,
  Progress,
  Input as InputUI,
} from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const RegisterBox = chakra(Box, {
  baseStyle: {
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    padding: "15px",
  },
});

export const ModalBox = chakra(Box, {
  baseStyle: {
    maxW: "800px",
    width: "95%",
    maxHeight: "800px",
    display: "flex",
    flexDir: "column",
    justifyContent: "space-between",
    overflowX: "auto",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "8px",
    borderBottomRadius: "6px",
    boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",

    "&.screenHeight": {
      height: "95%",

      button: {
        margin: "10px 0 5px",
      },
    },
  },
});

export const Header = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    borderBottom: "1px solid rgba(229, 229, 229, 1)",

    "&.screenHeight": {
      height: "55px",
    },

    a: {
      fontSize: {
        base: pixelToRem(15),
        md: pixelToRem(16),
      },
      fontWeight: "500",
      color: "brand.500",
      "&:hover": {
        opacity: "0.8",
      },
    },
  },
});

export const Body = chakra(Box, {
  baseStyle: {
    padding: {
      base: "10px 10px 15px",
      md: "10px 30px 25px",
    },
    height: {
      base: "unset",
      md: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  },
});

export const FormBox = chakra(Box, {
  baseStyle: {
    width: "100%",
    overflow: "auto",
    padding: {
      base: "0 10px",
      md: "0 85px",
    },
    display: "flex",
    flexDir: "column",
    gap: "10px",
  },
});

export const Title = chakra(Box, {
  baseStyle: {
    color: "#000000",
    fontSize: {
      base: pixelToRem(22),
      md: pixelToRem(28),
    },

    textAlign: "center",
    margin: "5px 0 0",

    "&.screenHeight": {
      margin: {
        base: "30px 0 5px",
        md: "10px 0 20px",
      },
    },
  },
});

export const SubTitle = chakra(Box, {
  baseStyle: {
    color: "#707070",
    textAlign: "center",
    maxW: "570px",
    fontSize: pixelToRem(16),
    marginBottom: "10px",

    span: {
      color: "#e92043",
    },
    b: {
      fontWeight: 500,
      color: "#000000",
    },
  },
});

export const Input = chakra(InputUI, {
  baseStyle: {
    padding: "25px 20px",
  },
});

export const Button = chakra(ButtonUI, {
  baseStyle: {
    width: "100%",
    maxW: "570px",
    height: "52px",
    borderRadius: "4px",
    margin: "5px 0 5px",
    fontSize: pixelToRem(18),
    fontWeight: "500",
  },
});

export const BackButton = chakra(Text, {
  baseStyle: {
    fontSize: pixelToRem(18),
    fontWeight: "400",
    cursor: "pointer",
    color: "#000",

    "&:hover": {
      opacity: "0.8",
    },
  },
});

export const LoginButton = chakra(Box, {
  baseStyle: {
    fontSize: pixelToRem(16),
    fontWeight: 400,
    color: "#000",
    margin: "10px 0",

    a: {
      color: "brand.500",
      fontWeight: 500,

      "&:hover": {
        opacity: "0.8",
      },
    },
  },
});

export const ProgressBar = chakra(Progress, {
  baseStyle: {
    height: "4px",
    minH: "4px",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",

    div: {
      backgroundColor: "brand.500",
    },
  },
});

export const Logo = chakra(Box, {
  baseStyle: {
    width: "170px",
    height: "70px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center left",
    textIndent: "-99999px",
  },
});
