import { IDataProductContract } from "../../../../models/product.model";

export interface ITRBenefitEnable {
  item: IDataProductContract;
  menu: string;
}

export interface ICheckedBenefitModal {
  showModal: boolean;
  setShowModal: (e: boolean) => void;
  checkedStatus: boolean;
  setCheckedStatus: (e: boolean) => void;
  companyContractId: string;
}
