export interface IExcursaoPassageiro {
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
  numeroPassageiro: string
  usuarioCadastro: string
}

export interface IExcursaoPassageiroArgs {
  page: number;
  size: number;
}

export interface IDataExcursaoPassageiro {
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

export interface IExcursaoListPassageiro {
  id: string,
  nome: string
}

export interface IExcursaoPassageiroResponse {
  data: IExcursaoListPassageiro[];
  count: number;
  isLoading: boolean;
}

export interface IExcursaoPassageiroListResponse {
  data: Array<IExcursaoListPassageiro>;
  isLoading: boolean;
}

export interface ICreateExcursaoPassageiroArgs {
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

export interface IUpdateExcursaoPassageiroArgs extends ICreateExcursaoArgs {
  id: string
}

export interface ICreateExcursaoPassageiroResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateExcursaoPassageiroArgs, unknown>;
}

export interface IUpdateExcursaoPassageiroResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateExcursaoPassageiroArgs, unknown>;
}
