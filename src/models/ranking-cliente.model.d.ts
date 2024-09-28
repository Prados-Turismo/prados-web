export interface IRankingClienteArgs {
  page: number;
  size: number;
  nome: string
}

export interface IRankingCliente {
  id: string
  nome: string
  qtdMinViagens: number
  qtdMaxViagens: number
  usuariosId: string
}

export interface IRankingClienteResponse {
  data: IRankingCliente[];
  count: number;
  isLoading: boolean;
}

export interface ICreateRankingClienteArgs {
  nome: string
  qtdMinViagens: number
  qtdMaxViagens: number
  usuariosId: string
}

export interface IUpdateRankingClienteArgs extends ICreateRankingClienteArgs {
  id: string
}

export interface ICreateRankingClienteResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateRankingClienteArgs, unknown>;
}

export interface IUpdateRankingClienteResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateRankingClienteArgs, unknown>;
}

export interface IDeleteRankingClienteResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

