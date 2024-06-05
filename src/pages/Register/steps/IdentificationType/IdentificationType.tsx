import { HStack, Text, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "../../../../components/RadioCard";
import RegisterIcon from "../../../../components/RegisterIcon";
import { Button, Title } from "../../styled";
import { IIdentificationType } from "./types";

const cards = [
  {
    label: "Sou RH",
    icon: <RegisterIcon id={1} />,
  },
  {
    label: "Sou Corretor",
    icon: <RegisterIcon id={2} />,
  },
  {
    label: "Sou Fornecedor",
    icon: <RegisterIcon id={3} />,
  },
  {
    label: "Sou Emissor",
    icon: <RegisterIcon id={4} />,
  },
];

const IdentificationType = ({
  identificationType,
  setIdentificationType,
  handleNextStep,
}: IIdentificationType) => {
  const options = cards.map((el) => el.label);

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "Sou RH",
    onChange: setIdentificationType,
  });

  const group = getRootProps();

  return (
    <>
      <Title>Tipo de identificação</Title>
      <HStack
        {...group}
        gap="9px"
        width="100%"
        justifyContent="center"
        padding={{
          base: "0 10px",
          md: "0 20px",
        }}
        flexWrap="wrap"
      >
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard
              key={value}
              {...radio}
              card={cards.filter((el) => el.label === value)[0]}
            >
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <Text textAlign="left" width="100%" padding="0 20px">
        {identificationType === "Sou RH" &&
          "O RH é responsável por administrar os programas de benefícios de saúde e bem-estar da empresa."}

        {identificationType === "Sou Corretor" &&
          "O corretor é responsável por cotar e administrar os benefícios de saúde e bem-estar da empresa."}

        {identificationType === "Sou Fornecedor" &&
          "O fornecedor é responsável por ofertar e prestar serviços de saúde e bem-estar na plataforma."}

        {identificationType === "Sou Emissor" &&
          "O emissor é responsável por fazer a gestão dos benefícios PAT (Programa de Alimentação do Trabalhador) dos Clientes RH's."}
      </Text>

      <Button onClick={handleNextStep}>Continuar</Button>
    </>
  );
};

export default IdentificationType;
