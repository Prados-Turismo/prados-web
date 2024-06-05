import { Dispatch, SetStateAction } from "react";
import { IBenefitsCounts } from "../../../models/benefits.model";
import { IDataProductContract } from "../../../models/product.model";

export interface IBenefitsAll {
  data: IDataProductContract[];
  isLoading: boolean;
  isFetching: boolean;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
  search: any;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  counts: IBenefitsCounts | undefined;
  menu: string;
  userId?: string;
  currentTab:
    | {
        name: string;
        status: number;
        isDisabled: boolean;
      }
    | undefined;
  setCurrentTab: Dispatch<
    SetStateAction<
      | {
          name: string;
          status: number;
          isDisabled: boolean;
        }
      | undefined
    >
  >;
}
