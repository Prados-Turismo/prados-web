import { IBenefitsCounts } from "../../../../models/benefits.model";
import { IDataProductContract } from "../../../../models/product.model";

export interface IParameterizer {
  menu: string;
  data: IDataProductContract[];
  status: string;
  isLoading: boolean;
  isFetching: boolean;
  counts: IBenefitsCounts | undefined;
  isFavorite?: boolean;
  userId?: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  order: string;
}
