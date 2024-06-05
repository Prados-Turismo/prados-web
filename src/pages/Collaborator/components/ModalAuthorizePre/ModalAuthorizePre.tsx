import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import ReactSelect from "react-select";
import SimpleModal from "../../../../components/SimpleModal";
import { useGlobal } from "../../../../contexts/UserContext";
import useCollaborator from "../../../../hooks/useCollaborator";
import useSector from "../../../../hooks/useSector";
import { ISelect } from "../../../../models/generics.model";

import ModalOccupation from "../../../../components/ModalOccupation";
import ModalSector from "../../../../components/ModalSector";
import { BENEFICIARY_EMPLOYMENT_RELATIONSHIP } from "../../../../utils/enumFormat";

interface IModalAuthorizePre {
  beneficiaryPreId: string;
  showModal: boolean;
  setShowModal: (e: boolean) => void;
}

const ModalAuthorizePre = ({
  beneficiaryPreId,
  showModal,
  setShowModal,
}: IModalAuthorizePre) => {
  const { company } = useGlobal();
  const { activedPedingCollaborator } = useCollaborator();
  const { isLoading, mutate } = activedPedingCollaborator(setShowModal);

  const [modalState, setModalState] = useState({
    sector: false,
    occupation: false,
  });
  const [sector, setSector] = useState<ISelect | null>(null);
  const [occupation, setOccupation] = useState<ISelect | null>(null);
  const [relationshipType, setRelationshipType] = useState<ISelect | null>(
    null,
  );
  const [admissionDate, setAdmissionDate] = useState<string>("");

  const { getSector, getOccupation } = useSector();

  const { data: dataSectors, isLoading: loadingSectors } = getSector(
    company!.externalCompanyId,
  );

  const { data: positions, isLoading: isLoadingPositions } = getOccupation(
    sector?.value?.toString() || "",
  );

  return (
    <>
      <SimpleModal
        isOpen={showModal}
        handleModal={setShowModal}
        title="Autorizar pré-cadastro"
        size="2xl"
        isLoading={isLoading}
        footer={
          <Flex gap="15px" justifyContent="space-between" w="100%">
            <Button
              border="none"
              background="#F5F5F5"
              borderRadius="4px"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
            <Button
              borderRadius="4px"
              isLoading={isLoading}
              isDisabled={
                !sector ||
                !occupation ||
                !relationshipType ||
                !admissionDate ||
                new Date(admissionDate).getFullYear() < 1000 ||
                new Date(admissionDate)?.getFullYear()?.toString().length !== 4
              }
              onClick={() => {
                mutate({
                  beneficiaryPreId,
                  sectorId: sector?.value?.toString() || "",
                  positionId: occupation?.value?.toString() || "",
                  employmentRelationshipType:
                    relationshipType?.value?.toString() || "",
                  admissionDate: admissionDate,
                });
              }}
            >
              Confirmar
            </Button>
          </Flex>
        }
      >
        <Flex flexDir="column" padding="25px" gap="20px" w="100%">
          <Text fontSize="15px" color="#E53E3E" textAlign="left">
            (*) indica os campos obrigatórios
          </Text>
          <FormControl
            isRequired
            display="flex"
            w="100%"
            alignItems="flex-end"
            gap="15px"
          >
            <Flex flexDir="column" w="100%">
              <FormLabel htmlFor="sector">Categoria</FormLabel>

              <ReactSelect
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecione uma categoria"
                isLoading={loadingSectors}
                onChange={(option) => {
                  setSector(option);
                  setOccupation(null);
                }}
                noOptionsMessage={() => "Nenhuma categoria encontrada"}
                options={dataSectors?.map((sector) => ({
                  label: sector?.name,
                  value: sector?.id,
                }))}
                value={sector}
                required
              />
            </Flex>

            <Button
              id="add_sector"
              onClick={() => {
                setModalState({
                  ...modalState,
                  sector: true,
                });
              }}
            >
              <IoIosAdd size={20} />
            </Button>
          </FormControl>

          <FormControl
            isRequired
            display="flex"
            w="100%"
            alignItems="flex-end"
            gap="15px"
          >
            <Flex flexDir="column" w="100%">
              <FormLabel htmlFor="occupation">Subcategoria</FormLabel>

              <ReactSelect
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecione uma Subcategoria"
                isLoading={isLoadingPositions}
                onChange={(option) => {
                  setOccupation(option);
                }}
                noOptionsMessage={() => "Selecione uma categoria"}
                options={positions.map((position) => ({
                  label: position?.name,
                  value: position?.id,
                }))}
                value={occupation}
                required
              />
            </Flex>

            {sector?.value?.toString() && (
              <Button
                id="add_occupation"
                onClick={() => {
                  setModalState({
                    ...modalState,
                    occupation: true,
                  });
                }}
              >
                <IoIosAdd size={20} />
              </Button>
            )}
          </FormControl>

          <FormControl isRequired display="flex" flexDir="column" w="100%">
            <FormLabel htmlFor="admissionType">Tipo de Vínculo</FormLabel>

            <ReactSelect
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecione um tipo de vínculo"
              onChange={(option) => {
                setRelationshipType(option);
              }}
              value={relationshipType}
              options={Object.keys(BENEFICIARY_EMPLOYMENT_RELATIONSHIP).map(
                (key) => ({
                  value: key,
                  label: BENEFICIARY_EMPLOYMENT_RELATIONSHIP[key],
                }),
              )}
            />
          </FormControl>

          <FormControl isRequired display="flex" flexDir="column" w="100%">
            <FormLabel htmlFor="admissionDate">Data de admissão</FormLabel>

            <Input
              placeholder="Digite a data de admissão"
              type="date"
              onInput={(event: FormEvent<HTMLInputElement>) => {
                event.currentTarget.value = event.currentTarget.value || "";
                setAdmissionDate(event.currentTarget.value);
              }}
            />
          </FormControl>
        </Flex>
      </SimpleModal>

      <ModalSector
        handleOpen={(arg) => {
          setModalState({
            ...modalState,
            sector: arg,
          });
        }}
        isOpen={modalState.sector}
      />

      {sector?.value?.toString() && (
        <ModalOccupation
          companyId={company?.externalCompanyId || ""}
          sectorId={sector?.value?.toString() || ""}
          handleOpen={(arg) => {
            setModalState({
              ...modalState,
              occupation: arg,
            });
          }}
          isOpen={modalState.occupation}
        />
      )}
    </>
  );
};

export default ModalAuthorizePre;
