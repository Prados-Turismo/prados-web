import { IParameterizer } from "./parameterizer.model";
import { IDataProduct, IDataProductContract } from "./product.model";

export interface IDataBenefits {
  nomeClasseProduto: string;
  ordemExibicao: number;
  produtos: IProdutos[];
}

export interface IDataSuppliers {
  id: number;
  nomeParceiro: string;
  cnpjParceiro: string;
  regAnsParceiro: string;
  logoLink: string;
  detalhesFornecedor: string;
}

export interface IProdutoAreas {
  unidade_federativa: {
    id: number;
    nomeUF: string;
    uf: string;
  };
  municipio: {
    id: number;
    nomeMunicipio: string;
    unidade_federativa: number;
  };
}
export interface IProdutos {
  push(el: IProdutos): IProdutos;
  id: number;
  nomeComercialProduto: string;
  nomeReduzidoProduto: string;
  nomeSegmentacaoAssistencial: string;
  infoComissionamento?: string;
  produto_areas: IProdutoAreas[];
  segmentacao_assistencial: {
    nomeSegmentacaoAssistencial: string;
  };
  nomeAbrangencia: string;
  abrangencia: {
    nomeAbrangencia: string;
  };
  classe_produto: IClasseProduto;
  acomodacao: {
    nomeAcomodacao: string;
  };
  regulamentado: boolean;
  registroAnsProduto?: null;
  anoIniComerc: number;
  mesIniComerc: number;
  anoFimComerc?: null;
  mesFimComerc?: null;
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  codProdutoGVP?: null;
  detalhesProduto: string;
  flCoparticipacao?: null;
  redeCredenciada: string;
  codigoBeneficio?: null;
  tipoCobranca?: null;
  area_atuacao?: null;
  codProdutoParceiro?: null;
  fichaTecnica?: null;
  documentoCancelamento?: null;
  adesaoEmpresa?: null;
  nomeDocumentoCancelamento?: null;
  flEmailAdesaoPersonalizado: boolean;
  nomeParceiro: string;
  idProduto: number;
  nomeTbFaixa: string;
  logoLink: string;
  contratos_empresa: IContratosEmpresa;
  tabelas: ITabelas[];
  egulamentado: boolean;
  nomeTipoContratacao: string;
  tipo_contratacao: {
    nomeTipoContratacao: string;
  };
  nomeAcomodacao: string;
  parceiro: IDataSuppliers;
}
export interface IClasseProduto {
  id: number;
  nomeClasseProduto: string;
  ordemExibicao: number;
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  descricaoClasseProd: string;
}
export interface IParceiro {
  id: number;
  nomeParceiro: string;
  cnpjParceiro: string;
  regAnsParceiro: string;
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  logoLink: string;
  detalhesFornecedor?: null;
  entidade_reguladora?: null;
}
export interface IContratosEmpresa {
  id: number;
  produtos_hub: number;
  empresas_hub: number;
  responsavelFinanceiro: string;
  dataInclusao: string;
  flAtivo: boolean;
  pecentualOuValor: string;
  percentualDescontoPadrao: number;
  valorDescontoPadrao: number;
  flDispBeneficiario: boolean;
}
export interface ITabelas {
  nomeDependencia: string;
  precos: IPrecos[];
}
export interface IPrecos {
  idTbPrecoProdHub: number;
  idadeMin: number;
  idadeMax: number;
  valor: number;
}

interface IFormParameterizer {
  beneficiaryId: string | null;
  positionId: string | null;
  sectorId: string | null;
  relationship: string;
  relationshipType: string;
  companyId: string;
  productId: string;
  companyContractId: string;
  percentageValue: string;
  value: number;
  type: string;
}

export interface IBenefitsParameterizerArgs {
  companyContractId: string;
  active?: boolean;
}

export interface IBenefitsCounts {
  productCount?: number;
  providersCount?: number;
  minValue?: number;
  maxValue?: number;
  count?: number;
}

export interface IBenefitsResponse {
  data: IDataProductContract[];
  count: number;
  productClasses: { product: boolean; productClass: string }[];
  isLoading: boolean;
  counts?: IBenefitsCounts;
  isFetching: boolean;
}

export interface IBenefitsArgs {
  page: number;
  size: number;
  orderBy: string;
  order: string;
  productClass?: string | null;
  companyProviderIdSearch?: string[];
  coparticipationSearch?: number;
  codIbgeUFSearch?: number[];
  codIbgeMunicipioSearch?: number[];
  outpatientSegmentationSearch?: string[];
  startValueSearch?: number;
  finalyValueSearch?: number;
  productNameSearch?: string;
  userId?: string;
  onlyFavorites?: boolean | null;
}

export interface IBenefitDetails {
  data: IDataProduct;
  isLoading: boolean;
}

export interface IAgeGroups {
  range: string;
  ageInit: number;
  ageFinish: number;
  quantity: number;
}

export interface IBeneficiariesAgeGroups {
  holder: IAgeGroups[];
  dependent: IAgeGroups[];
}

export interface IBeneficiariesAgeGroupsResponse {
  data: IBeneficiariesAgeGroups;
  isLoading: boolean;
}

export interface IDataSegmentation {
  id: number;
  nomeSegmentacaoAssistencial: string;
}

export interface ISegmentationResponse {
  data: IDataSegmentation[];
  isLoading: boolean;
}

export interface IEnableBenefit {
  companyContractId: string;
  checkedStatus: boolean;
  setShowModal: (e: boolean) => void;
  setCheckedStatus: (e: boolean) => void;
}

export interface IExcludeParameterization {
  id: number;
  contratoEmpresaId: number;
}

export interface IEditParameterization {
  form: IFormParameterizer;
  edit: boolean;
}

export interface IAllCompanyProviderData {
  id: string;
  corporateName: string;
}

export interface IGetAllCompaniesProviderResponse {
  data: IAllCompanyProviderData[];
  isLoading: boolean;
}

export interface IFavoriteProduct {
  userId: string;
  isFavorite?: boolean;
  companyContractId?: string;
  product?: IDataProductContract;
}

export interface IHandleEnableBenefitResponse {
  enableBenefit: ({
    contratoEmpresaId,
    checkedStatus,
    setShowModal,
    setCheckedStatus,
  }: IEnableBenefit) => void;
  isLoading: boolean;
}

export interface IHandleExcludeParameterization {
  excludeParameterization: ({
    id,
    contratoEmpresaId,
  }: IExcludeParameterization) => void;
  isLoading: boolean;
}

export interface IHandleEditParameterization {
  createParameterization: ({
    item,
    contratoEmpresaId,
    form,
    edit,
  }: IEditParameterization) => void;
  isLoading: boolean;
}

export interface IBenefitsParameterizerResponse {
  data: IParameterizer[];
  isLoading: boolean;
}

export interface IUseBenefitsResponse {
  getBenefits: (IBenefitsArgs) => IBenefitsResponse;
  getSegmentation: () => ISegmentationResponse;
  getBenefitParameterizer: (
    args: IBenefitsParameterizerArgs,
  ) => IBenefitsParameterizerResponse;
  getBenefitHistoric: (
    args: IBenefitsParameterizerArgs,
  ) => IBenefitsParameterizerResponse;
  getCompanyContractDocument: (id: number) => void;
  handleEnableBenefit: () => IHandleEnableBenefitResponse;
  handleExcludeParameterization: () => IHandleExcludeParameterization;
  handleEditParameterization: () => IHandleEditParameterization;
  getBenefitDetails: (productId: string) => IBenefitDetails;
  getAllCompaniesProvider: () => IGetAllCompaniesProviderResponse;
}
