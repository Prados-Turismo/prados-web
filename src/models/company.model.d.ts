export interface ICompanyInfo {
  id: string
  name: string
  cnpj: string
  externalCompanyId: string
}

export interface ICompany {
  id: number
  razaoSocial: string
  cnpj: string
  published_at: Date
  updated_by: number
  created_at: Date
  updated_at: Date
  nomeContato?: string
  cargoContato?: string
  telefoneContato?: string
  emailContato?: string
  logradouro?: string
  numero: string
  complemento?: string
  cep: string
  bairro?: string
  estado?: string
  dtSituacaoCadastral?: string
  situacaoCadastral?: string
  municipio?: string
  preferenciaContato?: string
  emailReceita?: string
  observacao?: string
  flEmissora: boolean
  saldo_wallet: number
  flContemplado: boolean
}
