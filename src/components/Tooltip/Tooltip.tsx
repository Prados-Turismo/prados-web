import { Tooltip as TooltipUI } from "@chakra-ui/react";

// Types
import { ITooltip } from "./types";

const Tooltip = ({ children, label, placement = "top" }: ITooltip) => {
  return (
    <TooltipUI
      hasArrow
      label={label}
      placement={placement}
      bg="brand.500"
      color="contrast"
    >
      {children}
    </TooltipUI>
  );
};

export default Tooltip;
