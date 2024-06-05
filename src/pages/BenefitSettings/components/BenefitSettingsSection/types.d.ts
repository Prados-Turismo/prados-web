import { Dispatch, SetStateAction } from "react";
import { IBenefitsCounts } from "../../../../models/benefits.model";
import { IDataProductContract } from "../../../../models/product.model";

export interface ITabBar {
  status: string;
  onStatus: (e: string) => void;
  provideFavoriteOption?: boolean;
  isFetching?: boolean;
}

export interface ISection {
  data: IDataProductContract[];
  isLoading: boolean;
  isFetching: boolean;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
  search: any;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  menu: string;
  counts: IBenefitsCounts | undefined;
  userId?: string;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}
