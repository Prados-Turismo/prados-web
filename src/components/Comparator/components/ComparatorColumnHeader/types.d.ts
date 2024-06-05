import { IDataProductContract } from "../../../../models/product.model";

export interface IComparatorColumnHeader {
  item: IDataProductContract;
  isFetching: boolean;
  handleRemoveProduct: (id: string) => void;
  handleGetProduts: () => void;
}
