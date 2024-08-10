export interface ISubCategoriaTransacaoArgs {
  page: number;
  size: number;
}

export interface ISubCategoriaTransacao {
  id: string,
  nome: string
  CategoriaTransacao: [{
    nome: string
  }]
}

export interface ISubCategoriaTransacaoResponse {
  data: ISubCategoriaTransacao[];
  count: number;
  isLoading: boolean;
}

export interface ICreateSubCategoriaTransacaoArgs {
  nome: string;
  usuarioCadastro: string
}

export interface IUpdateSubCategoriaTransacaoArgs extends ICreateSubCategoriaTransacaoArgs {
  id: string
}

export interface ICreateSubCategoriaTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateSubCategoriaTransacaoArgs, unknown>;
}

export interface IUpdateSubCategoriaTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateSubCategoriaTransacaoArgs, unknown>;
}

export interface IDeleteSubCategoriaTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

