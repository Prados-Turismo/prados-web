/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDataDisableCollaborator } from "../../../../models/collaborator.model";

export interface IUploadDropzoneRow {
  doc: IDataDisableCollaborator;
  setDocumentsSelected: React.Dispatch<any>;
  documentsSelected: any;
}
