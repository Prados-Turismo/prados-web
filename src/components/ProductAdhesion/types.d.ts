import { IDataProductContract } from "../../models/product.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProductAdhesion {
  isOpen: boolean;
  onClose: () => void;
  product: IDataProductContract | IFamilyBenefitsGroup;
  page: string;
}
