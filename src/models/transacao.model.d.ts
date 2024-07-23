import { UseMutateFunction } from "react-query"

export interface ITransacao {
  id: string
  tipo: number
  valor: number
  vistoAdmin?: boolean
  data: string
  efetivado?: boolean
  observacao?: string | null
  ativo: boolean
  numeroComprovanteBancario?: string | null
  dataPrevistaRecebimento: string
  idWP?: number | null
  codigoPessoa: string
  codigoFornecedor?: string | null
  codigoExcursao?: string | null
  codigoProduto?: string | null
  codigoPacote?: string | null
  codigoFormaPagamento: string
  usuarioCadastro: string
}

export interface ITransacaoArgs {
  page: number;
  size: number;
}

export interface ITransacaoResponse {
  data: ITransacao[];
  count: number;
  isLoading: boolean;
}

export interface ICreateTransacaoArgs {
  tipo: number
  valor: number
  vistoAdmin?: boolean
  data: string
  efetivado?: boolean
  observacao?: string
  ativo: boolean
  numeroComprovanteBancario?: string
  dataPrevistaRecebimento: string
  idWP?: number
  codigoPessoa: string
  codigoFornecedor?: string
  codigoExcursao?: string
  codigoProduto?: string
  codigoPacote?: string
  codigoFormaPagamento: string
  usuarioCadastro: string
}

export interface IUpdateTransacaoArgs extends ICreateTransacaoArgs {
  id: string
}

export interface ICreateTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateTransacaoArgs, unknown>;
}

export interface IUpdateTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateTransacaoArgs, unknown>;
}
