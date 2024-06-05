import { Box, Flex, Text } from "@chakra-ui/layout";
import { IStepContent } from "./types";
import { useMediaQuery } from "@chakra-ui/media-query";

const StepContent = ({ step, title, active }: IStepContent) => {
  const [isLargerThan700] = useMediaQuery("(min-width: 703px)");
  return (
    <>
      <Flex position="relative" w="264px" h={`32px`}>
        <Box
          position="absolute"
          bg={active ? "brand.500" : "#AEAEAE"}
          borderRadius="9999px"
          w={`32px`}
          h={`32px`}
          top="0"
          left="0"
        >
          <Text
            position="absolute"
            color="white"
            fontSize="16px"
            fontFamily="Poppins"
            fontWeight={500}
            top="4px"
            left={step === 1 ? "14px" : "12px"}
          >
            {step}
          </Text>
        </Box>
        <Text
          position="absolute"
          color="#333333"
          fontSize="14px"
          fontFamily="Poppins"
          fontWeight={400}
          top="4px"
          left="48px"
        >
          {title}
        </Text>
      </Flex>
      {step === 1 && isLargerThan700 && (
        <Box bg="brand.500" w="50px" h="1px" top="16px" left="288px" />
      )}
    </>
  );
};

export default StepContent;
