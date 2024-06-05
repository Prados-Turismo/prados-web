import { Flex, Text } from "@chakra-ui/layout";
import { IStepsHeader } from "./types";
import StepContent from "./components/StepContent";
import { useMediaQuery } from "@chakra-ui/media-query";

const steps = [
  { title: "Representantes e documentos" },
  { title: "Instrumento de representação" },
];

const StepsHeader = ({ step }: IStepsHeader) => {
  const [isLargerThan700] = useMediaQuery("(min-width: 703px)");
  return (
    <>
      <Text
        color="#333333"
        fontSize="18px"
        fontFamily="Poppins"
        fontWeight="400"
        marginBottom="44px"
        textAlign="center"
      >
        Complete as etapas abaixo com as informações cadastrais da empresa.
      </Text>

      <Flex
        w="100%"
        alignItems="center"
        justifyContent={isLargerThan700 ? "center" : "flex-start"}
        gap="24px"
        display="inline-flex"
        flexWrap="wrap"
      >
        {steps.map((item, index) => (
          <StepContent
            key={index}
            step={index + 1}
            title={item?.title}
            active={index + 1 === step || step === 2}
          />
        ))}
      </Flex>
    </>
  );
};

export default StepsHeader;
