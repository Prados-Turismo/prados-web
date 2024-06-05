import { ILegalDocument } from "../../../../models/complete-registration";

export interface IDocumentsForm {
  isLoading: boolean;
  data: ILegalDocument[];
}
