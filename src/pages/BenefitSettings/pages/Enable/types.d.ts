import { IBenefitsCounts } from "../../../../models/benefits.model";
import { IDataProductContract } from "../../../../models/product.model";

export interface IEnable {
  menu: string;
  data: IDataProductContract[];
  isLoading: boolean;
  counts: IBenefitsCounts | undefined;
  isFavorite?: boolean;
  userId?: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  order: string;
}
