export interface IExcursaoQuarto {
  Passageiros: [{
    Pessoa: {
      id: string,
      nome: string
    }
    id: string,
    reserva: string
  }]
  id: string
  codigoExcursao: string
  numeroQuarto: string
  usuarioCadastro: string
  TipoQuarto: {
    id: string
    nome: string
  }
}

export interface IExcursaoQuartoArgs {
  page: number;
  size: number;
}

export interface IDataPassageiroExcursaoQuarto {
  id: string,
  nome: string,
  reserva: string
}

export interface IPassageiroExcursaoQuartoResponse {
  data: IDataPassageiroExcursaoQuarto[]
  count: number
  isLoading: boolean
}

export interface IExcursaoQuartoResponse {
  data: IExcursaoQuarto[];
  count: number;
  isLoading: boolean;
}

export interface ICreateExcursaoQuartoArgs {
  numeroQuarto: string
  passageiros: [string]
  codigoExcursao: string
  usuarioCadastro: string
}

export interface IUpdateExcursaoQuartoArgs extends ICreateExcursaoQuartoArgs {
  id: string
}

export interface ICreateExcursaoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateExcursaoQuartoArgs, unknown>;
}

export interface IUpdateExcursaoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateExcursaoQuartoArgs, unknown>;
}

export interface IDeleteExcursaoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
