export interface IConfiguracaoArgs {
  page: number;
  size: number;
  nome: string
  status?: number | string | null
}

export interface IConfiguracao {
  id: string
  tipo: string
  configuracao: string
  idUsuario: string
}

export interface IConfiguracaoResponse {
  data: IConfiguracao[];
  count: number;
  isLoading: boolean;
}

export interface ICreateConfiguracaoArgs {
  nome: string
  ativo: boolean
  saldo: number
  usuarioCadastro: string
}

export interface IUpdateConfiguracaoArgs extends ICreateConfiguracaoArgs {
  id: string
}

export interface ICreateConfiguracaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateConfiguracaoArgs, unknown>;
}

export interface IUpdateConfiguracaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateConfiguracaoArgs, unknown>;
}

export interface IDeleteConfiguracaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
