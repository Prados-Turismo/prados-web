/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDataCollaborator } from "./collaborator.model";

export interface IPersonDocument {
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
  };
}

export interface IDocumentsOnAdherenceRulesData {
  id: string;
  personDocumentTypeId: string;
  personDocumentTypeName: string;
  adherenceRuleId: string;
  required: boolean;
  documentFrontAndBack: boolean;
  templateDocumentToken: string;
  createdAt: string;
  personDocument: IPersonDocument[];
}

export interface IAdherenceRuleData {
  id: string;
  contractId: string;
  productId: string;
  ageGroupId: string;
  relationship: string;
  relationshipType: string;
  createdAt: string;
  documentsOnAdherenceRules: IDocumentsOnAdherenceRulesData[];
}

export interface IFamilyContractData {
  beneficiary: IDataCollaborator;
  value: number;
  adherence: boolean;
  adherenceRule: IAdherenceRuleData;
}

export interface IGetFamilyContractsArgs {
  contractId: string;
  beneficiaryId: string | undefined;
  isRegulated: boolean;
  setcheckedAgrupados: React.Dispatch<
    React.SetStateAction<IFamilyContractData[]>
  >;
}

export interface IGetFamilyContractsResponse {
  data: IFamilyContractData[];
  isLoading: boolean;
}
export interface IUseProductAdhesionResponse {
  getFamilyContracts: (
    args: IGetFamilyContractsArgs,
  ) => IGetFamilyContractsResponse;
}
