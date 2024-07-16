import { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import SeatMap from '../components/SeatMap';
import PassengerList from '../components/PassengerList';
import { Content, SectionTop } from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import useExcursaoPassageiro from '../../../../../hooks/useExcursaoPassageiros';
import useExcursoes from '../../../../../hooks/useExcursao';
import { z } from "zod"
import { fieldRequired } from '../../../../../utils/messagesError';

function OnibusList() {
  const navigate = useNavigate();
  const { id: _id } = useParams();
  const { getExcursaoPassageiros } = useExcursaoPassageiro();
  const { getExcursao } = useExcursoes();
  const { data, isLoading } = getExcursaoPassageiros(_id || '');
  const passengers = data.map((d) => { return { id: d.Pessoa.id, nome: d.Pessoa.nome } })
  const [selectedPassenger, setSelectedPassenger] = useState('');
  const [seatAssignments, setSeatAssignments] = useState({});
  const { data: dataExcursao, isLoading: loadingExcursao } = getExcursao(_id || '');

  const handleSubmitRegisterSchema = z.object({
    nome: z
      .string()
      .min(1, {
        message: fieldRequired("nome"),
      }),
    codigoPacote: z
      .string()
      .min(1, {
        message: fieldRequired("pacote"),
      }),
    dataInicio: z
      .string()
      .min(1, {
        message: fieldRequired("data de início"),
      }),
    dataFim: z
      .string()
      .min(1, {
        message: fieldRequired("data de fim"),
      }),
    vagas: z
      .number()
      .min(1, {
        message: fieldRequired("vagas"),
      }),
    observacoes: z
      .string()
      .optional()
  });

  const handleSelectPassenger = (passenger) => {
    setSelectedPassenger(passenger);
  };

  const handleSelectSeat = (seatNumber) => {
    if (selectedPassenger) {
      setSeatAssignments((prevAssignments) => {
        const newAssignments = { ...prevAssignments };

        // Encontre o assento atual do passageiro selecionado
        const currentSeat = Object.keys(newAssignments).find(
          (seat) => newAssignments[seat] === selectedPassenger
        );

        if (currentSeat) {
          delete newAssignments[currentSeat];
        }

        if (newAssignments[seatNumber] === selectedPassenger) {
          delete newAssignments[seatNumber];
        } else {
          newAssignments[seatNumber] = selectedPassenger;
        }

        return newAssignments;
      });
    }
  };

  const selectedSeats = Object.keys(seatAssignments).map(Number);
  const highlightedSeat = Number(Object.keys(seatAssignments).find(
    (seat) => seatAssignments[seat] === selectedPassenger
  ));

  // Reverter a estrutura do objeto para obter o assento de cada passageiro
  const passengerSeatAssignments = {};
  Object.keys(seatAssignments).forEach((seat) => {
    passengerSeatAssignments[seatAssignments[seat]] = seat;
  });

  return (
    <>
      <Flex>
        <SectionTop className="contentTop" gap="30px">
          <Button
            variant="outline"
            width="74px"
            onClick={() => navigate("/excursoes")}
          >
            Voltar
          </Button>

          <Flex gap="10px" flexWrap="wrap">
            <Text fontSize="2xl" fontWeight="bold">
              Ônibus:
            </Text>
            <Text fontSize="2xl">
              {dataExcursao.nome}
            </Text>
          </Flex>
        </SectionTop>

        <SectionTop className="contentTop" gap="30px" justifyContent="end">
          <Button
            isLoading={isLoading}
            onClick={() => { }}
            width={100}
          >
            Salvar
          </Button>
        </SectionTop>
      </Flex>

      <Content className="contentMain">
        <Box textAlign="center" maxWidth="1200px" margin="auto" p={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Assentos
          </Text>
          <Box display="flex" justifyContent="center" mb={4}>
            <SeatMap
              selectedSeats={selectedSeats}
              highlightedSeat={highlightedSeat}
              onSelectSeat={handleSelectSeat}
            />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Passageiros
          </Text>
          <PassengerList
            passengers={passengers}
            seatAssignments={passengerSeatAssignments}
            onSelectPassenger={handleSelectPassenger}
            selectedPassenger={selectedPassenger}
          />
        </Box>
      </Content>
    </>
  );
}

export default OnibusList;
