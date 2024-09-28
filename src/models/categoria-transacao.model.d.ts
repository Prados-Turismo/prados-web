export interface ICategoriaTransacaoArgs {
  page: number;
  size: number;
  nome: string
}

export interface ICategoriaTransacao {
  id: string,
  nome: string
  tipo: number
  SubCategoria: {
    id: string
    nome: string
  }
}

export interface ICategoriaTransacaoResponse {
  data: ICategoriaTransacao[];
  count: number;
  isLoading: boolean;
}

export interface ICreateCategoriaTransacaoArgs {
  nome: string;
  usuarioCadastro: string
}

export interface IUpdateCategoriaTransacaoArgs extends ICreateCategoriaTransacaoArgs {
  id: string
}

export interface ICreateCategoriaTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateCategoriaTransacaoArgs, unknown>;
}

export interface IUpdateCategoriaTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateCategoriaTransacaoArgs, unknown>;
}

export interface IDeleteCategoriaTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

