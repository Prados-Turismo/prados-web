import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { pixelToRem } from "../../utils";

// Types
import { INumericInput } from "./types";

const NumericInput = ({
  value,
  onChange,
  valueLimit,
  isDisable = false,
  maxWidth = "140px",
  height = "32px",
  textAlign = "center",
}: INumericInput) => {
  const [formattedValue, setFormattedValue] = useState(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(Number(value)),
  );

  const isValueAllowed = (value: { value: string; floatValue: number }) => {
    if (value.value === "") {
      return true;
    }
    const floatValue = value.floatValue;
    return floatValue <= valueLimit;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^\d]/g, "");
    const floatValue =
      parseFloat(inputValue !== "" ? inputValue : "0,00") / 100;
    const newValue = isValueAllowed({ value: inputValue, floatValue })
      ? floatValue
      : Number(value);
    const newFormattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(newValue);

    setFormattedValue(newFormattedValue);
    onChange(newValue);
  };

  useEffect(() => {
    setFormattedValue(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(Number(value)),
    );
  }, [value]);

  return (
    <Input
      isDisabled={isDisable}
      type="text"
      value={formattedValue}
      onChange={handleChange}
      style={{
        maxWidth: maxWidth,
        fontSize: pixelToRem(16),
        textAlign: textAlign,
        height: height,
      }}
    />
  );
};

export default NumericInput;
