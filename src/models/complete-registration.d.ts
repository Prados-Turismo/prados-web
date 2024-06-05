export interface ICreateLegalRepresentativeArgs {
  name: string;
  cpf: string;
  email: string;
}

export interface ILegalRepresentativeData
  extends ICreateLegalRepresentativeArgs {
  id: string;
  subscribeType: string;
  representativeStatus: string;
  observation: string;
  createdAt: string;
  companyStatusId: string;
}

export interface ILegalRepresentativeResponse {
  data: ILegalRepresentativeData[];
  count: number;
  isLoading: boolean;
}

export interface ISignatureRepresentativeData {
  id: string;
  name: string;
  cpf: string;
  email: string;
  representativeType: string;
  signed: boolean;
  createdAt: string;
  signatureDocumentId: string;
}

export interface ISignatureDocumentData {
  id: string;
  uuid: string;
  documentName: string;
  createdAt: string;
  companyStatusId: string;
  signatureRepresentative: ISignatureRepresentativeData[];
}

export interface IgetSignaturesStatusResponse {
  data: ISignatureDocumentData[];
  count: number;
  isLoading: boolean;
}

export interface ILegalDocument {
  id: string;
  name: string;
  documentToken: string;
  documentType: string;
  documentStatus: string;
  observation: string | null;
  createdAt: string;
  companyStatusId: string;
}

export interface ILegalDocumentsReponse {
  data: ILegalDocument[];
  count: number;
  isLoading: boolean;
}
