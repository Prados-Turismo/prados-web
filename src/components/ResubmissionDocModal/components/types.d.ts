import { IDataPersonDoc } from "../../../models/collaborator.model";

export interface IDocumentUploadRow {
  doc: IDataPersonDoc;
  count: number;
  setShowModal: (e: boolean) => void;
  proposalId: string;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  ísFetching: boolean;
}
