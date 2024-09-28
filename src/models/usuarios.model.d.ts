export interface IUsuarioArgs {
  page: number;
  size: number;
  status?: string | number | null
  nome: string
}

export interface IUsuario {
  id: string
  nome: string
  username: string
  password: string
  dataCadastro: Date
  usuarioCadastro: string | null
  tipo: number
  email: string
  ativo: boolean
  comissao: number | null
  meta: number | null
}

export interface IUsuarioResponse {
  data: IUsuario[];
  count: number;
  isLoading: boolean;
}

export interface ICreateUsuarioArgs {
  nome: string
  username: string
  password: string
  dataCadastro: Date
  usuarioCadastro: string
  tipo: number
  email: string
  ativo: boolean
  comissao: number | null
  meta: number | null
}

export interface IUpdateUsuarioArgs extends ICreateUsuarioArgs {
  id: string
}

export interface ICreateUsuarioResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateUsuarioArgs, unknown>;
}

export interface IUpdateUsuarioResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateUsuarioArgs, unknown>;
}

export interface IDeleteUsuarioResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

