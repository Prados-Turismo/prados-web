import {
  chakra,
  Th as ThUI,
  Td as TdUI,
  Tbody as TbodyUI,
} from "@chakra-ui/react";

export const Th = chakra(ThUI, {
  baseStyle: {
    padding: "22px 10px",
    textAlign: "center",
  },
});

export const Td = chakra(TdUI, {
  baseStyle: {
    textAlign: "center",
  },
});

export const Tbody = chakra(TbodyUI, {
  baseStyle: {
    tr: {
      background: "#FBFBFB",
    },

    "tr td": {
      padding: "5px 0",
    },

    "tr:nth-of-type(odd) td": {
      background: "white",
    },

    "tr td:first-of-type": {
      fontWeight: 600,
    },
  },
});
