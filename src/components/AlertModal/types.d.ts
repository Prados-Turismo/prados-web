import { ReactNode } from "react";

export interface IAlertModal {
  showModal: boolean;
  isDisabled?: boolean;
  setShowModal: (e: boolean) => void;
  request: () => void;
  question?: string;
  isLoading?: boolean;
  cancelButtonTitle?: string;
  confirmButtonTitle?: string;
  hasNotCancelButton?: boolean;
  title?: string;
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
  children?: ReactNode;
}
