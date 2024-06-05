import { ReactNode } from "react";

export interface IButtonSidebar {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}
