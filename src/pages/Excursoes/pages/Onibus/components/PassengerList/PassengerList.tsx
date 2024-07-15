import { Box, Text, Button, SimpleGrid } from '@chakra-ui/react';

const PassengerList = ({ passengers, seatAssignments, onSelectPassenger, selectedPassenger }) => {
  return (
    <SimpleGrid columns={5} spacing={4} mb={4}>
      {passengers.map((passenger, index) => (
        <Button
          key={index}
          width="100%"
          justifyContent="space-between"
          onClick={() => onSelectPassenger(passenger)}
          backgroundColor={selectedPassenger === passenger ? 'orange.600' : seatAssignments[passenger] ? 'blue.500' : 'gray.300'}
          color={selectedPassenger === passenger || seatAssignments[passenger] ? 'white' : 'black'}
          borderRadius={8}
          _hover={{ backgroundColor: 'blue.500' }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Text>{passenger}</Text>
            {seatAssignments[passenger] && (
              <Box
                ml={2}
                px={2}
                py={1}
                backgroundColor="gray.700"
                color="white"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Nº {seatAssignments[passenger]}
              </Box>
            )}
          </Box>
        </Button>
      ))}
    </SimpleGrid>
  );
};

export default PassengerList
