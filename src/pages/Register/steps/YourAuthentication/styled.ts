import { PinInputField as PinInputFieldUI, chakra } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

export const PinInputField = chakra(PinInputFieldUI, {
  baseStyle: {
    border: "unset",
    backgroundColor: "white",
    borderBottom: "1px solid #D9D9D9",
    borderRadius: "unset",
    w: "64px",
    h: "50px",
    fontSize: pixelToRem(24),
    fontWeight: 600,
  },
});
