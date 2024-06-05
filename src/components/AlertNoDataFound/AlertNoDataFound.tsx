import { Button, Flex, Text } from "@chakra-ui/react";
import FlagIcon from "../FlagIcon";
import { pixelToRem } from "../../utils";
import { IAlerNoDataFound } from "./types";

const AlertNoDataFound = ({
  title = "Nenhum dado encontrado",
  description,
  buttonTitle,
  onClick,
  minH = "300px",
}: IAlerNoDataFound) => {
  return (
    <Flex
      w="100%"
      h="100%"
      minH={minH}
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      fontFamily="Poppins, Roboto, sans-serif"
    >
      <FlagIcon />
      <Text textAlign="center" fontSize={pixelToRem(14)} margin="30px 0">
        {title}
      </Text>
      {description && (
        <Text textAlign="center" fontSize={pixelToRem(14)}>
          {description}
        </Text>
      )}

      {onClick && (
        <Button
          borderRadius="2px"
          w="max-content"
          h="31px"
          marginTop="30px"
          onClick={onClick}
        >
          {buttonTitle}
        </Button>
      )}
    </Flex>
  );
};

export default AlertNoDataFound;
