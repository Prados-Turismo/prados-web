import { IDataProductContract } from "../../../../models/product.model";

export interface ITRBenefits {
  item: IDataProductContract;
  userId?: string;
  provideFavoriteOption?: boolean;
  selectProduct: (product: IDataProductContract) => void;
  selectedProducts: IDataProductContract[];
  isFetching: boolean;
}
