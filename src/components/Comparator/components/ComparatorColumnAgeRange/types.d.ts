import { IDataValues } from "../../../../models/product.model";

export interface IComparatorColumnAgeRange {
  item: IDataValues[];
  title: string;
  isHeader: boolean;
  uniqueValue?: number | null;
}
