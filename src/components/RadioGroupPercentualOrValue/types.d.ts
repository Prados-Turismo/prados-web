import { IFormParameterizerInputs } from "../../pages/BenefitSettings/components/TRBenefitSettings/components/TRBenefitParameterizer/types";

export interface IRadioGroupPercentualOrValue {
  editEnable: boolean;
  setForm: Dispatch<SetStateAction<string>>;
  form: IFormParameterizerInputs;
}
