import { ICompany } from "./company.model"
import { IHub } from "./hubs.model"

export interface ICorretorsHubsResponse {
  hubsData: IHub[]
  loadingHubs: boolean
}

export interface ICorretorsCompanyResponse {
  companyData: ICompany[]
  loadingCompany: boolean
}

export interface IMultiUserResponse {
  getCorretorsHubs: () => ICorretorsHubsResponse
  getCorretorsCompany: (idHub: number) => ICorretorsCompanyResponse
}
