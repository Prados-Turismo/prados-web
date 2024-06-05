import { IFormRegister } from "../../../../models/register.model";

export interface IWeNeedYourData {
  form: IFormRegister;
  setForm: React.Dispatch<React.SetStateAction<IFormRegister>>;
  handleNextStep: () => void;
  demonstration: boolean;
  handlePreviousStep: () => void;
}
