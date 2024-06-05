import { ReactNode } from "react";

export interface IFormInputFile {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  helpTitle?: string;
  helpDescription?: string;
  helpSubDescription?: string;
  isLoading: boolean;
  tags?: ReactNode;
  isRequerid?: boolean;
}
