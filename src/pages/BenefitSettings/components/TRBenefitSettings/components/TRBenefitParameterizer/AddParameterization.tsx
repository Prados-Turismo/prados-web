/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import SimpleModal from "../../../../../../components/SimpleModal";
import { useGlobal } from "../../../../../../contexts/UserContext";
import useBenefits from "../../../../../../hooks/useBenefits";
import useSector from "../../../../../../hooks/useSector";
import { useToastStandalone } from "../../../../../../hooks/useToastStandalone";
import { ISelect } from "../../../../../../models/generics.model";
import { apiRecord } from "../../../../../../services/api";
import { genericSort, numberFormat } from "../../../../../../utils";
import { IAddParameterization } from "./types";

import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ButtonBox,
  ContentModal,
} from "../../../../../../components/AlertModal/styled";
import NumericInput from "../../../../../../components/NumericInput";
import PriceTable from "../../../../../../components/PriceTable";
import TooltipSubstring from "../../../../../../components/TooltipSubstring/TooltipSubstring";
import { IDataCollaborator } from "../../../../../../models/collaborator.model";
import { capitalize } from "../../../../../../utils/capitalize";
import {
  BENEFICIARY_KINSHIP,
  BENEFICIARY_TYPE,
} from "../../../../../../utils/enumFormat";

interface IForm {
  beneficiaryId: null | string;
  beneficiaryName: null | string;
  percentageValue: null | string;
  value: number | null;
  sectorId: null | string;
  sectorName: null | string;
  positionId: null | string;
  positionName: null | string;
  relationship: null | string;
  relationshipType: null | string;
}

const formDefault = {
  beneficiaryId: null,
  beneficiaryName: null,
  percentageValue: null,
  value: null,
  sectorId: null,
  sectorName: null,
  positionId: null,
  positionName: null,
  relationship: null,
  relationshipType: null,
};

const AddParameterization = ({
  benefit,
  showAddModal,
  setShowAddModal,
}: IAddParameterization) => {
  const { company } = useGlobal();
  const { getSector, getOccupation } = useSector();
  const { handleEditParameterization } = useBenefits();
  const { isLoading, mutate } = handleEditParameterization({
    isEdit: false,
    setShowModal: setShowAddModal,
  });
  const [form, setForm] = useState<IForm>(formDefault);
  const [productLimitValue, setProductLimitValue] = useState(0);
  const [listSectorSelect, setListSectorSelect] = useState<ISelect[]>([]);
  const [listCollaboratorSelect, setListCollaboratorSelect] = useState<
    ISelect[]
  >([]);
  const [sectorSelect, setSectorSelec] = useState<ISelect | null>(null);
  const [occupationSelect, setOccupationSelec] = useState<ISelect | null>(null);
  const [collaboratorSelect, setCollaboratorSelect] = useState<ISelect | null>(
    null,
  );
  const [typeSelect, setTypeSelect] = useState<ISelect | null>(null);
  const [modeSelect, setModeSelect] = useState<ISelect | null>(null);
  const [kinshipSelect, setKinshipSelect] = useState<ISelect | null>(null);
  const [loadingCollab, setLoadingCollab] = useState<boolean>(false);
  const companyId = company!.externalCompanyId;
  const { data: dataSelect, isLoading: isLoadingSector } = getSector(companyId);
  const { data: positions, isLoading: isLoadingPositions } = getOccupation(
    sectorSelect?.value?.toString() || "",
  );
  const [step, setStep] = useState(1);

  const getCollaborators = (id_setor: string, id_cargo: string) => {
    setLoadingCollab(true);
    apiRecord
      .get(
        `/companies-associated/${companyId}/beneficiaries?size=1000&page=1&sectorId=${id_setor}&positionId=${id_cargo}`,
      )
      .then((res) => {
        const data = res?.data?.rows
          .sort((a: IDataCollaborator, b: IDataCollaborator) =>
            genericSort(a?.person, b?.person, {
              property: "name",
            }),
          )
          .map((item: IDataCollaborator) => ({
            label: capitalize(item?.person?.name),
            value: item?.id,
          }));
        setListCollaboratorSelect(data);
        setLoadingCollab(false);
      })
      .catch((error) => {
        setLoadingCollab(false);
        useToastStandalone({
          title: `Não foi possível listar os cadastros.`,
          description: error?.response?.data?.message,
          status: "error",
        });
      });
  };

  const handleChangeSelectedSector = (selectedOption: any) => {
    setForm((prev) => ({
      ...prev,
      sectorId: selectedOption?.value,
      sectorName: selectedOption?.label,
      positionId: selectedOption?.value === "todos" ? "todos" : null,
      positionName: "Todos",
      beneficiaryId: selectedOption?.value === "todos" ? "todos" : null,
      beneficiaryName: "Todos",
    }));

    setSectorSelec(selectedOption);
    if (selectedOption?.value === "todos") {
      setListCollaboratorSelect([{ value: "todos", label: "Todos" }]);
      setCollaboratorSelect({
        label: "Todos",
        value: "Todos",
      });
      setOccupationSelec({
        label: "Todos",
        value: "Todos",
      });
    } else {
      setOccupationSelec(null);
      setCollaboratorSelect(null);
      setListCollaboratorSelect([]);
    }
  };

  const handleChangeSelectedOccupation = (selectedOption: any) => {
    setOccupationSelec(selectedOption);
    setForm((prev) => ({
      ...prev,
      positionId: selectedOption?.value,
      positionName: selectedOption?.label,
      beneficiaryId: selectedOption?.value === "todos" ? "todos" : null,
      beneficiaryName: "Todos",
    }));

    if (selectedOption.value !== "todos") {
      setCollaboratorSelect(null);
      setListCollaboratorSelect([]);
      getCollaborators(form?.sectorId || "", selectedOption?.value);
    } else {
      setListCollaboratorSelect([{ value: "todos", label: "Todos" }]);
      setCollaboratorSelect({
        label: "Todos",
        value: "Todos",
      });
    }
  };

  const clean = () => {
    setSectorSelec(null);
    setOccupationSelec(null);
    setCollaboratorSelect(null);
    setTypeSelect(null);
    setModeSelect(null);
    setKinshipSelect(null);
    setListCollaboratorSelect([]);
    setProductLimitValue(0);
    setForm(formDefault);
  };

  useEffect(() => {
    if (dataSelect.length > 0) {
      const listSectorSelectData = dataSelect
        ?.filter((sector) => sector?.nameFormatted !== "NAO INFORMADO")
        .map((item) => ({
          label: item?.name,
          value: item?.id,
        }));

      setListSectorSelect(listSectorSelectData);
    }
  }, [dataSelect]);

  return (
    <>
      <SimpleModal
        isOpen={showAddModal}
        scrollBehavior={step === 1 ? "outside" : "inside"}
        handleModal={() => {
          clean();
          setShowAddModal(false);
        }}
        title="Adicionar novo parâmetro"
        size="4xl"
        minHeight="160px"
        isLoading={isLoading}
        footer={
          <ButtonBox>
            <Button
              isDisabled={isLoading}
              border="none"
              background="#F5F5F5"
              borderRadius="4px"
              variant="outline"
              onClick={() => {
                if (!isLoading) {
                  setShowAddModal(false);
                  clean();
                }
              }}
            >
              Cancelar
            </Button>
            <Flex gap="15px">
              {step === 2 && (
                <Button
                  isDisabled={isLoading}
                  borderRadius="4px"
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Voltar
                </Button>
              )}
              <Button
                borderRadius="4px"
                onClick={() => {
                  if (step === 1) {
                    setStep(2);
                  } else {
                    const typeValidation =
                      form?.sectorId === "todos" &&
                      form?.positionId === "todos" &&
                      (form?.beneficiaryId === "todos" ||
                        form.relationshipType === "dependent")
                        ? "general"
                        : form?.sectorId &&
                          form?.positionId === "todos" &&
                          (form?.beneficiaryId === "todos" ||
                            form.relationshipType === "dependent")
                        ? "sector"
                        : form?.sectorId &&
                          form?.positionId &&
                          (form?.beneficiaryId === "todos" ||
                            form.relationshipType === "dependent")
                        ? "position"
                        : "single";

                    if (
                      form.relationship &&
                      form.percentageValue &&
                      form.value &&
                      form.relationshipType
                    ) {
                      mutate({
                        beneficiaryId:
                          form?.beneficiaryId === "todos"
                            ? null
                            : form?.beneficiaryId,
                        positionId:
                          form?.positionId === "todos"
                            ? null
                            : form?.positionId,
                        sectorId:
                          form?.sectorId === "todos" ? null : form?.sectorId,
                        relationship: form?.relationship,
                        relationshipType: form?.relationshipType,
                        companyId: companyId,
                        productId: benefit?.productId,
                        companyContractId: benefit?.id,
                        percentageValue: form?.percentageValue,
                        value: form?.value,
                        type: typeValidation,
                      });
                    }
                  }
                }}
                isLoading={isLoading}
                isDisabled={
                  (form?.relationshipType === "holder" &&
                    !form?.beneficiaryId) ||
                  !form?.percentageValue ||
                  !form?.positionId ||
                  !form?.relationship ||
                  !form?.relationshipType ||
                  !form?.sectorId ||
                  form?.value === null
                }
                marginBottom="10px"
              >
                {step === 1 && "Cadastrar"}
                {step === 2 && "Confirmar"}
              </Button>
            </Flex>
          </ButtonBox>
        }
      >
        <ContentModal>
          {step === 1 && (
            <Flex flexDir="column" gap="20px" padding="20px">
              <Flex w="100%" gap="15px">
                <FormControl isRequired flex="1">
                  <FormLabel>Tipo</FormLabel>
                  <ReactSelect
                    className="select-fields"
                    classNamePrefix="select"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    placeholder="Selecionar"
                    value={typeSelect}
                    onChange={(e) => {
                      setTypeSelect(e);
                      setForm((prev: any) => ({
                        ...prev,
                        relationship: e?.value === "holder" ? "holder" : null,
                        relationshipType: e?.value || null,
                      }));
                      setKinshipSelect(null);
                      setProductLimitValue(
                        benefit?.precification[0]?.[
                          e?.value as "holder" | "dependent" | "aggregated"
                        ]?.[
                          benefit?.precification[0]?.[
                            e?.value as "holder" | "dependent" | "aggregated"
                          ]?.length - 1
                        ]?.finalValue,
                      );
                    }}
                    options={[
                      {
                        label: "Titular",
                        value: "holder",
                      },
                      {
                        label: "Dependente",
                        value: "dependent",
                      },
                    ]}
                  />
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel>Categorias</FormLabel>
                  <ReactSelect
                    isLoading={isLoadingSector}
                    isDisabled={!form?.relationshipType}
                    className="select-fields"
                    classNamePrefix="select"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    placeholder="Selecionar"
                    value={sectorSelect}
                    onChange={handleChangeSelectedSector}
                    noOptionsMessage={() => "Não há categoria cadastrada"}
                    options={[
                      {
                        label: "Todos",
                        value: "todos",
                      },
                      ...listSectorSelect.sort((a, b) =>
                        genericSort(a, b, {
                          property: "label",
                        }),
                      ),
                    ]}
                  />
                </FormControl>
              </Flex>

              <Flex w="100%" gap="15px">
                <FormControl isRequired flex="1">
                  <FormLabel>Subcategorias</FormLabel>
                  <ReactSelect
                    isLoading={isLoadingPositions}
                    isDisabled={
                      sectorSelect?.value === "todos" || !form?.relationshipType
                    }
                    className="select-fields"
                    classNamePrefix="select"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    placeholder={
                      positions?.filter(
                        (position) =>
                          position?.nameFormatted !== "NAO INFORMADO",
                      ).length > 0
                        ? "Selecione uma Subcategoria"
                        : "Selecione uma categoria"
                    }
                    value={occupationSelect}
                    onChange={handleChangeSelectedOccupation}
                    noOptionsMessage={() => "-"}
                    options={
                      positions?.filter(
                        (position) =>
                          position?.nameFormatted !== "NAO INFORMADO",
                      ).length > 0
                        ? [
                            {
                              label: "Todos",
                              value: "todos",
                            },
                            ...(positions
                              ?.filter(
                                (position) =>
                                  position?.nameFormatted !== "NAO INFORMADO",
                              )
                              ?.map((position) => ({
                                label: position?.name,
                                value: position?.id,
                              })) || []),
                          ]
                        : []
                    }
                  />
                </FormControl>

                {form?.relationshipType === null && <Box flex="1"></Box>}

                {form?.relationshipType === "holder" && (
                  <FormControl isRequired flex="1">
                    <FormLabel>Titular</FormLabel>

                    <ReactSelect
                      name="colaborador"
                      isLoading={loadingCollab}
                      isDisabled={
                        sectorSelect?.value === "todos" ||
                        occupationSelect?.value === "todos"
                      }
                      value={collaboratorSelect}
                      onChange={(e) => {
                        setForm((prev: any) => ({
                          ...prev,
                          beneficiaryId: e?.value,
                          beneficiaryName: capitalize(e?.label),
                        }));
                        setCollaboratorSelect(e);
                      }}
                      noOptionsMessage={() => "Não há titular para selecionar"}
                      placeholder={
                        occupationSelect
                          ? loadingCollab
                            ? "Carregando..."
                            : "Selecione um titular"
                          : "Selecione uma Subcategoria"
                      }
                      options={
                        listCollaboratorSelect.length > 0
                          ? [
                              {
                                label: "Todos",
                                value: "todos",
                              },
                              ...listCollaboratorSelect.map((s: ISelect) => ({
                                label: s?.label,
                                value: s?.value,
                              })),
                            ]
                          : []
                      }
                    />
                  </FormControl>
                )}

                {form?.relationshipType === "dependent" && (
                  <FormControl isRequired flex="1">
                    <FormLabel>Dependentes</FormLabel>

                    <ReactSelect
                      isDisabled
                      name="dependentes"
                      value={{
                        label: "Todos",
                        value: "todos",
                      }}
                      options={[
                        {
                          label: "Todos",
                          value: "todos",
                        },
                      ]}
                    />
                  </FormControl>
                )}
              </Flex>

              {form?.relationshipType === "dependent" && (
                <Flex w="100%" gap="15px">
                  <FormControl isRequired flex="1">
                    <FormLabel>Parentesco</FormLabel>
                    <ReactSelect
                      name="parentesco"
                      className="select-fields"
                      classNamePrefix="select"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      placeholder="Selecionar"
                      value={kinshipSelect}
                      onChange={(e) => {
                        setKinshipSelect(e);
                        setForm((prev: any) => ({
                          ...prev,
                          relationship: e?.value,
                        }));
                      }}
                      noOptionsMessage={() => "-"}
                      options={Object.keys(BENEFICIARY_KINSHIP).map((key) => ({
                        value: key,
                        label: BENEFICIARY_KINSHIP[key],
                      }))}
                    />
                  </FormControl>
                  <Box flex="1"></Box>
                </Flex>
              )}

              <Flex w="100%" gap="15px">
                <FormControl isRequired flex="1">
                  <FormLabel>Modo de contribuição</FormLabel>
                  <ReactSelect
                    name="contribuicao"
                    isDisabled={!form?.relationshipType}
                    className="select-fields"
                    classNamePrefix="select"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    placeholder="Selecionar"
                    value={modeSelect}
                    onChange={(e) => {
                      setModeSelect(e);
                      setForm((prev: any) => ({
                        ...prev,
                        percentageValue: e?.value,
                        value: null,
                      }));
                    }}
                    noOptionsMessage={() => "-"}
                    options={[
                      {
                        label: "Valor",
                        value: "V",
                      },
                      {
                        label: "Percentual",
                        value: "P",
                      },
                    ]}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  flex="1"
                  display="flex"
                  flexDir="column"
                  justifyContent="flex-start"
                >
                  <FormLabel>Valor/Percentual pago pela empresa</FormLabel>
                  {form?.percentageValue === "V" && (
                    <NumericInput
                      value={form?.value || 0}
                      onChange={(e) => {
                        setForm((prev: any) => ({
                          ...prev,
                          value: e,
                        }));
                      }}
                      valueLimit={productLimitValue}
                      maxWidth="100%"
                      height="38px"
                      textAlign="start"
                    />
                  )}
                  {form?.percentageValue === "P" && (
                    <NumberInput
                      step={1}
                      defaultValue={0}
                      min={0}
                      max={100}
                      clampValueOnBlur={true}
                      value={form?.value || 0}
                      onChange={(e) => {
                        const parsedValue = parseInt(e, 10) || 0;
                        const clampedValue = Math.min(parsedValue, 100);

                        setForm((prev) => ({
                          ...prev,
                          value: clampedValue,
                        }));
                      }}
                    >
                      <NumberInputField height="38px" />
                    </NumberInput>
                  )}
                  {!form?.percentageValue && (
                    <Input readOnly value="Selecione um modo de contribuição" />
                  )}
                </FormControl>
              </Flex>
            </Flex>
          )}

          {step === 2 && form?.value && form?.relationshipType && (
            <Box width="100%" padding="10px 0">
              <Text textAlign="left" fontWeight={600} margin="10px 24px 24px">
                {benefit?.product?.companyProvider?.company?.corporateName} +{" "}
                {capitalize(benefit?.product?.reducedName)}
              </Text>
              <Text textAlign="left" margin="0 24px 24px">
                O respectivo parâmetro será aplicado de acordo com as opções
                selecionadas.
              </Text>

              <Table margin="0 0 30px">
                <Thead>
                  <Tr>
                    <Th>Tipo</Th>
                    <Th>Categoria</Th>
                    <Th>Subcategoria</Th>
                    {form?.relationshipType === "holder" ? (
                      <Th>Titular</Th>
                    ) : (
                      <Th>Dependentes</Th>
                    )}
                    <Th>
                      Modo de
                      <br />
                      contribuição
                    </Th>
                    <Th>
                      Valor/Percentual
                      <br />
                      pago pela empresa
                    </Th>
                  </Tr>
                </Thead>
                <Tbody border="1px solid #edf2f7">
                  <Tr>
                    <Td>{BENEFICIARY_TYPE[form?.relationshipType]}</Td>
                    <Td>
                      <TooltipSubstring
                        name={form?.sectorName || ""}
                        length={10}
                      />
                    </Td>
                    <Td>
                      <TooltipSubstring
                        name={form?.positionName || ""}
                        length={10}
                      />
                    </Td>
                    {form?.relationshipType === "holder" ? (
                      <Td>
                        <TooltipSubstring
                          name={capitalize(form?.beneficiaryName || "") || ""}
                          length={10}
                        />
                      </Td>
                    ) : (
                      <Td>Todos</Td>
                    )}
                    <Td>
                      {form?.percentageValue === "V" ? "Valor" : "Percentual"}
                    </Td>
                    <Td>
                      {form?.percentageValue === "V"
                        ? numberFormat(form?.value)
                        : `% ${form?.value}`}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Text textAlign="left" fontWeight={600} margin="0 24px 10px">
                Tabela de preço
              </Text>
              <PriceTable
                borderTop="1px solid #E5E5E5"
                benefit={benefit}
                relationship={
                  form?.relationshipType as
                    | "holder"
                    | "dependent"
                    | "aggregated"
                }
                page="parametersModal"
                parametrizerItemValue={form?.value}
                percentageValue={form?.percentageValue || ""}
              />
            </Box>
          )}
        </ContentModal>
      </SimpleModal>
    </>
  );
};

export default AddParameterization;
