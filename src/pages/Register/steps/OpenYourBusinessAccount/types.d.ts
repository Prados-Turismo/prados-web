import { IFormRegister } from "../../../../models/register.model";

export interface IOpenYourBusinessAccount {
  form: IFormRegister;
  setForm: React.Dispatch<React.SetStateAction<IFormRegister>>;
  handleNextStep: () => void;
}
