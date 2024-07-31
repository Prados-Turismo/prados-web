export interface IFormaPagamentoArgs {
  page: number;
  size: number;
}

export interface IFormaPagamento {
  id: string
  nome: string
  taxa: number
  qtdDiasRecebimento: number
  ativo: boolean
}

export interface IFormaPagamentoResponse {
  data: IFormaPagamento[];
  count: number;
  isLoading: boolean;
}

export interface ICreateFormaPagamentoArgs {
  nome: string
  taxa: number
  qtdDiasRecebimento: number
  ativo: boolean
}

export interface IUpdateFormaPagamentoArgs extends ICreateFormaPagamentoArgs {
  id: string
}

export interface ICreateFormaPagamentoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateFormaPagamentoArgs, unknown>;
}

export interface IUpdateFormaPagamentoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateFormaPagamentoArgs, unknown>;
}

export interface IDeleteFormaPagamentoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

