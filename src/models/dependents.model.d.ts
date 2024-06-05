export interface IDataParantage {
  id: number
  nomeParentesco: string
}

export interface IParentageResponse {
  data: IDataParantage[]
  isLoading: boolean
}

export interface IDataCivilStatus {
  id: number
  nomeEstadoCivil: string
}

export interface ICivilStatusResponse {
  data: IDataCivilStatus[]
  isLoading: boolean
}

export interface IUseDependentResponse {
  getParentage: () => IParentageResponse
  getCivilStatus: () => ICivilStatusResponse
}
