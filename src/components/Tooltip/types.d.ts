import { PlacementWithLogical } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface ITooltip {
  children: ReactNode;
  label: string | JSX.Element;
  placement?: PlacementWithLogical;
}
