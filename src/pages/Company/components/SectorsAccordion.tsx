import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Button,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";

import { FiEdit2, FiTrash } from "react-icons/fi";
import ButtonIcon from "../../../components/ButtonIcon";
import { capitalize } from "../../../utils/capitalize";

import { useState } from "react";
import { ISector } from "../../../models/sector.model";
import PositionsList from "./PositionsList";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

interface Props {
  sectors: ISector[];
  onEditSector: (sector: ISector) => void;
  onRemoveSector: (sector: ISector) => void;
}

export default function SectorsAccordion({
  onEditSector,
  onRemoveSector,
  sectors = [],
}: Props) {
  const [index, setIndex] = useState(-1);

  return (
    <Accordion index={index} allowToggle onChange={(e: number) => setIndex(e)}>
      {sectors?.length > 0 &&
        sectors.map((sector, i) => {
          const onEditHandler = () => {
            onEditSector(sector);
          };

          const onRemoveHandler = () => {
            onRemoveSector(sector);
          };

          return (
            <AccordionItem key={sector.id}>
              <Flex h="12">
                <AccordionButton h="full" pt="0" pb="0">
                  <Box as="span" flex="1" textAlign="left">
                    {capitalize(sector?.name)}
                  </Box>
                  <Text marginRight="5px">Subcategorias</Text>
                  <AccordionIcon />
                </AccordionButton>
                <Flex direction="row" justify="center" marginLeft="20px">
                  <Center>
                    <ButtonIcon tooltip="Editar Categoria">
                      <Button
                        variant="unstyled"
                        display="flex"
                        alignItems="center"
                        colorScheme="gray"
                        onClick={onEditHandler}
                        size="sm"
                      >
                        <FiEdit2 />
                      </Button>
                    </ButtonIcon>
                  </Center>
                  <Center>
                    <ButtonIcon tooltip="Remover Categoria">
                      <Button
                        variant="unstyled"
                        display="flex"
                        alignItems="center"
                        colorScheme="red"
                        onClick={onRemoveHandler}
                      >
                        <FiTrash />
                      </Button>
                    </ButtonIcon>
                  </Center>
                </Flex>
              </Flex>

              {i === index && <PositionsList sectorId={sector?.id} />}
            </AccordionItem>
          );
        })}

      {sectors.length === 0 && (
        <AlertNoDataFound title="Nenhuma categoria cadastrada" />
      )}
    </Accordion>
  );
}
