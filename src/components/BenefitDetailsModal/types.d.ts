import { IFamilyBenefitsGroup } from "../../models/collaborator.model";
import { IDataProductContract } from "../../models/product.model";

export interface IBenefitModal {
  product: IDataProductContract | IFamilyBenefitsGroup;
  showModal: boolean;
  setShowModal: (e: boolean) => void;
}
