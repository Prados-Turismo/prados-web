/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { ICompaniesAssociated } from "./companies-associated";
import { IContract } from "./contract.model";
import { IDataPreRegister } from "./preRegister.model";
import { IDataProductContract } from "./product.model";
import { IAdherenceRuleData } from "./productAdhesion.model";

interface IFamily {
  id: number;
  empresa: number;
  limiteFolha: null;
}

interface IPosition {
  id: string;
  name: string;
  sectorId: string;
  createdAt: string;
}

interface ISector {
  id: string;
  name: string;
  companyId: string;
  createdAt: string;
  nameFormatted: string;
}

interface IPersonAddress {
  publicPlace: string;
  number: string;
  complement: string;
  cep: string;
  neighborhood: string;
  codIbgeCity: number;
  city: string;
  codIbgeUf: number;
  uf: string;
  isBillingAddress: boolean;
}

interface IPerson {
  id: string;
  name: string;
  cpf: string;
  email: string;
  bornDate: any;
  nameMother: any;
  rg: any;
  issuingAgencyRg: any;
  dateOfIssue: any;
  phoneNumber: any;
  completeRecord: boolean;
  sexIdentity: any;
  personMaritalStatus: any;
  createdAt: string;
  personAddress: IPersonAddress[];
}

interface IDataCollaboratorPre {
  id: string;
  personId: string;
  companyId: string;
  createdAt: string;
  person: IPerson;
  sector: ISector;
  position: IPosition;
}

interface IDataCollaborator {
  id: string;
  employmentRelationship: boolean;
  sectorId: string;
  positionId: string;
  payrollSpendingLimit: any;
  employmentRelationshipType: any;
  admissionDate: any;
  unlinkDate: any;
  statusActiveDate: any;
  authorizesDownloadDocument: boolean;
  beneficiaryKinship: string;
  beneficiaryType: string;
  beneficiaryStatus: string;
  parentId: any;
  personId: string;
  companyId: string;
  createdAt: string;
  registration?: string;
  person: IPerson;
  sector: ISector;
  position: IPosition;
}

export interface IPartners {
  id: string;
  cnpj: string;
  corporateName: string;
  irsEmail: string;
  irsSituation: string;
  irsSituationDate: string;
  createdAt: string;
  companyAssociated: {
    companyType: string;
    observation: string;
    isIssue: boolean;
    tax: number;
    active: boolean;
    companyRepresentative: [
      {
        status: string;
        active: boolean;
      },
    ];
    hub: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export interface IPartnersResponse {
  data: IPartners[];
  isLoading: boolean;
}

export interface ICollaboratorArgs {
  page: number;
  size: number;
  search?: string | null;
  status?: boolean | null;
  beneficiaryStatus?: string | null;
  isActived?: boolean | null;
  companyId?: string;
}

export interface ICollaboratorResponse {
  data: IDataCollaborator[];
  count: number;
  isLoading: boolean;
  setFieldSearch: Dispatch<string | null>;
}

export interface ICollaboratorPreRecordsResponse {
  data: IDataCollaboratorPre[];
  count: number;
  isLoading: boolean;
}

export interface IDisableCollaboratorArgs {
  collaboratorId: string;
  setError: (boolean) => void;
}

export interface IFamilyArgs {
  familyId: number;
  companyId: string;
}

export interface IPrecadsArgs {
  pessoaFisicaId: string | undefined;
}

export interface IPrecadsResponse {
  data: IDataPreRegister;
  isLoading: boolean;
}

export interface IUserCollaboratorResponse {
  data: IDataCollaborator;
  isLoading: boolean;
}

export interface IDataDependents {
  id: string;
  employmentRelationship: boolean;
  sectorId: string;
  positionId: string;
  statusActiveDate: string;
  authorizesDownloadDocument: boolean;
  beneficiaryKinship: string;
  beneficiaryType: string;
  beneficiaryStatus: string;
  parentId: string;
  personId: string;
  companyId: string;
  createdAt: string;
  person: IPerson;
  companyAssociated: ICompaniesAssociated;
  sector: ISector;
  position: IPosition;
}

export interface IGetDependentsResponse {
  data: IDataDependents[];
  isLoading: boolean;
}

export interface IGetCollaboratorDocResponse {
  isLoading: boolean;
  callDoc: (id: number) => void;
}

export interface IFamilyBenefitsArgs {
  familyId: number;
  companyId: string | null;
}

export interface IFamilyBenefits {
  contratoEmpresa: number;
  flPermiteAdesaoImediata: boolean;
  proximoDiaUtil: string;
  prodHub: number;
  nomeClasseProduto: string;
  detalhesProduto: any;
  ordemExibicao: number;
  nomeParceiro: string;
  flCoparticipacao: boolean;
  logoLink: string;
  nomeComercialProduto: string;
  nomeReduzidoProduto: string;
  registroAnsProduto: string;
  nomeTipoContratacao: string;
  nomeAcomodacao: string;
  nomeSegmentacaoAssistencial: string;
  nomeAbrangencia: string;
  percentualOuValor: string;
  percentualDescontoPadrao: number;
  valorDescontoPadrao: any;
  regulamentado: boolean;
  valorTabela: number;
  valorEmpresa: number;
  valorColaborador: number;
  flPodeAderir: boolean;
  justificativa: string;
  dataLimiteAssinaturaNovaAdesao: string;
  dataInicioVigenciaNovaAdesao: string;
  infoComissionamento: string;
}

export interface IFamilyBenefitsResponse {
  familyBenefits: IFamilyBenefits[];
  isLoading: boolean;
  isFetching: boolean;
}

export interface IFamilyBenefitsGroupArgs {
  beneficiaryId: string;
  group: "P" | "A";
  page: number;
  size: number;
  productClass: string | null;
  userId?: string | null;
  onlyFavorites?: boolean | null;
}

export interface IBenefitsByBeneficiaryArgs {
  beneficiaryId: string;
  companyId: string;
  page: number;
  size: number;
  productClass: string | null;
  userId?: string | null;
  onlyFavorites?: boolean | null;
}

export interface IFamilyBenefitsGroupPerson {
  id: number;
  nomeDependencia: string;
  idPessoaFisica: number;
  nomePessoaFisica: string;
  dataNascimento: string;
  idade: number;
  flAtivacao: string;
  contratos_beneficiario: IContract[];
}

export interface IParametrizer {
  id: string;
  beneficiaryId: string;
  positionId: string;
  sectorId: string;
  relationship: string;
  relationshipType: "holder" | "dependent" | "aggregated";
  companyId: string;
  productId: string;
  companyContractId: string;
  percentageValue: string;
  value: number;
  type: string;
  active: boolean;
  createdAt: string;
}

export interface ICancelRequestData {
  id: string;
  protocol: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  cancelReason: string;
  cancelrequestBy: string;
  status: string;
  cancelAnalysisDescription: string;
  suspendReason: string;
  effectiveFinalyDate: string;
  cancellationDocumentToken: string;

  createdBy: string;
  createdAt: string;
  validatedBy: string;
  validatedAt: string;
  suspendedBy: string;
  suspendedAt: string;
}

export interface IFamilyBenefitsGroup {
  id: string;
  adherenceProposalId: string;
  parametrizerId: string;
  contractId: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  productId: string;
  productCommercialName: string;
  productClass: ProductClass;
  providerName: string;
  status: string;
  group: string;
  cardNumber: string;
  beneficiaryId: string;
  beneficiaryName: string;
  cancelRequestId: string;
  value: number;
  effectiveStartDate: string;
  effectiveFinalyDate: string;
  subscriptionDeadline: string;
  providerLogo: string;
  createdBy: string;
  createdAt: string;
  favoritedCompanyContract?: string[];

  initContractDate: string;
  finishContractDate: string;
  contractVigenceType: string;

  companyContact?: {
    initContractDate: string;
    finishContractDate: string;
    contractVigenceType: string;
  };

  companyContractId: string;

  parametrizer: IParametrizer;

  cancelRequest: ICancelRequestData;

  product?: {
    regulated: boolean;
    reducedName: string;
  };
}
export interface IFamilyBenefitsGroupResponse {
  data: IFamilyBenefitsGroup[];
  count: number;
  productClasses: { product: boolean; productClass: string }[];
  isLoading: boolean;
}

export interface IBenefitsByBeneficiaryResponse {
  data: IDataProductContract[];
  count: number;
  productClasses: { product: boolean; productClass: string }[];
  isLoading: boolean;
}

export interface IFamilyCompositionArgs {
  beneficiaryId: string;
  companyId: string;
  group: "F" | "A" | "P" | "CA" | "C";
}

export interface IFamilyComposition extends IFamilyBenefitsGroup {
  companyContractId: string;
  beneficiaryKinship: string;
}

export interface IFamilyCompositionResponse {
  data: IFamilyComposition[];
  count: number;
  totais: {
    valorProdutoTotal: number;
    valorEmpresaTotal: number;
    valorColaboradorTotal: number;
  };
  isLoading: boolean;
}

export interface IFamilyBeneficiaries {
  nomeDependencia: string;
  idPessoafisisa: number;
  nomePessoaFisica: string;
}

export interface IFamilyBeneficiariesResponse {
  data: IFamilyBeneficiaries[];
  isLoading: boolean;
}

export interface IBneficiaryContractsData {
  id: string;
  adherenceProposalId: string;
  parametrizerId: string;
  contractId: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  productId: string;
  productCommercialName: string;
  productClass: string;
  providerName: string;
  status: string;
  group: string;
  beneficiaryId: string;
  beneficiaryName: string;
  value: number;
  effectiveStartDate: string;
  effectiveFinalyDate: string;
  subscriptionDeadline: string;
  companyContractId: string;
  parametrizer: IParametrizer;
  beneficiary: IDataCollaborator;
  adherenceRule: IAdherenceRuleData[];
}

export interface IProposalAdherenceData {
  id: string;
  productId: string;
  contractId: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  status: string;
  protocol: string;
  createdBy: string;
  createdAt: string;
  beneficiaryContracts: IBneficiaryContractsData[];
}

export interface IGetProposalAdherenceResponse {
  data: IBneficiaryContractsData[];
  totais: {
    valorProdutoTotal: number;
    valorEmpresaTotal: number;
    valorColaboradorTotal: number;
  };
  isLoading: boolean;
}

export interface IBeneficiaryHistoricList {
  idProduto: number;
  nomeComercialProduto: string;
  nomeReduzidoProduto: string;
  idClasseProduto: number;
  nomeClasseProduto: string;
  regulamentado: boolean;
  flCoparticipacao?: boolean;
  registroAnsProduto?: string;
  detalhesProduto?: string;
  redeCredenciada?: string;
  nomeTipoContratacao?: string;
  nomeSegmentacaoAssistencial?: string;
  nomeAbrangencia?: string;
  nomeAcomodacao?: string;
  nomeParceiro: string;
  logoLink: string;
  idParceiro: number;
  idContratoBeneficiario: number;
  nomeStatusContratoBenef: string;
  idContratoEmpresa: number;
  proposta_adesao: number;
  dataInclusao: string;
  dataInicioVigencia: string;
  dataExclusao?: string;
}

export interface IBeneficiaryHistoricArgs {
  beneficiaryId: string;
  page: number;
  size: number;
}

export interface IBeneficiaryHistoric {
  id: string;
  adherenceProposalId: string;
  parametrizerId: string;
  contractId: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  productId: string;
  productCommercialName: string;
  productClass: string;
  providerName: string;
  status: string;
  group: string;
  cardNumber: string;
  beneficiaryId: string;
  beneficiaryName: string;
  cancelRequestId: string;
  value?: number;
  effectiveStartDate: string;
  effectiveFinalyDate: string;
  subscriptionDeadline: string;
  updateType: string;
  beneficiaryContractId: string;

  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  parametrizer: IParametrizer;
}

export interface IBeneficiaryHistoricResponse {
  data: IBeneficiaryHistoric[];
  count: number;
  isLoading: boolean;
}

export interface IBenefitInCancel {
  id: number;
  motivos_cancelamento_beneficio: unknown;
  flSolicitadoPor: string;
  dataSolicitacao: string;
  dataCancelamento: string;
  validadoPor: unknown;
  dataValidacao: string;
  protocolo: string;
  status_solicitacao_cancelamento: unknown;
  published_at: string;
  created_at: string;
  updated_at: string;
  nomeSolicitante: string;
}

export interface IBenefitInCancelResponse {
  data: IBenefitInCancel | null;
  isLoading: boolean;
}

export interface IClassesBenefits {
  id: number;
  nomeClasseProduto: string;
  ordemExibicao: number;
  descricaoClasseProd: string;
}
export interface IClassesBenefitsResponse {
  classes: IClassesBenefits[];
  isLoading: boolean;
}

export interface IResubmissionsDocHolderData {
  celularTitular: string;
  emailTitular: string;
  nomeTitular: string;
}

export interface IDocData {
  documentoObrigatorio: boolean;
  documentosPessoaFisica: {
    arquivo: string;
    arquivoVerso: string;
    id: number;
    pessoa_fisica: number;
    tipo_doc_pessoa_fisica: number;
    status_doc_pessoa_fisica: {
      id: number;
      nomeStatusDocPessoaFisica: string;
    };
  };
  id: number;
  regra_adesao: number;
  tipo_doc_pessoa_fisica: {
    id: number;
    contabilizaPerfil: boolean;
    frenteVerso: boolean;
    nomeTipoDocPessoaFisica: string;
    descricao: string;
  };
  url: string;
}

export interface IResubmissionsDocData {
  pessoa_fisica: {
    nomePessoaFisica: string;
  };
  documentos: IDocData[];
  contrato_beneficiario: number;
  id: number;
  familia: number;
}

export interface IResubmissionsDocResponse {
  data: IDataPersonDocuments[];
  holder: IResubmissionsDocHolderData | undefined;
  isLoading: boolean;
}

export interface ICompaniesAssociatedContractData {
  id: string;
  contractId: string;
  productId: string;
  companyAssociatedId: string;
  activ: boolean;
  available: boolean;
  createdAt: string;

  product: {
    id: string;
    companyProviderId: string;
    commercialName: string;
    reducedName: string;
    codProviderBenefit: string;
    productClass: string;
    codRegistrySUSEP: string;
    codRegistryANS: string;
    exclusiveToCompany: boolean;
    datasheet: string;
    accreditedNetwork: string;
    hiringType: string;
    outpatientSegmentation: string;
    coparticipation: boolean;
    accommodation: string;
    coverage: string;
    codIbgeUF: number[];
    codIbgeMunicipio: number[];
    documentForCancellation: string | null;
    regulated: boolean;
    details?: string;
    chargeType: string;
    createdAt: string;
  };
}

export interface IgetContractResponse {
  data: ICompaniesAssociatedContractData;
  isLoading: boolean;
}

export interface ICheckByCpfArgs {
  cpf: string;
  holderId?: string;
}

export interface ICheckBornDateArgs {
  personId: string;
  bornDate: string;
  holderId?: string;
}

export interface ICreateCollaboratorArgs {
  companyId: string;
  name: string;
  cpf: string;
  numero: string;
  email: string;
  sex: string;
  bornDate: string;
  phone: string;
  sector: string;
  occupation: string;
  contractDate: string;
  typeContract: string;
  estado_civil: string;
  nomeMae: string;
  cep: string;
  registration: string;
  endereco: string;
  bairroEndereco: string;
  unidade_federativa: string;
  municipio: string;
  addProduct?: boolean;
  isLink?: boolean;
  personId?: string;
  uf: string;
  city: string;
  codIbgeCity: string;
  codIbgeUf: string;
  complemento: string;
}

export interface ICreateCollaboratorResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateCollaboratorArgs, unknown>;
}

export interface ICancelProductInProcessArgs {
  beneficiaryContractIds: string[];
}

export interface ICancelAtiveProductArgs {
  cancelReason: string;
  cancelrequestBy: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  cancellationDocumentToken: any;
  beneficiaryContracts: string[];
}

export interface IUpdateCollaboratorArgs {
  id: string;
  idPerson: string;
  nomePessoaFisica: string;
  celular: string;
  sexo: number;
  estado_civil: number;
  nomeMae: string;
  setor: string;
  cargo: string;
  dataAdmissao: string;
  relacao_trabalhista: string;
  CEP: string;
  endereco: string;
  bairroEndereco: string;
  complemento: string;
  municipio: string;
  registration: string | null;
  municipioLabel: string;
  unidade_federativa: string;
  unidade_federativaLabel: string;
  flAtivacao: string;
  numero: string;
}

export interface IDataPersonDoc {
  id: string;
  statusDocument: string;
  typeDocument: string;
  token: string;
  createdAt: string;
  personId: string;
  personDocumentTypeId: string;
  personDocumentType: {
    id: string;
    name: string;
    description: string;
    increasePoints: boolean;
    documentFrontAndBack: boolean;
    createdAt: string;
    templateDocumentToken: string | null;
  };
}

export interface IDataPersonDocuments {
  beneficiaryName: string;
  beneficiaryKinship: string;
  id: string;
  statusDocument: string;
  typeDocument: string;
  token: string;
  createdAt: string;
  personId: string;
  personDocumentTypeId: string;
  personDocumentType: {
    id: string;
    name: string;
    description: string;
    increasePoints: boolean;
    documentFrontAndBack: boolean;
    createdAt: string;
    templateDocumentToken: string | null;
  };
  docs: IDataPersonDoc[];
}

export interface IGetPersonDocumentsReponse {
  isLoading: boolean;
  data: IDataPersonDocuments[];
}

export interface IUpdateCollaboratorPrecadArgs {
  id: number;
  cargo: string;
  celular: string;
  dataAdmissao: string;
  nome: string;
  relacao_trabalhista: string;
  setor: string;
  sexo: number;
}

export interface IUpdateCollaboratorResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateCollaboratorArgs, unknown>;
}

export interface IUpdateCollaboratorPrecadResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    IUpdateCollaboratorPrecadArgs,
    unknown
  >;
}

export interface IUpdateDependentArgs {
  id: number;
  idPessoaFisica: number;
  nomePessoaFisica: string;
  celular: string;
  sexo: number;
  estadoCivil: number;
  nomeMae: string;
  parentesco: number;
}

export interface ICreateDependentArgs {
  cpf: string;
  name: string;
  bornDate: string;
  phoneNumber: string;
  email: string;
  sexIdentity: string;
  beneficiaryKinship: string;
  beneficiaryType: string;
  personMaritalStatus: string;
  nameMother: string;
}

export interface IUpdateDependentResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateDependentArgs, unknown>;
}

export interface IDataDisableCollaborator {
  id: string;
  beneficiaryContracts: {
    id: string;
    contractId: string;
    beneficiaryId: string;
    beneficiaryName: string;
    companyId: string;
  }[];
  benficiaryKinship: string;
  productName: string;
  provider: string;
  needCancellationDocument: boolean;
  cancellationDocumentToken?: string;
}

export interface IinativeCollaboratorWithProductArgs {
  beneficiaryId: string;
  setActiveContracts: any;
}

export interface IDisableCollaboratorResponse {
  data: IDataDisableCollaborator[];
}

export interface IinativeCollaboratorWithProductResponse {
  data: {
    beneficiaryContracts: string[];
    cancellationDocumentToken: any;
  }[];
}

export interface IUpdateBenefitPriceContractArgs {
  beneficiaryContractId: string;
  beneficiaryId: string;
  positionId: string;
  sectorId: string;
  relationshipType: string;
  relationship: string;
  companyId: string;
  productId: string;
  companyContractId: string;
  percentageValue: "P" | "V";
  value: number;
  type: "single";
}

export interface IUpdateBenefitPriceContractResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    IUpdateBenefitPriceContractArgs,
    unknown
  >;
}

export interface IBeneficiaryCheckResponse {
  id: string;
  integrated: boolean;
  registryOrigin?: string;
  name: string;
  nameFormatted: string;
  cpf: string;
  email: string;
  bornDate: string;
  nameMother: string;
  rg?: string;
  issuingAgencyRg?: string;
  dateOfIssue?: string;
  phoneNumber: string;
  completeRecord: boolean;
  sexIdentity: string;
  personMaritalStatus: string;
  createdAt: string;
  updatedAt: string;
  personAddress: Array<{
    id: string;
    publicPlace: string;
    number: string;
    complement?: string;
    cep: string;
    neighborhood: string;
    codIbgeCity: number;
    city: string;
    codIbgeUf: number;
    uf: string;
    isBillingAddress: boolean;
    createdAt: string;
  }>;
}

export interface ILinkBeneficiaryDependantDTO {
  cpf: string;
  name: string;
  bornDate: string;
  phoneNumber: string;
  email: string | null;
  sexIdentity: string;
  beneficiaryKinship: string;
  beneficiaryType: string;
  personMaritalStatus: string;
  nameMother: string;

  companyId?: string;
  personId?: string;
  holderId?: string;
}
