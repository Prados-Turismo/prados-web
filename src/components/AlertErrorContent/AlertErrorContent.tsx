import { Box, Flex } from "@chakra-ui/react";
import { IAlertErrorContent } from "./types";
import AlertInfoIcon from "../AlertInfoIcon/AlertInfoIcon";

const AlertErrorContent = ({ content }: IAlertErrorContent) => {
  return (
    <Flex padding="15px 32px" gap="32px" bg="#E920430A" alignItems="center">
      <Box>
        <AlertInfoIcon />
      </Box>
      <Flex flexDir="column" gap="5px">
        {content}
      </Flex>
    </Flex>
  );
};

export default AlertErrorContent;
