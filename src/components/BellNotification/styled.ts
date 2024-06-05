import { chakra, Flex, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const NotificationBox = chakra(Flex, {
  baseStyle: {
    padding: "15px 20px",
    borderBottom: "1px solid #E5E5E5",
    gap: "18px",

    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#F2F2F2",
    },
  },
});

export const NotificationContent = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",

    width: "100%",

    ".notificationHeader": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",

      ".notificationTitle": {
        fontSize: pixelToRem(14),
        fontWeight: 500,
        cursor: "pointer",
        width: "100%",
      },

      ".notificationTime": {
        color: "#707070",
        fontSize: pixelToRem(12),
        minW: "80px",
      },
    },

    ".notificationBody": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",

      ".notificationText": {
        fontSize: pixelToRem(14),
        cursor: "pointer",
        width: "100%",
      },

      ".notificationStatus": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "16px",
        minW: "16px",
        height: "16px",
        borderRadius: "100%",
        cursor: "pointer",

        div: {
          width: "8px",
          minW: "8px",
          height: "8px",
          borderRadius: "100%",
          backgroundColor: "brand.500",
        },

        border: "none",

        "&.read": {
          border: "1px solid #E5E5E5",

          div: {
            backgroundColor: "white",
          },
        },

        "&:hover": {
          border: "1px solid #E5E5E5",

          div: {
            backgroundColor: "white",
          },

          "&.read": {
            div: {
              backgroundColor: "brand.500",
            },
          },
        },
      },
    },
  },
});

export const Icon = chakra(Box, {
  baseStyle: {
    width: "40px",
    minW: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brand.500",
    borderRadius: "100px",
    fontSize: pixelToRem(20),

    "& svg": {
      color: "contrast",
    },
  },
});
