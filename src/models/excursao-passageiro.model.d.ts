
export interface IExcursaoPassageiroArgs {
  page: number;
  size: number;
  localEmbarque: string | null
}

export interface ICreateExcursaoPassageiroArgs {
  reserva: string
  idExcursao: string
  idPassageiro: string
  localEmbarque: string
}

export interface IExcursaoPassageiro {
  id: string
  embarcou: boolean
  hasBoarded: string
  horaEmbarque: string
  Reservas: {
    id: string
    reserva: string
    Opcionais: {
      id: string,
      qtd: number
      Produto: {
        id: string
        nome: string
      }
    }[]
  },
  dataCadastro: string
  LocalEmbarque: {
    id: string
    nome: string
    observacoes: string
    horaEmbarque: string | null
    horaPrevista: string
    dataCadastro: Date
    codigoEndereco: string
    usuarioCadastro: string
    ativo: boolean
  },
  Pessoa: {
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
    dataNascimento: Date | null
    usuarioCadastro: string
  },
  Excursao: {
    id: string
    nome: string
    dataInicio: Date
    dataFim: Date
    observacoes: string | null
    dataCadastro: Date
    ativo: boolean
    gerouFinanceiro: boolean
    vagas: number
    codigoPacote: string
    usuarioCadastro: string
  }
  Onibus: {
    numeroCadeira: string
  }[]
}

export interface IExcursaoPassageiroResponse {
  data: IExcursaoPassageiro[];
  count: number;
  isLoading: boolean;
  summary?: IExcursaoPassageiroSummary[]
}

export interface IUpdateExcursaoPassageiroArgs extends ICreateExcursaoPassageiroArgs {
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

export interface IDeleteExcursaoPassageiroResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

export interface IExcursaoPassageiroSummary {
  nome: string
  sum: number
}
