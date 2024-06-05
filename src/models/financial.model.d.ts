export interface IInvoicesArgs {
  page: number;
  size: number;
  companyId: string;
}

export interface IInvoicesResponse {
  isLoading: boolean;
  count: number;
  rows: IInvoice[];
}

export interface IInvoice {
  id: string;
  companyId: string;
  corporateName: string;
  hubId: string;
  hubName: string;
  processReport: boolean;
  report: boolean;
  monthCompetence: number;
  yearCompetence: number;
  expiration: Date | null;
  totalValue: number;
  totalDiscount: number;
  totalIncrease: number;
  totalDiscountWallet: number;
  status: "suing" | "begotten" | "envoy" | "paid" | "excluded" | "failed";
  paymentDate: Date | null;
  paymentValue: null;
  interestPenalty: null;
  incomeCategoryId: string;
  currentAccount: string;
  note: null;
  CCodIntOs: null;
  nCodOs: null;
  receiptToken: string;
  receiptTokens?: {
    batchInvoiceId: string;
    createdBy: string;
    fileName: string;
    id: string;
    createdByUserName: string;
    token: string;
    createdAt: string;
  }[];
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  incomeCategory: IncomeCategory | null;
}

interface IncomeCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
}

export interface IMovimentationsArgs {
  offset: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
}

export interface IMovimentationsResponse {
  isLoading: boolean;
  count: number;
  movimentations: IMovimentation[];
  accountExists: boolean;
}

export interface IMovimentation {
  batchInvoiceId: string;
  //Vou manter as tipagens legadas, por não saber se afetaria outras partes da aplicação
  id: number;
  valor: number;
  data: string;
  tipo_movimentacao: "1" | "2" | "3";
  lote_wallet: number;
  entranda: number;
  saida: number;
  // saldo_fiibo: any
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  tipo_movimentacaos: {
    id: number;
    nomeTipoMovimentacao: string;
    descricao: string;
  };
  saldo_entrada: SaldoEntrada;
  saldo_saida: SaldoSaida;
  /**
   * NOVOS DADOS
   */
  value: number;
  operationType: {
    id: string;
    name: string;
    description: string;
  };
  operationTypeId: "1" | "2" | "3";
  createdAt: string;
  friendlyOperationType: string;
  friendlyOperationTypeDescription: string;
}

export interface IAnalyticReportResponse {
  id: number;
  user: string;
  cpf: string;
  value: number;
  created_at: Date;
}

export interface IAnalyticReportHistoricResponse {
  id: number;
  balance: string;
  provider: string;
  product: string;
  value: number;
  type: string;
}

export interface ICompanyContemplatedResponse {
  id: number;
  cnpj: string;
  flContemplado: boolean;
  razaoSocial: string;
}

export interface IWalletResponse {
  isLoading: boolean;
  balance: number;
}

export interface IUseFinancialResponse {
  getInvoices: (args: IInvoicesArgs) => IInvoicesResponse;
  getMovimentations: (args: IMovimentationsArgs) => IMovimentationsResponse;
  getInvoiceReportDetail: (id: string, setIsLoading: any) => void;
  getInvoiceTicket: (id: string, setIsLoading: any) => void;
  getInvoiceSlip: (id: string, setIsLoading: any) => void;
  getInvoicePaymentNote: (id: string, setIsLoading: any) => void;
  getCompanyContemplated: () => ICompanyContemplatedResponse;
  getWallet: (companyId: string) => IWalletResponse;
}
