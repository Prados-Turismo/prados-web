export interface ITipoQuartoArgs {
  page: number;
  size: number;
  nome: string
  status?: string | null | number
}

export interface ITipoQuarto {
  id: string,
  nome: string
}

export interface ITipoQuartoResponse {
  data: ITipoQuarto[];
  count: number;
  isLoading: boolean;
}

export interface ICreateTipoQuartoArgs {
  nome: string;
  usuarioCadastro: string
}

export interface IUpdateTipoQuartoArgs extends ICreateTipoQuartoArgs {
  id: string
}

export interface ICreateTipoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateTipoQuartoArgs, unknown>;
}

export interface IUpdateTipoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateTipoQuartoArgs, unknown>;
}

export interface IDeleteTipoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

