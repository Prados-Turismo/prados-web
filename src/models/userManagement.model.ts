export interface IUserManagementData {
  id: string
  username: string
  email: string
  active: boolean
  createdAt: Date
}

export interface IDataPermissions {
  action: string
  domain: string
  id: string
  profileId: string
}

export interface IUsePermissionsArgs {
  roleId: number
}

export interface IUsePermissionsActivedArgs {
  userId: number
  roleId: number
}

export interface IUsePermissionsResponse {
  data: IDataPermissions[]
  isLoading: boolean
}

export interface IUsePermissionsActivedResponse {
  data: IDataPermissions[]
  isLoading: boolean
}
export interface IUpdateBlockedUserArgs {
  blocked: boolean
  id: number | null
  userTypeSelected: number
  status: string
  IdsInTheCompany: [] | null
}

export interface IUserSavePermissionsArgs {
  id: number
  permissions: string[]
}

export interface IUpdateBlokedUserResponse {
  isLoading: boolean
  mutate: any
}

export interface IUseSavePermissionsResponse {
  isLoading: boolean
  mutate: any
}

export interface ICompanyUsersArgs {
  companyId: number | undefined
}

export interface IBlokerUsersArgs {
  empresaHubId: number | null
}

export interface ICompanyUsersResponse {
  data: IColaborator[]
  isLoading: boolean
}

export interface IColaborator {
  id: string
  username: string
  email: string
  active: boolean
  createdAt: Date
}

export interface IColaboratorResponse {
  count: number
  rows: IColaborator[]
}
