import { useState } from "react";
import StepsHeader from "./components/StepsHeader";
import RepresentativesAndDocuments from "./pages/RepresentativesAndDocuments";
import { Box } from "@chakra-ui/layout";
import InstrumentOfRepresentation from "./pages/InstrumentOfRepresentation";

const CompleteRegistrationContent = ({
  stepDefault,
}: {
  stepDefault: number;
}) => {
  const [step, setStep] = useState(stepDefault);

  return (
    <Box maxW="1191px" margin="0 auto" w="100%">
      <StepsHeader step={step} />
      {step === 1 && <RepresentativesAndDocuments setStep={setStep} />}
      {step === 2 && <InstrumentOfRepresentation setStep={setStep} />}
    </Box>
  );
};

export default CompleteRegistrationContent;
