export interface IDataReasons {
  id: number
  motivoCancelamento: string
}

export interface IReasonsResponse {
  data: IDataReasons[]
  isLoading: boolean
}

export interface IUseReasonsResponse {
  getReasons: () => IReasonsResponse
}
