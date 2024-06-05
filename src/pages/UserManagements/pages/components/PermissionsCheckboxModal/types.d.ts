import { IDataPermissions } from "../../../../../models/userManagement.model"

export interface IPermissionsCheckbox {
  roleId: number
  user: IUserManagementData
  setPermissionsModal: React.Dispatch<React.SetStateAction<boolean>>
  permissionsModal: boolean
  userTypeSelected: IReactSelected
}

export interface ICheckboxContent {
  data: IDataPermissions[]
  dataActived: IDataPermissions[]
  isLoadingSave: boolean
  setPermissionsModal: React.Dispatch<React.SetStateAction<boolean>>
  savePermissions: any
  user: IUserManagementData
}
