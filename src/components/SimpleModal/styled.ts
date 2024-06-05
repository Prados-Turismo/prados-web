import { chakra, ModalHeader as ModalHeaderUI } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

export const ModalHeader = chakra(ModalHeaderUI, {
  baseStyle: {
    display: "flex",
    height: "55px",
    alignItems: "center",
    padding: "12px 32px 12px 25px",
    borderBottom: "1px solid #E5E5E5",
    fontWeight: 500,
    color: "text.first",
    fontSize: pixelToRem(17),
  },
});
