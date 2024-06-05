import { IDataCollaborator } from "../../models/collaborator.model"

export interface IModalCompositionFamily {
  holder: IDataCollaborator
  title: string
  group: "P" | "A" | "F" | "CA" | "C"
  isOpen: boolean
  handleModal: () => void
}
