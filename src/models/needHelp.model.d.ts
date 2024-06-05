import { IIncorrectBornDateData } from "../pages/NeedHelp/need-help";

export enum ISidebarNeedHelpStatus {
  S = "S",
  A = "A",
  E = "E",
}

export interface ISidebarNeedHelp {
  status: ISidebarNeedHelpStatus;
  onStatus: (status: ISidebarNeedHelpStatus) => void;
  incorrectBornDateData?: IIncorrectBornDateData
}

export interface INeedHelpArgs {
  company: string;
  status: ISidebarNeedHelpStatus;
  currentPage: number;
  pageSize: number;
  selectedRole: "companies" | "broker-agents" | "beneficiaries";
}

export interface IMessageArgs {
  currentPage: number;
  pageSize: number;
  selectedRole: string;
  callId: string;
}

export interface IMessageResponse {
  data: IDataMessage[];
  isLoading: boolean;
  hasMore: boolean;
}

export interface INeedHelpResponse {
  data: IDataNeedHelp[];
  count: number;
  isLoading: boolean;
  refetch: () => Promise<any>
}

export interface IDataNeedHelp {
  id: string;
  protocol: string;
  hubId: string;
  hubName: string;
  companyId: string;
  companyName: string;
  beneficiaryId: any;
  brokerAgentId: any;
  callReasonId: string;
  callReasonSubject: any;
  resolution: any;
  requestingUser: string;
  requestingUserName: string;
  solverUser: any;
  solverUserName: any;
  status: string;
  openedAt: string;
  deadlineAt: string;
  resolutionAt: any;
  createdAt: string;
  shared: boolean
  sharedBy?: string
  sharedByUserName?: string
  callReasons: {
    id: string;
    name: string;
    enviroment: "company" | "beneficiary" | "brokerAgent"
  };
}
export interface IAssuntoChamado {
  id: number;
  nomeAssuntoChamado: string;
  descricao: string;
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  flAmbiente: string;
}
export interface IStatusChamado {
  id: number;
  nomeStatusChamada: string;
  descricao?: null;
  published_at: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}
export interface IHub {
  id: number;
  nomeHub: string;
}
export interface IEmpresa {
  id: number;
  razaoSocial: string;
}
export interface ISolucionadoPor {
  id: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken?: null;
  confirmed: boolean;
  blocked: boolean;
  role: IRole;
  nome: string;
  fl_ativo: boolean;
  fl_primeiro_acesso: boolean;
  empresa?: null;
  pessoa_fisica?: null;
  dataAceiteTermo?: null;
  termo_privacidade?: null;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  flAceitaSms?: null;
  flAceitaEmail?: null;
  parceiro?: null;
  flMultiEmpresa?: null;
  flAceitaTermoUsoDados?: null;
  dataAceiteTermoUsoDados?: null;
  termo_uso_dado?: null;
}
export interface IRole {
  id: number;
  name: string;
  description: string;
  type: string;
}
export interface ISolicitadoPor {
  id: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken?: null;
  confirmed?: null;
  blocked: boolean;
  role: IRole;
  nome: string;
  fl_ativo: boolean;
  fl_primeiro_acesso: boolean;
  empresa: number;
  pessoa_fisica?: null;
  dataAceiteTermo?: null;
  termo_privacidade?: null;
  created_by?: null;
  updated_by: number;
  created_at: string;
  updated_at: string;
  flAceitaSms?: null;
  flAceitaEmail?: null;
  parceiro?: null;
  flMultiEmpresa: boolean;
  flAceitaTermoUsoDados?: null;
  dataAceiteTermoUsoDados?: null;
  termo_uso_dado?: null;
}

export interface IDataMessage {
  id: string;
  message: string;
  isAdmin: boolean;
  isRead: boolean;
  requestingUserName: string;
  callId: string;
  createdAt: string;
  attachments: Array<any>;
}
export interface IEnviadoPor {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: IRole;
  nome: string;
  fl_ativo: boolean;
  fl_primeiro_acesso: boolean;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}
export interface ICancelRequest {
  requestId: string;
  solverUser: string;
  solverUserName: string;
  notificationId: string[];
}

export interface IDataTopic {
  id: string;
  name: string;
  description: string;
  enviroment: string;
  createdAt: string;
  slug?: string
}

export interface ITopicResponse {
  data: IDataTopic[];
  isLoading: boolean;
}

export interface IHandleCancelRequestResponse {
  cancelRequest: ({ requestId }: ICancelRequest) => void;
  isLoading: boolean;
}

export interface ISubmitRequest {
  data: {
    hubId: string;
    hubName: string;
    companyId: string;
    companyName: string;
    callReasonId: string;
    callReasonSubject: string | null;
    requestingUser: string;
    requestingUserName: string;
    message: string;
    attachments: Array<string>;
    isAdmin: boolean;
    shared: boolean
  };
  role: string;
  companyId: string;
}

export interface ISubmitIndicateProduct {
  data: {
    callReasonId: string;
    companyId: string;
    companyName: string;
    hubId: string;
    hubName: string;
    message: string;
    requestingUser: string;
    requestingUserName: string;
    isAdmin: boolean;
  };
}

export interface IHandleSubmitRequestResponse {
  submitRequest: ({ data, dataFile }: ISubmitRequest) => void;
  isLoadingSubmit: boolean;
}

export interface IHandleSubmitIndicateProductResponse {
  submitRequest: ({ data }: ISubmitIndicateProduct) => void;
  isLoadingSubmit: boolean;
  isSuccess: boolean;
}

export interface IHandleDownloadDocumentResponse {
  downloadDocument: (id: number) => void;
  isLoading: boolean;
}

export interface ISupportNotificationMessage {
  id: string;
  message: string;
  isAdmin: boolean;
  isRead: boolean;
  requestingUserName: string;
  callId: string;
  createdAt: Date;
  call: IDataNeedHelp;
}
export interface ISupportNotificationsResponse {
  isLoading: boolean;
  data: ISupportNotificationMessage[];
}

export interface IUseNeedHelp {
  getNeedHelp: (args: INeedHelpArgs) => INeedHelpResponse;
  getTopic: (role: string) => ITopicResponse;
  handleCancelRequest: () => IHandleCancelRequestResponse;
  handleSubmitRequest: () => IHandleSubmitRequestResponse;
  handleSubmitIndicatProduct: () => IHandleSubmitIndicateProductResponse;
  handleDownloadDocument: () => IHandleDownloadDocumentResponse;
  getSupportNotifications: (role: string) => ISupportNotificationsResponse;
  getMessageChat: (args: IMessageArgs) => IMessageResponse;
  handleShareCall: (callId: string, shared: boolean) => Promise<AxiosResponse<any, any>>
}
