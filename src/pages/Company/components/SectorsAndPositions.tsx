import { Box, Button, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

import FieldSearch from "../../../components/FieldSearch";
import ModalOccupation from "../../../components/ModalOccupation";
import ModalSector from "../../../components/ModalSector";
import SectorsAccordion from "./SectorsAccordion";

import { useGlobal } from "../../../contexts/UserContext";

import AlertModal from "../../../components/AlertModal";
import Loading from "../../../components/Loading";
import useSector from "../../../hooks/useSector";
import { IOccupation, ISector } from "../../../models/sector.model";

export default function SectorsAndPositions() {
  const { company } = useGlobal();
  const { getSector, deleteSector } = useSector();
  const { mutate: mutateToDeleteASector } = deleteSector();

  const [sectorModalIsOpen, setSectorModalIsOpen] = useState(false);
  const [sectorModalSectorName, setSectorModalSectorName] = useState("");
  const [sectorModalSectorId, setSectorModalSectorId] = useState("");
  const [sectorModalAction, setSectorModalAction] = useState<"create" | "edit">(
    "create",
  );

  const [occupationModalAction, setOccupationModalAction] = useState<
    "create" | "edit"
  >("create");
  const [occupationModalIsOpen, setOccupationModalIsOpen] = useState(false);
  const [occupationModalShowSelect, setOccupationModalShowSelect] =
    useState(false);
  const [occupationModalOccupation, setOccupationModalOccupation] =
    useState<IOccupation | null>(null);

  const [sectorBeingEdited, setSectorBeingEdited] = useState<ISector | null>(
    null,
  );

  const [confirmRemoveSectorModalIsOpen, setConfirmRemoveSectorModalIsOpen] =
    useState(false);

  const { data, isLoading } = getSector(company!.externalCompanyId);

  const [sectors, setSectors] = useState<ISector[]>([]);
  const [search, setSearch] = useState("");

  const onAddSector = () => {
    setSectorModalIsOpen(true);

    setSectorModalAction("create");
    setSectorModalSectorName("");
  };

  const onEditSector = (sector: ISector) => {
    setSectorModalIsOpen(true);
    setSectorModalSectorId(sector.id);
    setSectorModalSectorName(sector.name);

    setSectorModalAction("edit");
  };

  const onRemoveSector = async (sector: ISector) => {
    setSectorBeingEdited(sector);
    setConfirmRemoveSectorModalIsOpen(true);
  };

  const onConfirmRemoveSector = () => {
    mutateToDeleteASector(sectorBeingEdited?.id || "");
    setConfirmRemoveSectorModalIsOpen(false);
    setSectorBeingEdited(null);
  };

  const onAddOccupation = () => {
    setOccupationModalAction("create");
    setOccupationModalIsOpen(true);
    setOccupationModalShowSelect(true);
    setOccupationModalOccupation(null);
  };

  const onCloseSectorModal = () => {
    setSectorModalIsOpen(false);
  };

  const onClosePositionModal = () => {
    setOccupationModalIsOpen(false);
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search) {
      const newData = data.filter(
        (el) =>
          el.name
            ?.toUpperCase()
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              search
                ?.toUpperCase()
                ?.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            ),
      );

      setSectors(newData);
    } else {
      setSectors(data);
    }
  }, [data, search]);

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Stack direction="column" spacing={4}>
          <Stack spacing={2} direction="row">
            <Button onClick={onAddSector} rounded="md" leftIcon={<IoIosAdd />}>
              Cadastrar Categoria
            </Button>
            <Button
              onClick={onAddOccupation}
              rounded="md"
              leftIcon={<IoIosAdd />}
            >
              Cadastrar Subcategoria
            </Button>
          </Stack>
          <Box>
            <Box maxW="2xl">
              <FieldSearch
                placeholder="Buscar Categoria"
                handleSearch={onSearch}
                dinamic
              />
            </Box>
          </Box>
        </Stack>
        {isLoading ? (
          <Box>
            <Loading />
          </Box>
        ) : (
          <SectorsAccordion
            sectors={sectors?.filter(
              (sector) => sector?.nameFormatted !== "NAO INFORMADO",
            )}
            onEditSector={onEditSector}
            onRemoveSector={onRemoveSector}
          />
        )}
      </Stack>

      <ModalSector
        sectorName={sectorModalSectorName}
        sectorId={sectorModalSectorId}
        handleOpen={onCloseSectorModal}
        isOpen={sectorModalIsOpen}
        action={sectorModalAction}
      />
      <ModalOccupation
        isOpen={occupationModalIsOpen}
        companyId={company!.externalCompanyId}
        sectorId={sectorModalSectorId}
        handleOpen={onClosePositionModal}
        showSectorsSelect={occupationModalShowSelect}
        occupation={occupationModalOccupation}
        action={occupationModalAction}
      />

      <AlertModal
        title="Remover categoria"
        question="Deseja realmente remover esta categoria?"
        request={onConfirmRemoveSector}
        showModal={confirmRemoveSectorModalIsOpen}
        setShowModal={setConfirmRemoveSectorModalIsOpen}
        size="md"
      ></AlertModal>
    </>
  );
}
