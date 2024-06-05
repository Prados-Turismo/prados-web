export interface IPermissionsData {
  id: string
  domain: string
  action: string
  profileId: string
}

export interface IPermissionsArgs {
  userId: string | null
  companyId: string | null
}

export interface IPermissionsResponse {
  data: string[]
  isLoading: boolean
}

export interface IUsePermissionsResponse {
  getPermissions: (arg: IPermissionsArgs) => IPermissionsResponse
}
