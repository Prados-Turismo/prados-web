import { ICompaniesAssociated } from "./companies-associated";

export interface IDataPartnership {
  id: string;
  cnpj: string;
  corporateName: string;
  irsEmail: string;
  irsSituation: string;
  irsSituationDate: string;
  createdAt: string;
  companyAsociated: {
    companyType: string;
    observation: string;
    isIssue: boolean;
    tax: number;
    active: boolean;
    companyRepresentative: {
      status: string;
      active: boolean;
    }[];
    hub: {
      id: string;
      name: string;
      slug: string;
    };
  };
}
export interface IEmpresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  published_at: string;
  created_by?: null;
  updated_by: number;
  created_at: string;
  updated_at: string;
  nomeContato: string;
  cargoContato: string;
  telefoneContato: string;
  emailContato: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  estado: string;
  dtSituacaoCadastral: string;
  situacaoCadastral: string;
  municipio?: any;
  preferenciaContato: string;
  emailReceita: string;
  observacao?: null;
  flEmissora: boolean;
  saldo_wallet?: null;
  flContemplado: boolean;
  percentualOuValor?: null;
  taxaServico?: null;
}
export interface IStatusEmpresaHub {
  id: number;
  nomeStatusEmpresaHub: string;
  descricaoStatusEmpresaHub: string;
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export interface IcorporateData {
  id: string;
  cnpj: string;
  corporateName: string;
  socialReason: string;
  irsEmail: string;
  irsSituation: string;
  irsSituationDate: string;
  createdAt: string;
  companyAssociated: {
    id: string;
    type: string;
    hubSlug: string;
    observation: string;
    active: boolean;
    parentId: string;
    companyId: string;
    createdAt: string;
    isIssue: boolean
  };
}

export interface IPartnershipResponse {
  data: IDataPartnership[];
  count: number;
  isLoading: boolean;
}

export interface IPartnerDetailsResponse {
  data: ICompaniesAssociated | null;
  isLoading: boolean;
}
export interface IPartnershipArgs {
  companyId: string;
  corporateName?: string;
  page?: number;
  size?: number;
}

export interface IGetPartnershipArgs {
  companyId: string;
  corporateName?: string;
  page?: number;
  size?: number;
}

export interface IRegisterPartnerArgs {
  empresa: string | number | undefined;
  razaoSocial: string;
  cnpj: string;
  nomeContato: string;
  telefoneContato: string;
  emailContato: string;
  preferenciaContato: string;
}

export interface IRegisterPartnerResponse {
  isLoading: boolean;
  call: (args: IRegisterPartnerArgs) => void;
}

export interface IEditPartnerArgs {
  companyId: string | undefined;
  nomeContato: string;
  telefoneContato: string;
  emailContato: string;
  preferenciaContato: string;
}

export interface IEditPartnerResponse {
  isLoading: boolean;
  call: (args: IEditPartnerArgs) => void;
}
