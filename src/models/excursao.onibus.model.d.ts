export interface IExcursaoOnibus {
  id: string
  numeroCadeira: string
  codigoPassageiro: string
  codigoExcursao: string
  usuarioCadastro: string
  Passageiro: {
    Pessoa: {
      id: string
      nome: string
    }
  }
}

export interface ICreateExcursaoOnibusArgs {
  numeroCadeira: string
  codigoExcursao: string
  codigoPassageiro: string
  usuarioCadastro: string
}

export interface IExcursaoOnibusArgs {
  page: number;
  size: number;
}

export interface IExcursaoOnibusResponse {
  data: IExcursaoOnibus[];
  count: number;
  isLoading: boolean;
}

export interface IExcursaoOnibusAcentosResponse {
  data: Array<IExcursaoOnibus>;
  count: number;
  isLoading: boolean;
}

export interface ICreateExcursaoOnibusResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IExcursaoOnibus, unknown>;
}

export interface IOnibusAcentos {
  data: Array<number>
  count: number
}


export interface IPassageiroExcursaoOnibusResponse {
  data: {
    id: string
    Pessoa: {
      id: string
      nome: string
    }
    reserva: number
  }[]
  count: number
  isLoading: boolean
}