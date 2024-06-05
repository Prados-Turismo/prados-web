import { Box, Text } from "@chakra-ui/layout";
import { ITitleAndDescription } from "./types";

const TitleAndDescription = ({
  title,
  description,
  maxW = "712px",
  subtitle,
}: ITitleAndDescription) => {
  return (
    <Box margin="32px 0">
      <Text as="h1" size="1rem" fontWeight={600} marginBottom="8px">
        {title}
      </Text>
      <Text maxW={maxW} size="0.875rem" color="#707070">
        {subtitle && <b>{subtitle}</b>}
        {description}
      </Text>
    </Box>
  );
};

export default TitleAndDescription;
