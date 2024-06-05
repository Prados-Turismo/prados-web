// Types
import { ISliderPercentual } from "./types";
import { IFormParameterizer } from "../../models/benefits.model";

// Styles
import {
  Content,
  Text,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "./styled";

const SliderPercentual = ({
  editEnable,
  form,
  setForm,
  value,
}: ISliderPercentual) => {
  return (
    <Content w="60px">
      <Slider
        step={1}
        value={form?.percentage}
        isDisabled={
          (form?.percentualOuValor !== "P" && editEnable) || !editEnable
        }
        aria-label="slider-ex-6"
        onChange={(val: number) => {
          setForm((prev: IFormParameterizer) => ({
            ...prev,
            percentage: val,
            valorDescontoPadrao: val < 100 ? (val / 100) * value : value,
          }));
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>{`${form?.percentage ? form?.percentage : 0} %`}</Text>
    </Content>
  );
};

export default SliderPercentual;
