export interface IContaBancariaArgs {
  page: number;
  size: number;
}

export interface IContaBancaria {
  id: string
  nome: string
  ativo: boolean
  saldo: number
}

export interface IContaBancariaResponse {
  data: IContaBancaria[];
  count: number;
  isLoading: boolean;
}

export interface ICreateContaBancariaArgs {
  nome: string
  ativo: boolean
  saldo: number
  usuarioCadastro: string
}

export interface IUpdateContaBancariaArgs extends ICreateContaBancariaArgs {
  id: string
}

export interface ICreateContaBancariaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateContaBancariaArgs, unknown>;
}

export interface IUpdateContaBancariaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateContaBancariaArgs, unknown>;
}

export interface IDeleteContaBancariaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

