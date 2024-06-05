import { chakra, Box, Switch as SwitchUI } from "@chakra-ui/react";
import { pixelToRem } from "../../../../../utils";

export const ChatContent = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "300px",
    width: "100%",
    height: "max-content",
    background: "#fafafa",
  },
});

export const ChatScroll = chakra(Box, {
  baseStyle: {
    height: "max-content",
    maxHeight: "400px",
    width: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column-reverse",
  },
});

export const ChatNewContent = chakra(Box, {
  baseStyle: {
    padding: "20px 20px 20px 10px",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: "max-content",
    margin: "30px 0",
  },
});

export const DropZoneContainer = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
});

export const Switch = chakra(SwitchUI, {
  baseStyle: {
    "span[data-checked]": {
      backgroundColor: "brand.500",
      span: {
        backgroundColor: "#fff",
      },
    },
  },
});

export const DropzoneBox = chakra(Box, {
  baseStyle: {
    flex: 1,
    display: "flex",
    fontSize: pixelToRem(17),
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "brand.500",
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    color: "brand.color",
    outline: "none",
    transition: "border .24s ease-in-out",

    "&:hover": {
      cursor: "pointer",
      borderStyle: "solid",
    },
  },
});
