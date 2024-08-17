export interface IReservaArgs {
  page: number;
  size: number;
}

export interface IReserva {
  id: string,
  reserva: number,
  status: boolean,
  codigoUsuario: string | null,
  desconto: number,
  dataCadastro: string,
  plataforma: number
  Pessoa: {
    id: string,
    nome: string,
    cpf: string,
    rg: string | null
    email: string
    telefone: string
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
    numeroComprovanteBancario: string
    FormaPagamento: {
      nome: string
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
