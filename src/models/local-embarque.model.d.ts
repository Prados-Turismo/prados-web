export interface ILocalEmbarque {
  id: string
  nome: string
  observacoes: string
  horaEmbarque: string
  dataCadastro: Date
  codigoEndereco: string
  usuarioCadastro: string
  ativo: boolean
}

export interface ILocalEmbarqueResponse {
  data: Array<ILocalEmbarque>;
  isLoading: boolean;
}
