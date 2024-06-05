// Types
import { IRadioGroupPercentualOrValue } from "./types";

// Styles
import { RadioGroup, Stack, Radio } from "./styled";
import { IFormParameterizerInputs } from "../../pages/BenefitSettings/components/TRBenefitSettings/components/TRBenefitParameterizer/types";

const RadioGroupPercentualOrValue = ({
  editEnable,
  form,
  setForm,
}: IRadioGroupPercentualOrValue) => {
  return (
    <RadioGroup
      isDisabled={!editEnable}
      onChange={(e: string) => {
        setForm((prev: IFormParameterizerInputs) => ({
          ...prev,
          percentualOuValor: e,
        }));
      }}
      value={form?.percentualOuValor}
    >
      <Stack>
        <Radio value="P">Percentual</Radio>
        <Radio value="V">Valor</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default RadioGroupPercentualOrValue;
