import { chakra, Box } from "@chakra-ui/react";

export const ComponentWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    height: "100%",
    // minHeight: "calc(100% - 40px)",
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
  },
});

export const MenuWrap = chakra(Box, {
  baseStyle: {
    width: "100%",
    height: "100px",
    minHeight: "100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "18px 30px",
    borderBottom: "1px solid #E5E5E5",
    alignItems: "center",
  },
});
