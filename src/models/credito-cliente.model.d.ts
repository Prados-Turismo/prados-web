export interface ICreditoCliente {
  id: string,
  valor: number
  dataCadastro: string
  Reserva: {
    reserva: number
    Excursao: {
      nome: string
      dataInicio: string
      dataFim: string
    }
  }
  Cliente: {
    nome: string
    cpf: string
    email: string
  }
}

export interface ICreditoClienteArgs {
  page: number;
  size: number;
}


export interface ICreditoClienteResponse {
  data: ICreditoCliente[];
  count: number;
  isLoading: boolean;
}

export interface ICreateCreditoClienteArgs {
  nome: string
  ativo: boolean
  saldo: number
  usuarioCadastro: string
}

export interface IUpdateCreditoClienteArgs extends ICreateCreditoClienteArgs {
  id: string
}

export interface ICreateCreditoClienteResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateCreditoClienteArgs, unknown>;
}

export interface IUpdateCreditoClienteResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateCreditoClienteArgs, unknown>;
}

export interface IDeleteCreditoClienteResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
