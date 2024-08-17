import { Aside, AsideTop, Wrap } from "./styled";

import { Box, Heading, HStack, Icon, Table, TableContainer, Tbody, Td, Text, Thead, Tr, useColorModeValue, VStack } from "@chakra-ui/react";
import { ISidebar } from "../../../../../../models/sidebar.model";
import useReserva from "../../../../../../hooks/useReservas";
import { useParams } from "react-router-dom";
import { FaEnvelope, FaFileAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { cpfMask } from "../../../../../../utils";

const SideBar = ({ status }: ISidebar) => {
  const { findReserva } = useReserva()
  const { id: _id } = useParams();
  const { data: dataReserva, isLoading: isLoadingReserva } = findReserva(_id || '');
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <TableContainer marginBottom="10px">
          {!isLoadingReserva && dataReserva.Pessoa.map((item, index) =>
            <Box bg={bg} p={4} border="1px solid" margin="5px" rounded="md">
              <Heading as="h3" size="md">{`Dados do cliente (${index + 1})`}</Heading>
              <br />
              <VStack spacing={4} align="flex-start">
                <HStack key={item.id} spacing={2} align="center">
                  <Icon as={FaUser} />
                  <Text>Nome:</Text>
                  <Text>{item.nome}</Text>
                </HStack>
                <HStack key={item.id} spacing={2} align="center">
                  <Icon as={FaFileAlt} />
                  <Text>Documento:</Text>
                  <Text>{cpfMask(item.cpf)}</Text>
                </HStack>
                <HStack key={item.id} spacing={2} align="center">
                  <Icon as={FaEnvelope} />
                  <Text>E-Mail:</Text>
                  <Text>{item.email}</Text>
                </HStack>
                <HStack key={item.id} spacing={2} align="center">
                  <Icon as={FaPhoneAlt} />
                  <Text>Telefone:</Text>
                  <Text>{item.telefone}</Text>
                </HStack>
              </VStack>
            </Box>
          )}
        </TableContainer>
      </Aside>
    </>
  );
};

export default SideBar;
