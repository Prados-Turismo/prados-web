export interface IHub {
  length: number
  id: number
  nomeHub: string
  descricaoHub: string
  associativaTaxa: number
  dataVencimento: number
  dataCorteFatura: number
  published_at: Date
  created_at: Date
  updated_at: Date
  valorOuPercentualTaxaAdministrativa: string
  valorTaxaAdministrativa: number
  tipo_contratacao?: string
}
