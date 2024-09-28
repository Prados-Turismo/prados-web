export interface IFormaPagamentoArgs {
  page: number;
  size: number;
  nome: string
  status?: number | string | null
}

export interface IFormaPagamento {
  id: string
  nome: string
  taxa: number
  taxa2x: number
  taxa3x: number
  taxa4x: number
  taxa5x: number
  taxa6x: number
  taxa7x: number
  taxa8x: number
  taxa9x: number
  taxa10x: number
  taxa11x: number
  taxa12x: number
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

