import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { customTheme } from "../../../theme";
import { pixelToRem } from "../../../utils";
import { ContentWrapper } from "./styled";
import File from "./File";

interface Props {
  setNextStep: () => void;
}

const FirstStep: React.FC<Props> = ({ setNextStep }) => {
  return (
    <ContentWrapper>
      <Stack
        boxShadow="0px 4px 24px rgba(0, 0, 0, 0.25)"
        width={120}
        height={120}
        justifyContent="center"
        alignItems="center"
        bgColor="#FFFFFF"
        borderRadius="24px"
        m="0 auto"
      >
        <File />
      </Stack>
      <Stack gap={6}>
        <Text
          fontSize={pixelToRem(20)}
          fontWeight={500}
          lineHeight="30px"
          mt={14}
          color="#333333"
        >
          Boas-vindas à sua jornada de implantação.
        </Text>{" "}
        <Text
          fontSize={pixelToRem(16)}
          lineHeight="24px"
          color="text.third"
          maxW={432}
          m="inherit !important"
        >
          Para tornar sua experiência completa na plataforma, precisamos de
          algumas informações.
        </Text>{" "}
        <Text
          fontSize={pixelToRem(14)}
          lineHeight="21px"
          color="text.fourth"
          m="inherit !important"
        >
          <span style={{ color: customTheme.colors.brand[500] }}>*</span> Você
          pode adicionar ou alterar as informações a qualquer momento.
        </Text>
        <Button onClick={setNextStep} w="108px" h="40px" borderRadius="4px">
          Começar
        </Button>
      </Stack>
    </ContentWrapper>
  );
};

export default FirstStep;
