import { Flex, Text } from "@chakra-ui/react";
import AlertIcon from "../AlertIcon";
import { IAlertContent } from "./types";

const AlertContent = ({ title, description }: IAlertContent) => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap="24px"
    >
      <AlertIcon />
      {title && (
        <Text maxW="310px" fontSize="20px" fontWeight={600}>
          {title}
        </Text>
      )}
      {description && (
        <Text maxW="330px" fontSize="17px">
          {description}
        </Text>
      )}
    </Flex>
  );
};
export default AlertContent;
