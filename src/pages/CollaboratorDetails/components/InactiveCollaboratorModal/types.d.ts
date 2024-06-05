import { IDataDisableCollaborator } from "../../../../models/collaborator.model";

export interface IInactiveCollaboratorModal {
  setModal: () => void;
  modal: boolean;
  collaboratorId: string;
  setActiveContracts: React.Dispatch<
    React.SetStateAction<IDataDisableCollaborator[] | null>
  >;
}
