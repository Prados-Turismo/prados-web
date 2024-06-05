import { IColaborator } from "../../../../../models/userManagement.model"
import { IReactSelected } from "../../../types"

export interface ITRUserManagement {
  user: IColaborator
  userTypeSelected: IReactSelected
  status: string
  IdsInTheCompany: any[] | null
}
