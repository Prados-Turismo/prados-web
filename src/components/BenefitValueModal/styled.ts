import { chakra, Box } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const ModalContent = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    ".titleModal": {
      height: "50px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "30px",
      borderBottom: "1px solid #E5E5E5",
      fontSize: "14px",
      fontWeight: "bold",
      margin: 0,
    },

    ".benefitTitleModal": {
      color: "contrast",
      background: "brand.500",
      padding: "10px 5px",
      textAlign: "center",
      fontSize: pixelToRem(20),
    },

    ".benefitSubtitleModal": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      ".benefitSubtitleModalA, .benefitSubtitleModalB": {
        padding: "3px 0",
        textAlign: "center",
        fontSize: pixelToRem(16),
        fontWeight: "500",
        color: "#505050",
      },
    },

    ".modalBodyTable": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      ".modalBodyTableTitle": {
        display: "grid",
        gridTemplateColumns: "0.7fr 0.7fr 0.9fr 1fr",
        fontSize: pixelToRem(16),
        width: "100%",
        span: {
          textAlign: "center",
          background: "brand.500",
          color: "contrast",
        },
      },

      ".modalBodyTableTitle.modalRow": {
        gridTemplateColumns: "0.7fr 0.7fr",
      },

      ".modalBodyTableTitle.modalRow.parametersModal": {
        gridTemplateColumns: "0.7fr 0.7fr 0.9fr 1fr",
      },
    },

    ".modalBodyTableContent": {
      background: "#fff",
      width: "100%",
      padding: "0",
      display: "grid",
      gridTemplateColumns: "0.7fr 0.7fr 0.9fr 1fr",
      color: "#000",

      ".modalBodyColumn.titular": {
        textAlign: "center",
      },

      ".modalBodyColumn": {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        fontSize: pixelToRem(15),
        fontWeight: "500",
        textAlign: "center",
        // textAlign: "left",
        paddingLeft: 0,

        span: {
          background: "#E5E5E5",
          paddingTop: "2px",
          margin: "1px",
          minWidth: "150px",
        },
      },
    },

    ".modalBodyTableContent.modalRow": {
      gridTemplateColumns: "0.7fr 0.7fr",
    },

    ".modalBodyTableContent.modalRow.naoRegulamentado": {
      gridTemplateColumns: "1fr",
    },

    ".modalBodyTableContent.modalRow.parametersModal": {
      gridTemplateColumns: "0.7fr 0.7fr 0.9fr 1fr",
    },

    ".modalFooter": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 0",
    },

    // ".modalBodyColumn:nth-of-type(1) span": {
    //   paddingLeft: "10px",
    // },

    // ".modalBodyColumn:nth-of-type(2) span": {
    //   paddingLeft: "35px",
    // },

    // ".modalBodyColumn:nth-of-type(3) span": {
    //   paddingLeft: "50px",
    //   backgroundColor: "#f2f3f3",
    // },

    // ".modalBodyColumn:nth-of-type(4) span": {
    //   paddingLeft: "60px",
    // },

    ".modalBodyTableTitle span:nth-of-type(2)": {
      borderLeft: "1px solid white",
    },
  },
});
