import { IDataCollaborator } from "../../../models/collaborator.model";

export interface IBenefitsManagementProps {
  holder: IDataCollaborator;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
}
