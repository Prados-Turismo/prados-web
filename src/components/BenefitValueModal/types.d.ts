import { IDataProductContract } from "../../models/product.model";

interface IBenefitModal {
  benefit: IDataProductContract;
  showModal: boolean;
  setShowModal: (e: boolean) => void;
  page?: string;
  relationship: "holder" | "dependent" | "aggregated";
  parametrizerItemValue?: value;
  percentageValue?: string;
}
