// import { Box, Grid } from '@chakra-ui/react';

// const Seat = ({ seatNumber, isSelected, isHighlighted, onSelect }) => {
//   return (
//     <Box
//       as="button"
//       width="40px"
//       height="40px"
//       backgroundColor={isHighlighted ? 'orange.500' : isSelected ? 'blue.500' : 'gray.200'}
//       color={isSelected || isHighlighted ? 'white' : 'black'}
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       borderRadius="md"
//       onClick={() => onSelect(seatNumber)}
//     >
//       {seatNumber}
//     </Box>
//   );
// };

// const SeatMap = ({ selectedSeats, highlightedSeat, onSelectSeat }) => {
//   const seats = Array.from({ length: 50 }, (_, i) => i + 1);

//   return (
//     <Grid templateColumns="repeat(25, 1fr)" gap={2} mb={4}>
//       {seats.map((seatNumber) => (
//         <Seat
//           key={seatNumber}
//           seatNumber={seatNumber}
//           isSelected={selectedSeats.includes(seatNumber)}
//           isHighlighted={seatNumber === highlightedSeat}
//           onSelect={onSelectSeat}
//         />
//       ))}
//     </Grid>
//   );
// };

// export default SeatMap;
