import { IDataProductContract } from "../../models/product.model";

export interface IBenefitNetworkModal {
  benefit: IDataProductContract;
  showModal: boolean;
  setShowModal: (e: boolean) => void;
}
