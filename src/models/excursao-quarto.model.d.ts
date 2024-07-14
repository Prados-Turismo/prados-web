export interface IExcursaoQuarto {
  Passageiros: [{
    id: string
    ativo: boolean
    contato: string
    cpf: string
    dataNascimento?: string
    email: string
    nome: string
    observacoes?: string
    sexo: string
    telefone: string
    telefoneContato?: string
    telefoneWpp?: string
    usuarioCadastro: string
  }]
  id: string
  codigoExcursao: string
  numeroQuarto: string
  usuarioCadastro: string
}

export interface IExcursaoQuartoArgs {
  page: number;
  size: number;
}

export interface IDataExcursaoQuarto {
  nome: string
  dataInicio: Date
  dataFim: Date
  observacoes: string | null
  ativo: boolean
  gerouFinanceiro: boolean
  vagas: number
  codigoPacote: string
  usuarioCadastro: string
}

export interface IExcursaoQuartoResponse {
  data: IExcursaoQuarto[];
  count: number;
  isLoading: boolean;
}

export interface IExcursaoQuartoListResponse {
  data: IExcursaoQuarto;
  isLoading: boolean;
}

export interface ICreateExcursaoQuartoArgs {
  nome: string
  dataInicio: Date
  dataFim: Date
  observacoes: string | null
  ativo: boolean
  gerouFinanceiro: boolean
  vagas: number
  codigoPacote: string
  usuarioCadastro: string
}

export interface IUpdateExcursaoQuartoArgs extends ICreateExcursaoArgs {
  id: string
}

export interface ICreateExcursaoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateExcursaoQuartoArgs, unknown>;
}

export interface IUpdateExcursaoQuartoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateExcursaoQuartoArgs, unknown>;
}
