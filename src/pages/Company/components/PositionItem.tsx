import { Box, Button, Center, Flex, ListItem } from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import ButtonIcon from "../../../components/ButtonIcon";
import ModalOccupation from "../../../components/ModalOccupation";
import { useGlobal } from "../../../contexts/UserContext";
import useSector from "../../../hooks/useSector";
import { IOccupation } from "../../../models/sector.model";
import { capitalize } from "../../../utils/capitalize";

interface IPositionItem {
  position: IOccupation;
}

const PositionItem = ({ position }: IPositionItem) => {
  const { company } = useGlobal();
  const { deleteOccupation } = useSector();
  const { mutate: mutateToDeleteOccupation } = deleteOccupation();

  const [removeOccupationModal, setRemoveOccupationModal] = useState(false);
  const [updateOccupationModal, setUpdateOccupationMOdal] = useState(false);

  return (
    <>
      <ListItem key={position.id} borderY="1px" borderColor="gray.200" py="1">
        <Flex alignItems="center">
          <Box as="span" flex="1">
            {capitalize(position?.name)}
          </Box>
          <Flex direction="row" justify="center">
            <Center>
              <ButtonIcon tooltip="Editar Subcategoria">
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  colorScheme="gray"
                  onClick={() => setUpdateOccupationMOdal(true)}
                  size="sm"
                >
                  <FiEdit2 />
                </Button>
              </ButtonIcon>
            </Center>
            <Center>
              <ButtonIcon tooltip="Remover Subcategoria">
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  colorScheme="red"
                  onClick={() => setRemoveOccupationModal(true)}
                >
                  <FiTrash />
                </Button>
              </ButtonIcon>
            </Center>
          </Flex>
        </Flex>
      </ListItem>

      {removeOccupationModal && (
        <AlertModal
          title="Remover Subcategoria"
          question="Deseja realmente remover esta Subcategoria?"
          request={() =>
            mutateToDeleteOccupation({
              positionId: position?.id,
              sectorId: position?.sectorId,
            })
          }
          showModal={removeOccupationModal}
          setShowModal={setRemoveOccupationModal}
          size="md"
        ></AlertModal>
      )}

      {updateOccupationModal && (
        <ModalOccupation
          isOpen={updateOccupationModal}
          companyId={company!.externalCompanyId}
          sectorId={position?.sectorId}
          handleOpen={setUpdateOccupationMOdal}
          showSectorsSelect={true}
          occupation={position}
          action={"edit"}
        />
      )}
    </>
  );
};

export default PositionItem;
