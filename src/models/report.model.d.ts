export enum ISidebarReportStatus {
  A = "A",
  E = "E",
  P = "P",
  C = "C",
}

export interface ISidebarReport {
  status: ISidebarReportStatus;
  onStatus: (status: ISidebarReportStatus) => void;
}

export interface IReportFileArgs {
  company: number | string;
  tab: ISidebarReportStatus;
  status: string | null;
  search: string | null;
  effectiveStartDateFrom: string | null;
  effectiveStartDateTo: string | null;
  effectiveFinalyDateFrom: string | null;
  effectiveFinalyDateTo: string | null;
  sectorId: string | null;
  positionId: string | null;
  providerName: string | null;
  productCommercialName: string | null;
}

export interface IReportFileResponse {
  isLoading: boolean;
  callReport: (args: IReportFileArgs) => void;
}

export interface IReportArgs {
  company: number | string;
  tab: ISidebarReportStatus;
  currentPage: number;
  pageSize: number;
}

export interface IProviderProductsData {
  id: string;
  commercialName: string;
  productClass: string;
  chargeType: string;
  companyProvider: {
    company: {
      id: string;
      cnpj: string;
      corporateName: string;
    };
  };
}

export interface IReportResponse {
  data: IDataReport[];
  count: number;
  isLoading: boolean;
  status: ISelect | null;
  setStatus: Dispatch<SetStateAction<ISelect | null>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sector: ISelect | null;
  setSector: Dispatch<SetStateAction<ISelect | null>>;
  supplier: ISelect | null;
  setSupplier: Dispatch<SetStateAction<ISelect | null>>;
  product: ISelect | null;
  setProduct: Dispatch<SetStateAction<ISelect | null>>;
  occupation: ISelect | null;
  setOccupation: Dispatch<SetStateAction<ISelect | null>>;
  initialDate: string;
  setInitialDate: Dispatch<SetStateAction<string>>;
  finishDate: string;
  setFinishDate: Dispatch<SetStateAction<string>>;
  initialCancelDate: string;
  setInitialCancelDate: Dispatch<SetStateAction<string>>;
  finishCancelDate: string;
  setFinishCancelDate: Dispatch<SetStateAction<string>>;
}

export interface IDataReport {
  id: string;
  adherenceProposalId: string;
  corporateName: string;
  beneficiaryName: string;
  cpf: string;
  bornDate: string;
  admissionDate: string;
  beneficiaryKinshp: string;
  parentCPF: string;
  sector: string;
  position: string;
  providerName: string;
  productCommercialName: string;
  status: string;
  cardNumber: number;
  createdAt: string;
  effectiveStartDate: string;
  value: number;
  companyValue: number;
  beneficiaryValue: number;
  effectiveFinalyDate: string;
}

export interface IReportSelectResponse {
  isLoading: boolean;
  data: IReportSelectResponseData[];
}

export interface ISupplierResponseData {
  id: number;
  nomeParceiro: string;
  cnpjParceiro: string;
}

export interface IProductResponseData {
  id: number;
  nomeComercialProduto: string;
  nomeReduzidoProduto: string;
}

export interface ISupplierArgs {
  companyId: number | string;
}

export interface ISupplierResponse {
  data: ISupplierResponseData[];
  isLoading: boolean;
}
export interface IUseReport {
  getReport: (args: IReportArgs) => IReportResponse;
}
