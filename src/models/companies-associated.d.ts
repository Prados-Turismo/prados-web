export interface ICompaniesAssociated {
  id: string;
  cnpj: string;
  corporateName: string;
  irsEmail: string;
  irsSituation: string;
  irsSituationDate: string;
  createdAt: string;
  companyAssociated: ICompanyAssociated;
  companyAddress: ICompanyAddress[];
  companyContact: ICompanyContact;
  companyBroker: ICompanyBroker
  cnae: ICnae[];
}

export interface ICompanyBroker {
  id: string
}
export interface Hub {
  id: string;
  name: string;
  slug: string;
}

export interface ICompanyAssociatedStatus {
  status: string;
  active: boolean;
  legalDocument: [];
  legalRepresentative: [];
}

export interface ICompanyAssociated {
  whoIndicated?: null;
  interest?: null;
  minQuantityCollaborators?: null;
  maxQuantityCollaborators?: null;
  companyStatus: ICompanyAssociatedStatus[];
  companyType: string;
  observation: string;
  isIssue: boolean;
  tax: number;
  active: boolean;
  companyRepresentative?: ICompanyRepresentative[] | null;
  hub: Hub;
  useTerm?: {
    companyAssociatedId: string;
    cpf: string;
    email: string;
    id: string;
    ip: string;
    name: string;
    termAssignedAt: string;
  } | null;
}
export interface ICompanyRepresentative {
  status: string;
  active: boolean;
  legalDocument?: any[] | null;
  legalRepresentative?: any[] | null;
}
export interface IHub {
  id: string;
  name: string;
  slug: string;
}
export interface ICompanyAddress {
  id: string;
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
  isIrsAddress: boolean;
  companyId: string;
  createdAt: string;
}
export interface ICompanyContact {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  preference: string;
  createdAt: string;
  companyId: string;
}
export interface ICnae {
  id: string;
  code: string;
  text: string;
  primary: boolean;
  companyId: string;
  createdAt: string;
}

export interface IShowCompanyAssociated {
  id: string;
  cnpj: string;
  corporateName: string;
  irsEmail: string;
  irsSituation: string;
  irsSituationDate: string;
  createdAt: string;
  companyAssociated: {
    whoIndicated: any;
    interest: any;
    minQuantityCollaborators: any;
    maxQuantityCollaborators: any;
    companyType: string;
    observation: string;
    isIssue: boolean;
    tax: number;
    active: boolean;
    companyRepresentative: Array<{
      status: string;
      active: boolean;
      legalDocument: Array<any>;
      legalRepresentative: Array<any>;
    }>;
    hub: {
      id: string;
      name: string;
      slug: string;
    };
  };
  companyAddress: Array<{
    id: string;
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
    isIrsAddress: boolean;
    companyId: string;
    createdAt: string;
  }>;
  companyContact: {
    id: string;
    name: string;
    position: string;
    phone: string;
    email: string;
    preference: string;
    createdAt: string;
    companyId: string;
  };
  cnae: Array<{
    id: string;
    code: string;
    text: string;
    primary: boolean;
    companyId: string;
    createdAt: string;
  }>;
}
