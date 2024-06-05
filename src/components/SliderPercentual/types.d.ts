import { IFormParameterizerInputs } from "../../pages/BenefitSettings/components/TRBenefitSettings/components/TRBenefitParameterizer/types";

export interface ISliderPercentual {
  editEnable: boolean;
  setForm: Dispatch<SetStateAction<string>>;
  form: IFormParameterizerInputs;
  value: number;
}
