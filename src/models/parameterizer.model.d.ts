import { IDataCollaborator, IPosition, ISector } from "./collaborator.model";

export interface IParameterizer {
  id: string;
  beneficiaryId: string;
  positionId: string;
  sectorId: string;
  relationship: string;
  companyId: string;
  productId: string;
  companyContractId: string;
  percentageValue: string;
  relationshipType: "holder" | "dependent" | "aggregated";
  value: number;
  type: string;
  active: boolean;
  createdAt: string;
  sector: ISector;
  position: IPosition;
  beneficiary: IDataCollaborator;
  updatedBy: string;
}
export interface ISetor {
  id: number;
  nomeSetor: string;
  published_at: string;
  created_by?: null;
  updated_by?: null;
  created_at: string;
  updated_at: string;
  empresa: number;
}
export interface ICargo {
  id: number;
  nomeCargo: string;
  published_at: string;
  created_by?: null;
  updated_by?: null;
  created_at: string;
  updated_at: string;
  setor: number;
  empresa: number;
}
export interface IBeneficiario {
  id: number;
  cpf: string;
  nomePessoaFisica: string;
}
export interface IPrecos {
  id: number;
  valor: number;
  idadeMax: number;
  idadeMin: number;
  idTbPrecoProdHub: number;
}
export interface ITabela {
  precos: IPrecos[];
  nomeDependencia: string;
}
