import { ILegalDocument } from "../../../../../../models/complete-registration";

export interface IInputFile {
  label: string;
  type: string;
  data: ILegalDocument[];
  helpTitle?: string;
  helpDescription?: string;
  helpSubDescription?: string;
  isRequerid?: boolean;
}
