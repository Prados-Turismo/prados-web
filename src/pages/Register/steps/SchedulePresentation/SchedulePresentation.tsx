import { Text } from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";
import { theme } from "../../../../theme";

const SchedulePresentation = () => {
  return (
    <>
      <Text
        fontSize={{ base: pixelToRem(22), md: pixelToRem(28) }}
        lineHeight="42px"
        textAlign="center"
      >
        Agende uma apresentação
      </Text>
      <Text
        padding={{
          base: "0 0px",
          md: "0 60px",
        }}
        textAlign="center"
        fontSize={pixelToRem(18)}
        color="#707070"
        fontWeight="400"
      >
        Descubra as incríveis possibilidades que a plataforma{" "}
        {theme.content.project} oferece. Converse com nossa equipe comercial,
        eles vão guiá-lo nos próximos passos.
      </Text>
    </>
  );
};

export default SchedulePresentation;
