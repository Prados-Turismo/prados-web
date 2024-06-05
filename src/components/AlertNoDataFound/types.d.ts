import { ReactNode } from "react";

export interface IAlerNoDataFound {
  title?: string;
  description?: ReactNode;
  buttonTitle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  minH?: string;
}
