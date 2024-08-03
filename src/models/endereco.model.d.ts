export interface IEndereco {
  resultado: string
  resultado_txt: string
  uf: string
  cidade: string
  bairro: string
  tipo_logradouro: string
  logradouro: string
}

export interface IEnderecoArgs {
  page: number;
  size: number;
}

export interface IEnderecoResponse {
  data: IEndereco;
  count: number;
  isLoading: boolean;
}

export interface ICreateEnderecoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateEnderecoArgs, unknown>;
}

export interface ICreateEnderecoArgs {
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
}

export interface IUpdateEnderecoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateEnderecoArgs, unknown>;
}

export interface IUpdateEnderecoArgs extends ICreateEnderecoArgs {
  id: string
}

export interface IDeleteEnderecoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
