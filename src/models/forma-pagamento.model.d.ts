export interface IDataFormaPagamento {
  id: string
  nome: string
  dataCadastro: Date
  taxa: number
  qtdDiasRecebimento: number
  ativo: boolean
  codigoContaBancaria: string
  usuarioCadastro: string
}

export interface IFormaPagamentoFindResponse {
  data: IDataFormaPagamento[]
  isLoading: boolean
}
