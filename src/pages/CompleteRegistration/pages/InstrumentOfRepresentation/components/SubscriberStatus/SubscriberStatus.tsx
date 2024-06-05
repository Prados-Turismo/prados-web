import { Box, Flex, Text } from "@chakra-ui/react";
import { ISubscriberStatus } from "./types";
import { cpfMask } from "../../../../../../utils";

const SubscriberStatus = ({ data }: ISubscriberStatus) => {
  return (
    <Flex
      flexDir="column"
      gap="16px"
      w="100%"
      flex="1"
      minW="450px"
      maxW="583.5px"
    >
      <Text fontWeight={600}>Assinatura</Text>

      <Flex
        padding="16px 24px"
        border="1px solid #E5E5E5"
        borderRadius="4px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir="column" gap="6px">
          <Text>Nome: {data?.name}</Text>
          <Text>E-mail: {data?.email}</Text>
          <Text>CPF: {cpfMask(data?.cpf)}</Text>
        </Flex>
        <Flex gap="16px" alignItems="center">
          <Box
            w="8px"
            h="8px"
            bg={data?.signed ? "#38A169" : "#FFAA3C"}
            borderRadius="100%"
          ></Box>
          <Text>{data?.signed ? "Assinado" : "Aguardando assinatura"}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SubscriberStatus;
