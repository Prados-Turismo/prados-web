export interface IExcursaoOnibus {
  id: string
  numeroCadeira: string
  dataCadastro: Date
  codigoPassageiro: string
  codigoExcursao: string
  usuarioCadastro: string
}

export interface IExcursaoOnibusResponse extends IExcursaoOnibus {
  id: string
}

export interface ICreateExcursaoOnibusResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IExcursaoOnibus, unknown>;
}