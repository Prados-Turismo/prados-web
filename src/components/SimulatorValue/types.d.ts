import { IDataProductContract } from "../../models/product.model";

interface ISimulatorValueModal {
  benefit: IDataProductContract;
  showModal: boolean;
  setShowModal: (e: boolean) => void;
}
