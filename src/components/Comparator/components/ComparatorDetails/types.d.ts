import { IDataProductContract } from "../../../../models/product.model";

export interface IComparatorDetails {
  ansProducts: IDataProductContract[];
  personalizedProducts: IDataProductContract[];
}
