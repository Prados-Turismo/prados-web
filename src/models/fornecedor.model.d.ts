export interface IFornecedorArgs {
  page: number;
  size: number;
  status?: string | number | null
  nome: string
}

export interface IFornecedor {
  id: string
  nome: string
  fantasia: string
  cnpj: string
  site: string | null
  ativo: boolean
  observacoes: string | null
  telefone: string | null
  email: string
  contato: string | null
  telefoneContato: string | null
  usuarioCadastro: string
  Endereco: {
    logradouro: string
    numero: string
    complemento: string | null
    cep: string
    cidade: string
    uf: string
    bairro: string
  }
}

export interface IFornecedorResponse {
  data: IDataFornecedor[];
  count: number;
  isLoading: boolean;
}

export interface ICreateFornecedorArgs {
  nome: string
  fantasia: string
  cnpj: string
  site: string | null
  ativo: boolean
  observacoes: string | null
  telefone?: string | null
  email: string
  contato: string | null
  telefoneContato?: string | null
  codigoEndereco: string
  usuarioCadastro: string
  logradouro: string | null
  numero: string | null
  complemento: string | null | null
  cep: string | null
  cidade: string | null
  uf: string | null
  bairro: string | null
}

export interface IUpdateFornecedorArgs extends ICreateFornecedorArgs {
  id: string
}

export interface ICreateFornecedorResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateFornecedorArgs, unknown>;
}

export interface IUpdateFornecedorResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateFornecedorArgs, unknown>;
}

export interface IDeleteFornecedorResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
