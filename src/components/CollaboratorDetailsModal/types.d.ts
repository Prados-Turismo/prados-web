import { IBeneficiario } from "../../models/corretorContract.model"

export interface ICollaboratorDetailsModalModal {
  collaborator: IBeneficiario
  showModal: boolean
  setShowModal: (e: boolean) => void
}
