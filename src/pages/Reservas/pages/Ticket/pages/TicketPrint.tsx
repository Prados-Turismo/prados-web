import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  Button,
  Flex,
  Image,
  Badge,
  Divider,
  VStack,
  Spacer,
  Tfoot
} from '@chakra-ui/react';
import { LuAlarmClock } from "react-icons/lu";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";



// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ButtonIcon from "../../../../../components/ButtonIcon";
import useReservas from "../../../../../hooks/useReservas";
import { formattingDate } from "../../../../../utils/formattingDate";
import { FaCalendarAlt, FaShoppingCart, FaStore } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { currencyBRLFormat } from '../../../../../utils/currencyBRLFormat';
import QRCode from 'qrcode.react';
import Html from 'react-pdf-html';

const TicketPrint = () => {
  const { findReserva } = useReservas();
  const { id: _id } = useParams();
  const { data, isLoading } = findReserva(_id || '');
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Flex>
        <SectionTop className="contentTop" gap="30px">
          <Flex justifyContent="center">
            <Table>
              <Thead>
                <Tr>
                  <Th><Image src="/images/prados/logo_laranja.png" alt="Logo da empresa" /></Th>
                  <Th><Heading as="h5" size="sm">Reserva: 3443495</Heading></Th>
                  <Th><Badge colorScheme="green">Aprovado</Badge></Th>
                </Tr>
              </Thead>
            </Table>
          </Flex>
        </SectionTop>
      </Flex>

      {!isLoading && data.Pessoa.map(item =>
        <Box bg={bg} p={5} borderRadius="md">
          <TableContainer>
            <Table borderWidth={2} borderColor="black">
              <Thead background="gray.100">
                <Tr>
                  <Th>
                    <b>{data.Excursao.nome}</b>
                  </Th>
                  <Th></Th>
                  <Th>
                    <b>{formattingDate(data.Excursao.dataInicio)}</b>
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Nome</Td>
                  <Td>{item.nome}</Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Telefone</Td>
                  <Td>{item.telefone}</Td>
                  <Td>
                    <QRCode
                      value={`teste/${item.id}`}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Rg</Td>
                  <Td>{item.rg}</Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Órgão Emissor</Td>
                  <Td>{item.orgaoEmissor}</Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Local de Embarque</Td>
                  <Td>Parangaba</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
              <Tfoot background="gray.100">
                <Tr>
                  <Th>
                    Opcionais:
                  </Th>
                  <Th>Passeio de lancha</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default TicketPrint;
