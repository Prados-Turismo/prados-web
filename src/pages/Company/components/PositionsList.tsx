import { AccordionPanel, Box, Heading, List, Stack } from "@chakra-ui/react";
import Loading from "../../../components/Loading";
import useSector from "../../../hooks/useSector";

import PositionItem from "./PositionItem";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

interface IPositionList {
  sectorId: string;
}

const PositionsList = ({ sectorId }: IPositionList) => {
  const { getOccupation } = useSector();
  const { data, isLoading } = getOccupation(sectorId);

  return (
    <AccordionPanel background="#F9F9F9">
      {isLoading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <Stack
          direction="column"
          spacing="4"
          margin="20px auto 40px"
          maxW="700px"
        >
          <Heading size="xs">Subcategoria</Heading>
          <List>
            {data.length > 0 &&
              data
                ?.filter((sector) => sector?.nameFormatted !== "NAO INFORMADO")
                .map((occupation) => {
                  return (
                    <PositionItem key={occupation?.id} position={occupation} />
                  );
                })}

            {data?.filter((sector) => sector?.nameFormatted !== "NAO INFORMADO")
              ?.length === 0 && (
              <AlertNoDataFound title="Nenhuma subcategoria cadastrada" />
            )}
          </List>
        </Stack>
      )}
    </AccordionPanel>
  );
};

export default PositionsList;
