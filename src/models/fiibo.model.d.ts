import { IFormRegister } from "./register.model";

export interface IFiiboArgs {
  cnpj: string;
  nomeContato: string;
  telefoneContato: string;
  emailContato: string;
  preferenciaContato: string;
  observacao: string;
}

export interface WalletAssociatedCompany {
  id: string;
  active: boolean;
  companyName: string;
  createdAt: string;
  cnpj: string;
  accountNumber: string;
  companyId: string;
  beneficiariesCount: number | null;
  balanceExpiration: number | null;
  companyAssociatedId: string;
}

interface ICompanyBeneficiaryResponse {
  id: string;
  registration?: string;
  dependentCode?: string;
  employmentRelationship: boolean;
  employmentRelationshipType?: "partner" | "youngApprentice" | "clt" | "intern";
  sectorId: string;
  positionId: string;
  payrollSpendingLimit?: number;
  admissionDate?: Date;
  unlinkDate?: Date;
  statusActiveDate?: Date;
  authorizesDownloadDocument: boolean;
  beneficiaryKinship:
    | "holder"
    | "spouse"
    | "father"
    | "mother"
    | "child"
    | "stepchild"
    | "grandchild"
    | "nephew"
    | "parentInLaw"
    | "aggregated"
    | "companion"
    | "brother";
  beneficiaryType: "holder" | "dependent" | "aggregated";
  beneficiaryStatus: "A" | "I" | "P";
  personId: string;
  companyId: string;
  parentId?: string;
  person?: {
    id: string;
    name: string;
    cpf: string;
  };
  sector?: {
    id: string;
    createdAt: Date;
  };
  position?: {
    id: string;
    createdAt: Date;
  };
  companyAssociated?: ICompanyAssociatedResponse;
  dependents?: ICompanyBeneficiaryResponse[];
  createdAt: Date;
}

export interface IEmployeesList {
  id: string;
  beneficiaryId: string;
  companyAssociatedId: string;

  companyAssociated?: ICompanyAssociatedResponse;
  beneficiary?: ICompanyBeneficiaryResponse;
}

export interface IFiiboResponse {
  isLoading: boolean;
  register: (args: IFormRegister) => void;
}
