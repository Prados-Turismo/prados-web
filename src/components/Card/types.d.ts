import { ReactNode } from "react";

export interface ICard {
  icon: ReactNode;
  title: string;
  text: string;
  link: string;
  isDisabled: boolean;
  idButton?: string;
  isUrl: boolean;
  alertText?: string;
}
