import { IDataProductContract } from "../../../../models/product.model";

export interface ITRBenefitSettings {
  item: IDataProductContract;
  menu: string;
  isFavorite?: boolean;
  userId?: string;
  isFetching: boolean;
}
export interface IBenefitParameterizer {
  benefit: IDataProductContract;
}

export interface IBenefitHistoric {
  benefit: IDataProductContract;
}
