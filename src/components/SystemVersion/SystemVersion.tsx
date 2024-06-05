import { Flex, Tooltip } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

const SystemVersion = () => {
  return (
    <Tooltip
      label="Você está utilizando uma versão beta da plataforma"
      maxW="350px"
      // background="brand.500"
      hasArrow
    >
      <Flex
        cursor="pointer"
        w="36px"
        h="20px"
        borderRadius="2px"
        justifyContent="center"
        alignItems="center"
        backgroundColor="brand.500"
        color="contrast"
        fontSize={pixelToRem(12)}
      >
        Beta
      </Flex>
    </Tooltip>
  );
};

export default SystemVersion;
