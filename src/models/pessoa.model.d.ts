export interface IPessoa {
  id: string
  nome: string
  cpf: string
  sexo: string
  dataCadastro: Date
  observacoes: string | null
  telefone: string | null
  telefoneWpp: string | null
  email: string
  contato: string | null
  telefoneContato: string | null
  ativo: boolean
  dataNascimento?: string | null
  usuarioCadastro: string
  rg: string | null
  Endereco: [{
    logradouro: string
    numero: string
    complemento: string | null
    cep: string
    cidade: string
    uf: string
    bairro: string
  }]
}

export interface IPessoaArgs {
  page: number;
  size: number;
}

export interface IPessoaResponse {
  data: IPessoa[];
  count: number;
  isLoading: boolean;
}

export interface ICreatePessoaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreatePessoaArgs, unknown>;
}

export interface ICreatePessoaArgs {
  nome: string
  cpf: string
  sexo: string
  dataCadastro: Date
  observacoes: string | null
  telefone?: string | null
  telefoneWpp?: string | null
  email: string
  contato: string | null
  telefoneContato?: string | null
  ativo: boolean
  dataNascimento: Date | null
  usuarioCadastro: string
  logradouro: string | null
  numero: string | null
  complemento: string | null | null
  cep: string | null
  cidade: string | null
  uf: string | null
  bairro: string | null
}

export interface IUpdatePessoaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdatePessoaArgs, unknown>;
}

export interface IUpdatePessoaArgs extends ICreatePessoaArgs {
  id: string
}

export interface IDeletePessoaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
