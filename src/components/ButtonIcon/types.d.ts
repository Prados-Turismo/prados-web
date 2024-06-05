import { PlacementWithLogical } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface IButtonButtonIcon {
  children: ReactNode;
  style?: IntrinsicAttributes;
  tooltip?: string;
  placement?: PlacementWithLogical;
  isLoading?: boolean;
}
