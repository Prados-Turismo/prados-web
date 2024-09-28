export interface IReservaArgs {
  page: number;
  size: number;
  status?: number | string | null
  filter?: string
}

export interface IReserva {
  id: string,
  reserva: number,
  status: boolean,
  codigoUsuario: string | null,
  desconto: number,
  dataCadastro: string,
  plataforma: number
  criancasColo: number
  Pessoa: {
    id: string,
    nome: string,
    cpf: string,
    rg: string | null
    email: string
    telefone: string
    orgaoEmissor: string | null
  }[],
  Excursao: {
    id: string,
    nome: string,
    dataInicio: string,
    dataFim: string
    valor: number
  }
  Usuario: {
    nome: string
  }
  Transacoes: {
    valor: number,
    data: string,
    valor: number
    numeroComprovanteBancario: string
    FormaPagamento: {
      id: string
      nome: string
    }
    ContaBancaria: {
      id: string
      nome: string
    }
  }[]
  LocalEmbarque: {
    id: string
    nome: string
    horaEmbarque: string
  },
  Opcionais: {
    id: string,
    qtd: number,
    Produto: {
      id: string,
      nome: string
      valor: number
    }
  }[]
}

export interface IReservaResponse {
  data: IReserva[];
  count: number;
  isLoading: boolean;
}

export interface IReservaFindResponse {
  data: IReserva;
  count: number;
  isLoading: boolean;
}

export interface ICreateReservaArgs {
  codigoUsuario: string | null
  passageiros: [string]
  idExcursao: string
  desconto: number
  usuarioCadastro: string
  plataforma: number
}

export interface IUpdateReservaArgs extends ICreateReservaArgs {
  id: string
}

export interface ICreateReservaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateReservaArgs, unknown>;
}

export interface IUpdateReservaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateReservaArgs, unknown>;
}

export interface IDeleteReservaResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
