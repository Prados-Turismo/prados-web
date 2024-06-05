export interface IDataPreRegister {
  id: number
  nome: string
  cpf: string
  email: string
  sexo: Sexo
  dataNascimento: string
  setor: Setor
  cargo: Cargo
  dataAdmissao: string
  relacao_trabalhista: IRelacaoTrabalhista
  dataPreCad: string
  origem_pre_cad: IOrigemPreCad
  statusPreCad: string
  usuarioValidacao?: null
  dataValidacao?: null
  empresa: IEmpresa
  celular: string
  published_at: string
  created_at: string
  updated_at: string
}
export interface ISexo {
  id: number
  nomeSexo: string
}
export interface ISetor {
  id: number
  nomeSetor: string
  empresa: number
}
export interface ICargo {
  id: number
  nomeCargo: string
  setor: number
  empresa: number
}
export interface IRelacaoTrabalhista {
  id: number
  nomeRelacao: string
}
export interface IEmpresa {
  id: number
  razaoSocial: string
  cnpj: string
  published_at: string
  created_at: string
  updated_at: string
  nomeContato?: null
  cargoContato: string
  telefoneContato: string
  emailContato: string
  logradouro: string
  numero: string
  complemento: string
  cep: string
  bairro: string
  estado: string
  dtSituacaoCadastral?: null
  situacaoCadastral?: null
  municipio: number
  preferenciaContato?: null
  emailReceita: string
  observacao: string
  flEmissora: boolean
  saldo_wallet: number
  flContemplado: boolean
  percentualOuValor?: null
  taxaServico?: null
}
