import { IDataProductContract } from "../../../../models/product.model";

export interface IComparatorColumn {
  item: IDataProductContract;
  isFetching: boolean;
  handleRemoveProduct: (id: string) => void;
  handleGetProduts: () => void;
  hasAnsProduct: boolean;
}
