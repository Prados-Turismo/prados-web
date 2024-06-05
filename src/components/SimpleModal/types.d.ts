import { ReactNode } from "react";

export interface ISimpleModal {
  isOpen: boolean;
  children: ReactNode;
  footer?: ReactNode;
  title?: string | null;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "full"
    | "xs"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  minHeight?: string;
  contentExtraLarge?: boolean;
  handleModal: (e: boolean) => void;
  isLoading?: boolean;
  scrollBehavior?: "inside" | "outside";
}
