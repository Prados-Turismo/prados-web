import { IParametrizer } from "./collaborator.model";

interface IDataValues {
  range: string;
  productPrice: number;
  fees: number;
  finalValue: number;
}

export interface IDataPrecification {
  quantityLives: string;
  holder: IDataValues[];
  dependent: IDataValues[];
  aggregated: IDataValues[];
}

export interface IDataProductContract {
  id: string;
  contractId: string;
  contractToken: string;
  productId: string;
  companyAssociatedId: string;
  active: boolean;
  available: boolean;
  createdAt: string;
  value: number;
  valueCompany: number;
  valueBeneficiary: number;
  product: IDataProduct;
  parametrizer: IParametrizer[];
  precification: IDataPrecification[];
  initContractDate: string;
  finishContractDate: string;
  contractVigenceType: string;

  companyContact?: {
    initContractDate: string;
    finishContractDate: string;
    contractVigenceType: string;
  };

  companyContractId?: string;
  favoritedCompanyContract: { userId: string; companyContractId: string }[];
  reducedName?: string;
}

export interface IDataProduct {
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
  documentForCancellation: string;
  regulated: boolean;
  details: string;
  chargeType: string;
  createdAt: string;

  companyProvider: {
    id: string;
    regulatoryEntity: boolean;
    logo: string;
    typeRegulatoryEntity: string;
    ans: string;
    susep: string;
    crm: string;
    cro: string;
    observation: string;
    active: boolean;
    companyId: string;
    createdAt: Date;

    company: {
      id: string;
      cnpj: string;
      corporateName: string;
      irsEmail: string;
      irsSituation: string;
      irsSituationDate: string;
      createdAt: string;
    };
  };
}

export interface IMembershipProposal {
  nomeTitular: string;
  celularTitular: string;
  emailTitular: string;
  id: number;
  status_proposta_adesao: IStatusPropostaAdesao;
  contrato_empresa: IContratoEmpresa;
  published_at: string;
  created_by: number;
  updated_by?: null;
  created_at: string;
  updated_at: string;
  contrato_beneficiarios: IContratoBeneficiarios[];
}
