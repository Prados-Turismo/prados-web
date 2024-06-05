import { IParameterizer } from "../../../../../../models/parameterizer.model";
import { IDataProductContract } from "../../../../../../models/product.model";

export interface ITRBenefitParameterizer {
  item: IParameterizer;
  benefit: IDataProductContract;
}

export interface IFormParameterizerInputs {
  percentualOuValor: string;
  percentualDescontoPadrao: number;
  valorDescontoPadrao: number;
  percentage: number
}

export interface IParameterization {
  item: IParameterizer;
  benefit: IDataProductContract;
  borderTop?: string;
}

export interface IAddParameterization {
  benefit: IDataProductContract;
  showAddModal: boolean;
  setShowAddModal: (boolean) => void;
}

export interface IFormAddParameterization {
  beneficiario: number | null;
  cargo: number | null;
  setor: number | null;
  percentualOuValor: string;
  percentualDescontoPadrao: number;
  valorDescontoPadrao: number;
}

export interface ICollaborator {
  id: number;
  nomePessoaFisica: string;
}
