import { ISelect } from "../../../../models/generics.model"
import { IBenefitsManagementProps } from "../../pages/types"

export interface IHolderAndDependentsSelect extends IBenefitsManagementProps {
  setUserSelected: React.Dispatch<React.SetStateAction<ISelect | null>>
  userSelected: ISelect | null
}
