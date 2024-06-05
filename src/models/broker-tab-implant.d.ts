export interface IBrokerTabData {
  answered: boolean;
  callData: {
    hubId: string;
    hubName: string;
    companyName: string;
    callReasonId: string;
    callReasonSubject: string;
    requestingUser: string;
    requestingUserName: string;
  };
  messageData: {
    callCase: string;
    nomeContato?: string;
    razaoSocial?: string;
    telefone?: string;
    emailOperacional?: string;
    cnpj?: string;
    attachments: Array<string>;
  };
}

export interface ICompanyBrokerResponse {
  id: string;
  judicialEmail: string;
  operationalEmail: string;
  phone?: string;
  beneficiaryContactPhone: string;
  observation: any;
  active: boolean;
  companyId: string;
  createdAt: string;
}

export interface IFetchBrokersResponse {
  count: number;
  rows: Array<{
    id: string;
    cnpj: string;
    corporateName: string;
    irsEmail: string;
    irsSituation: string;
    irsSituationDate: string;
    createdAt: string;
    companyBroker: ICompanyBrokerResponse;
  }>;
}

export interface IUseBrokerTab {
  sendBrokerData(
    data: IBrokerTabData,
    formId: string,
    comanyId: string,
  ): Promise<void>;
  fetchBrokers: () => {
    brokerList: IFetchBrokersResponse | undefined;
    isFetchingBrokers: boolean;
  };
}

export interface IBroker {
  bairro: string;
  cep: string;
  cnpj: string;
  corretors: { blocked: boolean }[];
  created_at: string;
  emailJuridico: string;
  emailOperacional: string;
  endereco: string;
  id: number;
  municipio: {
    id: number;
    nomeMunicipio: string;
    codIbgeMunicipio: string;
    unidade_federativa: {
      id: number;
      uf: string;
      nomeUF: string;
      codIbgeUF: string;
    };
  };
  nomeContato: string;
  nomeFantasia: string;
  published_at: string;
  razaoSocial: string;
  representante_corretoras: any[];
  telContatoBeneficiario: null | string;
  telefone: string;
  unidade_federativa: {
    id: number;
    uf: string;
    nomeUF: string;
    codIbgeUF: string;
  };
  updated_at: string;
}

export interface ICreateBroker {
  nomeContato: string;
  razaoSocial?: string;
  cnpj?: string;
  telefone: string;
  emailOperacional?: string;
}

export interface IFormularioImplantacao {
  id: number;
  nomeFormularioImplantacao: string;
  flExibicao: boolean;
  published_at: string;
  created_by: number;
}

export interface IFormulario {
  chamado: null | string;
  created_at: string;
  created_by: number;
  empresa: number;
  flEnviado: null | boolean;
  flExibe: null | boolean;
  formulario_implantacao: IFormularioImplantacao;
  id: number;
  published_at: string;
  resposta: null | string;
  updated_at: string;
  updated_by: number;
}

export interface IAPIResponse {
  erro: boolean;
  exibeModal: boolean;
  formularios: IFormulario[] | [];
  msg: string;
}

export interface IFormData {
  data: IAPIResponse | [];
  isLoading: boolean;
}
