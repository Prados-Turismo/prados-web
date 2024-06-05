import { IProdutos } from "./benefits.model"

export enum ISidebarContractStatus {
  P = "P",
  A = "A",
  S = "S"
}

export interface IContractArgs {
  type: ISidebarContractStatus
  currentPage: number
  pageSize: number
  mySales: number
  searchParam: string | null
}

export interface IContractResponse {
  data: IDataContract[]
  count: number
  isLoading: boolean
}

export interface IDataContract {
  id: number
  created_at: string
  contrato_benficiario: number
  dataInicioVigenciaContrato: string
  beneficiario: IBeneficiario
  beneficio: IProdutos
  custoEmpresa: number
  custoBeneficiario: number
  valor: number
  statusContratoBeneficiario: IStatusContratoBeneficiario
  statusPropostaAdesao: IStatusPropostaAdesao
  dataLimiteAssinatura: string
  dataInicioVigencia: string
  dataInclusao: string
  dataExclusao: string
  razaoSocial: string
  nomeHub: string
  solicitadoPor: ISolicitadoPor
  tb_preco_prod_hub: ITbPrecoProdHub
  flAtivo: boolean
  percentualOuValor: string
  percentualDescontoPadrao: number
  valorDescontoPadrao?: null
  contrato_empresa: IContratoEmpresa
  status_contrato_benef: IStatusContratoBenef
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
  proposta_adesao: number
  flParametro: string
  dataFimVigencia?: null
  carteiraContratoBenef?: null
}
export interface IBeneficiario {
  id: number
  cargo: ICargo
  setor: ISetor
  empresa: number
  familia: number
  flAtivacao: string
  parentesco: IParentesco
  dependencia: IDependencia
  dataAdmissao: string
  pessoa_fisica: IPessoaFisica
  dataDesligamento?: null
  relacao_trabalhista: IRelacaoTrabalhista
  vinculoEmpregaticio: boolean
  dataCadastroCompleto?: null
  dataCadastroPendente: string
}
export interface ICargo {
  id: number
  setor: number
  empresa: number
  nomeCargo: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
}
export interface ISetor {
  id: number
  empresa: number
  nomeSetor: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
}
export interface IParentesco {
  id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
  nomeParentesco: string
}
export interface IDependencia {
  id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
  nomeDependencia: string
}
export interface IPessoaFisica {
  id: number
  rg: string
  CEP: number
  cpf: string
  sexo: ISexo
  user: number
  email: string
  celular: string
  nomeMae: string
  endereco: string
  municipio: number
  estado_civil: IEstadoCivil
  dataEmissaoRg: string
  bairroEndereco: string
  dataNascimento: string
  numeroEndereco: string
  orgaoEmissorRg: string
  agrupamentoDono: number
  nomePessoaFisica: string
  flCadastroCompleto: boolean
  unidade_federativa: number
  complementoEndereco: string
}
export interface ISexo {
  id: number
  nomeSexo: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
}
export interface IEstadoCivil {
  id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
  nomeEstadoCivil: string
}
export interface IRelacaoTrabalhista {
  id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  nomeRelacao: string
  published_at: string
}

export interface IParceiro {
  id: number
  logoLink: string
  created_at: string
  created_by?: null
  updated_at: string
  updated_by?: null
  cnpjParceiro: string
  nomeParceiro: string
  published_at: string
  regAnsParceiro?: null
  detalhesFornecedor: string
  entidade_reguladora?: null
}
export interface IAbrangencia {
  id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
  nomeAbrangencia: string
}
export interface IClasseProduto {
  id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  published_at: string
  ordemExibicao: number
  nomeClasseProduto: string
  descricaoClasseProd: string
}
export interface IStatusContratoBeneficiario {
  id: number
  nomeStatusContratoBenef: string
  detalhamentoStatusContratoBenef: string
  auxAgrupamento: string
  published_at: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  status_linha_tempo: number
}

export interface IDataProposal {
  nomeTitular: string
  celularTitular: string
  emailTitular: string
  id: number
  status_proposta_adesao: IStatusPropostaAdesao
  contrato_empresa?: null
  published_at: string
  created_by: number
  updated_by?: null
  created_at: string
  updated_at: string
  contrato_beneficiarios: IDataContract[]
}
export interface IStatusPropostaAdesao {
  id: number
  nomeStatusPropostaAdesao: string
  descricao?: null
  auxAgrupamento: string
  published_at: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  status_linha_tempo?: null
}
export interface IContratoBeneficiarios {
  id: number
  beneficiario: IBeneficiario
  tb_preco_prod_hub: ITbPrecoProdHub
  dataInclusao: string
  dataExclusao?: null
  flAtivo: boolean
  dataLimiteAssinatura: string
  dataInicioVigencia: string
  percentualOuValor: string
  percentualDescontoPadrao: number
  valorDescontoPadrao?: null
  custoEmpresa: number
  custoBeneficiario: number
  contrato_empresa: IContratoEmpresa
  status_contrato_benef: IStatusContratoBenef
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
  proposta_adesao: number
  flParametro: string
  dataFimVigencia?: null
  carteiraContratoBenef?: null
}

export interface ITbPrecoProdHub {
  id: number
  produtos_hub: number
  faixas_etaria: number
  dependencia: number
  valor: number
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
}
export interface IContratoEmpresa {
  id: number
  produtos_hub: IProdutosHub
  empresas_hub: IEmpresasHub
  responsavelFinanceiro: string
  dataInclusao: string
  dataExclusao?: null
  flAtivo: boolean
  pecentualOuValor: string
  percentualDescontoPadrao: number
  valorDescontoPadrao?: null
  flDispBeneficiario: boolean
  published_at: string
  created_by?: null
  updated_by: number
  created_at: string
  updated_at: string
  empresa_hub_status_historico?: null
  flPermiteAdesaoImediata?: null
}
export interface IProdutosHub {
  id: number
  hub: IHub
  produto: IProduto
  tb_faixa_etaria: number
  diaVigencia: number
  diaLimiteVigencia: number
  diaLimiteAssinatura?: null
  flNecessitaAssinatura: boolean
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
  adminPercentualValor: string
  adminTaxa: number
  comissionamentoPercentualValor: string
  comissionamentoTaxa: number
  associativaTaxa: number
  tipoPagamento: string
  tipoCobranca: string
}
export interface IHub {
  id: number
  nomeHub: string
  descricaoHub: string
  published_at: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  associativaTaxa?: null
  dataVencimento: number
  dataCorteFatura: number
  valorOuPercentualTaxaAdministrativa?: null
  valorTaxaAdministrativa?: null
  tipo_contratacao: number
}
export interface IProduto {
  id: number
  nomeComercialProduto: string
  nomeReduzidoProduto: string
  tipo_contratacao?: null
  segmentacao_assistencial?: null
  abrangencia: IAbrangencia
  classe_produto: IClasseProduto
  acomodacao?: null
  regulamentado: boolean
  registroAnsProduto?: null
  anoIniComerc: number
  mesIniComerc: number
  anoFimComerc?: null
  mesFimComerc?: null
  parceiro: IParceiro
  codProdutoGVP: string
  detalhesProduto: string
  flCoparticipacao?: null
  redeCredenciada?: null
  published_at: string
  created_by?: null
  updated_by?: null
  created_at: string
  updated_at: string
  codProdutoParceiro: string
  tipoCobranca: string
  fichaTecnica: string
  documentoCancelamento?: null
  adesaoEmpresa: boolean
  nomeDocumentoCancelamento?: null
  flEmailAdesaoPersonalizado?: null
}

export interface IEmpresasHub {
  id: number
  empresa: IEmpresa
  hub: number
  dataInclusao: string
  dataExclusao?: null
  diaVencimento: number
  published_at: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  flAtivo: boolean
  flLider: boolean
  status_empresa_hub: number
  tipoEmpresa?: null
  empresa_superior?: null
  grupo_empresa: number
  idContratoD4sign?: null
  diaCorteFatura: number
  contaCorrente: number
  tipoVencimento: string
  categoria_receita: number
  codigoAssinatura?: null
}
export interface IEmpresa {
  id: number
  razaoSocial: string
  cnpj: string
  published_at: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  nomeContato?: null
  cargoContato?: null
  telefoneContato?: null
  emailContato?: null
  logradouro: string
  numero: string
  complemento?: null
  cep: string
  bairro?: null
  estado: string
  dtSituacaoCadastral?: null
  situacaoCadastral?: null
  municipio?: null
  preferenciaContato?: null
  emailReceita?: null
  observacao?: null
  flEmissora: boolean
  saldo_wallet: number
  flContemplado: boolean
}

export interface ISolicitadoPor {
  tipoUsuario: string
  nomePessoaFisica?: null
}

export interface IProposalArgs {
  proposalId: number
}

export interface IProposalResponse {
  data: IDataProposal
  isLoading: boolean
}

export interface ICorretorsCompaniesResponse {
  companiesData: IEmpresa[]
  loadingCompanies: boolean
}

export interface ICorretorsCompaniesFilteredResponse {
  companiesData: IEmpresa[]
  loadingCompanies: boolean
}

export interface IProposalStatusResponse {
  statusData: IStatusPropostaAdesao[]
  loadingStatus: boolean
}

export interface IUseCorretorContract {
  getContract: (args: IContractArgs) => IContractResponse
  getProposal: (args: IProposalArgs) => IProposalResponse
  getCorretorsCompanies: () => ICorretorsCompaniesResponse
  getProposalStatus: () => IProposalStatusResponse
  getCorretorsCompaniesFiltered: (
    hubId: number | undefined
  ) => ICorretorsCompaniesFilteredResponse
}
