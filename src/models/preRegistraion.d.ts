import { IHub } from "./hubs.model"

export interface IDataPreRegistration {
  cnaes: ICnaes[]
  id: number
  razaoSocial: string
  cnpj: string
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
  nomeContato: string
  cargoContato: string
  telefoneContato: string
  emailContato: string
  logradouro: string
  numero: string
  complemento: string
  cep: string
  bairro: string
  estado: string
  dtSituacaoCadastral: string
  situacaoCadastral: string
  municipio: IMunicipio
  preferenciaContato: string
  emailReceita: string
  observacao: string
  flEmissora?: null
  saldo_wallet?: null
  flContemplado?: null
  percentualOuValor?: null
  taxaServico?: null
  users?: Users[] | null
  empresas_hubs: IEmpresasHubs[]
  representantes: IRepresentantes[]
  doc_empresas: IDocEmpresas[]
}

export interface IDocEmpresas {
  id: number
  tipo_documento_empresa: number
  status_doc_empresa: number
}

export interface IRepresentantes {
  nomeRepresentanteLegal: string
  cpfRepresentanteLegal: string
  emailRepresentanteLegal: string
  flAssinatura?: boolean
  empresa: number
  id: number
}

export interface IContratosAssinatura {
  nomeContratoAssinatura: string
  codIntegracao: string
  flAtivo: boolean
}

export interface IContratosAssinaturaHubs {
  flAtivo: boolean
  contratos_assinatura: IContratosAssinatura
  hub: IHub
}

export interface ICnaes {
  codigo: string
  descricao: string
  flPrincipal: boolean
}

export interface IMunicipio {
  id: number
  nomeMunicipio: string
  codIbgeMunicipio: string
  unidade_federativa: number
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
}
export interface IUsers {
  id: number
  username: string
  email: string
  provider: string
  password: string
  resetPasswordToken?: null
  confirmationToken?: null
  confirmed: boolean
  blocked?: null
  role: number
  nome: string
  fl_ativo: boolean
  fl_primeiro_acesso: boolean
  empresa: number
  pessoa_fisica?: null
  dataAceiteTermo: string
  termo_privacidade: number
  flAceitaSms?: null
  flAceitaEmail?: null
  parceiro?: null
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
  flMultiEmpresa?: null
  flAceitaTermoUsoDados?: null
  dataAceiteTermoUsoDados?: null
  termo_uso_dado?: null
}
export interface IEmpresasHubs {
  id: number
  empresa: number
  hub: number
  dataInclusao: string
  dataExclusao?: null
  diaVencimento?: null
  published_at: string
  created_by?: null
  updated_by: number
  created_at: string
  updated_at: string
  flAtivo: boolean
  flLider: boolean
  status_empresa_hub: number
  tipoEmpresa: string
  empresa_superior?: null
  grupo_empresa?: null
  idContratoD4sign?: null
  diaCorteFatura?: null
  contaCorrente?: null
  tipoVencimento: string
  categoria_receita?: null
  codigoAssinatura?: null
  assinaveis_empresas?: any[] | null
}

export interface ICompanyResponse {
  isLoading: boolean
  data: IDataPreRegistration
}

export interface IHubResponse {
  data: IHub
  templates: IContratosAssinatura[]
}

export interface IPreResgistrationResponse {
  getCompany: () => ICompanyResponse
  getHub: (id: number) => IHubResponse
}
