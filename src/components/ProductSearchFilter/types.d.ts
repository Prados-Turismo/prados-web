import { IBenefitsCounts } from "../../models/benefits.model";

export interface IProductSearchFilter {
  isLoading: boolean;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
  search: any;
  setFieldSearch?: any;
  counts: IBenefitsCounts | undefined;
  menu: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
}
