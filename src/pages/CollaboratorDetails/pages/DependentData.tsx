/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { Box, Button, Flex } from "@chakra-ui/react";
import useCollaborator from "../../../hooks/useCollaborator";
import Loading from "../../../components/Loading";
import { DependentDataForm } from "../components/DependentDataForm";
import { IoIosAdd } from "react-icons/io";

// Styled
import { Group, Field } from "./styled";
import { IDataDependents } from "../../../models/collaborator.model";
import PersonDocuments from "../../../components/PersonDocuments";
import { useGlobal } from "../../../contexts/UserContext";
import { capitalize } from "../../../utils/capitalize";
import SimpleModal from "../../../components/SimpleModal";
import RegisterDependent from "../../../components/ProductAdhesion/components/RegisterDependent";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

interface ISelectDependentOption {
  value: string;
  label: string;
  dependentData: IDataDependents;
}

const DependentData = () => {
  const { isBroker } = useGlobal();
  const [modalRegisterDependent, setModalRegisterDependent] = useState(false);
  const { id } = useParams();
  const beneficiaryId = id || "";
  const [dependentSelected, setDependentSelected] =
    useState<ISelectDependentOption | null>(null);
  const { getDependents } = useCollaborator();
  const { data, isLoading } = getDependents({
    beneficiaryId,
  });

  const handleChangeSelectedDependent = (
    selectedOption: ISelectDependentOption,
  ) => {
    setDependentSelected(selectedOption);
  };

  return (
    <>
      {isLoading && (
        <Box marginTop="40px">
          <Loading />
        </Box>
      )}

      {!isLoading && (
        <>
          {data.length > 0 && (
            <>
              <Group padding={5}>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  padding="0 25px 0 0"
                  flexWrap="wrap"
                >
                  <Field
                    maxWidth="350px"
                    minW="300px"
                    flexDirection="column"
                    marginBottom={35}
                    gap="5px"
                  >
                    <label>Dependentes:</label>
                    <ReactSelect
                      className="select-fields"
                      classNamePrefix="select"
                      isLoading={isLoading}
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      placeholder="Selecione o dependente"
                      options={data.map((item) => ({
                        label: capitalize(item?.person?.name),
                        value: item?.id,
                        dependentData: item,
                      }))}
                      onChange={(selectedOption: any) =>
                        handleChangeSelectedDependent(selectedOption)
                      }
                      id="dependents"
                      name="dependents"
                    />
                  </Field>
                  <Button
                    leftIcon={<IoIosAdd />}
                    onClick={() => {
                      setModalRegisterDependent(true);
                    }}
                  >
                    Cadastrar dependente
                  </Button>
                </Flex>

                {dependentSelected && (
                  <DependentDataForm
                    dependent={dependentSelected?.dependentData}
                  />
                )}
              </Group>

              {dependentSelected && !isBroker && (
                <PersonDocuments
                  personId={dependentSelected?.dependentData?.person?.id}
                  authorization={
                    dependentSelected?.dependentData?.authorizesDownloadDocument
                  }
                />
              )}
            </>
          )}

          {data?.length === 0 && (
            <>
              <Flex
                w="100%"
                justifyContent="flex-end"
                padding="25px"
                flexWrap="wrap"
              >
                <Button
                  leftIcon={<IoIosAdd />}
                  onClick={() => {
                    setModalRegisterDependent(true);
                  }}
                >
                  Cadastrar dependente
                </Button>
              </Flex>
              <AlertNoDataFound title="Não há dependentes" />
            </>
          )}
        </>
      )}

      {modalRegisterDependent && (
        <SimpleModal
          title="Cadastrar dependente"
          size="xl"
          isOpen={modalRegisterDependent}
          handleModal={setModalRegisterDependent}
        >
          <Box w="100%" padding="30px">
            <RegisterDependent
              holderId={beneficiaryId}
              maxHeight="max-content"
              handleCloseModal={() => setModalRegisterDependent(false)}
            />
          </Box>
        </SimpleModal>
      )}
    </>
  );
};

export default DependentData;
