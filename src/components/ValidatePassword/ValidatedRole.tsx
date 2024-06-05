import { Box, Flex, Text } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

const ValidatedRole = ({
  isValidated,
  text,
}: {
  isValidated: boolean;
  text: string;
}) => {
  return (
    <Flex gap="15px" alignItems="center">
      <Box
        w="8px"
        h="8px"
        borderRadius="100%"
        backgroundColor={isValidated ? "#23D56A" : "#D9D9D9"}
      />
      <Text fontSize={pixelToRem(14)} color="#909090">
        {text}
      </Text>
    </Flex>
  );
};

export default ValidatedRole;
