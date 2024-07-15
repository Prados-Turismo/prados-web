import { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import SeatMap from '../components/SeatMap';
import PassengerList from '../components/PassengerList';
import { Content, SectionTop } from './styled';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';

function OnibusList() {
  const navigate = useNavigate();
  const isLoading = false;

  const [passengers] = useState(Array.from({ length: 50 }, (_, i) => `Passageiro ${i + 1}`));
  const [selectedPassenger, setSelectedPassenger] = useState('');
  const [seatAssignments, setSeatAssignments] = useState({});

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
              Excursão Guaramiranga
            </Text>
          </Flex>
        </SectionTop>

        <SectionTop className="contentTop" gap="30px" justifyContent="end">
          <Button
            isLoading={isLoading}
            onClick={() => {}}
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
