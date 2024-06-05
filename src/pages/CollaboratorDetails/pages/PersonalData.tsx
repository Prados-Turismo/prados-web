/* eslint-disable no-self-assign */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";

// Icons
import { HiCheck, HiPencil } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";

import Loading from "../../../components/Loading";
import { useGlobal } from "../../../contexts/UserContext";

// Hooks and utils
import useCollaborator from "../../../hooks/useCollaborator";
import useSector from "../../../hooks/useSector";
import {
  cepMask,
  cpfHidden,
  cpfMask,
  dateFormat,
  dateMask,
  genericSort,
} from "../../../utils";

import { cities } from "../../../utils/cities";
import { uf } from "../../../utils/uf";

// Styled
import { Field, Group, GroupButtons, GroupFields, HeaderInner } from "./styled";

import AlertModal from "../../../components/AlertModal";
import ModalOccupation from "../../../components/ModalOccupation";
import ModalSector from "../../../components/ModalSector";
import PersonDocuments from "../../../components/PersonDocuments";
import { useToastStandalone } from "../../../hooks/useToastStandalone";
import useViaCep from "../../../hooks/useViaCep";
import { IDataDisableCollaborator } from "../../../models/collaborator.model";
import { ISelect } from "../../../models/generics.model";
import { capitalize } from "../../../utils/capitalize";
import {
  BENEFICIARY_EMPLOYMENT_RELATIONSHIP,
  PERSON_MARITAL_STATUS,
  SEX_IDENTITY,
} from "../../../utils/enumFormat";
import {
  cellphoneMask,
  cellphoneValidation,
  onlyNumberMask,
} from "../../../utils/fieldMask";
import InactiveCollaboratorModal from "../components/InactiveCollaboratorModal";
import InactivateProductAndCollaborator from "./InactivateProductAndCollaborator";

const PersonalData = () => {
  const { company, isPre, isBroker } = useGlobal();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const companyIdParams = searchParams.get("companyId") || "";

  let profile = "companyIdUser";
  if (companyIdParams) profile = "companyIdParams";

  const { getSector, getOccupation } = useSector();

  const { data: dataSectors, isLoading: loadingSectors } = getSector(
    company!.externalCompanyId,
  );

  const [errorPhone, setErrorPhone] = useState(false);

  const { getBeneficiary, updateCollaborator, disableCollaborator } =
    useCollaborator();
  const { isLoading: loadingMutate, mutate } = updateCollaborator();
  const { data, isLoading } = getBeneficiary({
    companyId: company!.externalCompanyId,
    beneficiaryId: id || "",
  });
  const [isLoadingReactivate, setIsLoadingReactivete] = useState(false);

  const { reactivateCollaborator } = disableCollaborator();

  // Inputs form
  const name = useRef<HTMLInputElement | null>(null);
  const phone = useRef<HTMLInputElement | null>(null);
  const sex = useRef<any>(null);
  const civilState = useRef<any>(null);
  const motherName = useRef<HTMLInputElement | null>(null);
  const sectorName = useRef<any>(null);
  const occupationName = useRef<any>(null);
  const admissionDate = useRef<HTMLInputElement | null>(null);
  const admissionType = useRef<any>(null);
  const cep = useRef<HTMLInputElement | null>(null);
  const number = useRef<HTMLInputElement | null>(null);
  const address = useRef<HTMLInputElement | null>(null);
  const neighborness = useRef<HTMLInputElement | null>(null);
  const complement = useRef<HTMLInputElement | null>(null);
  const city = useRef<any>(null);
  const state = useRef<any>(null);
  const registrationRef = useRef<any>(null);
  // Finish inputs form

  const [sector, setSector] = useState<ISelect | null>(null);
  const [occupation, setOccupation] = useState<ISelect | null>(null);
  const [ufHolder, setUfHolder] = useState<ISelect | null>(null);
  const [cityHolder, setCityHolder] = useState<ISelect | null>(null);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeContracts, setActiveContracts] = useState<
    IDataDisableCollaborator[] | null
  >(null);

  const [modalState, setModalState] = useState({
    sector: false,
    occupation: false,
    disableCollaborator: false,
    reactivateCollaborator: false,
  });

  const [addressValue, setAddressValue] = useState<any>(
    data?.person?.personAddress[0]?.publicPlace,
  );
  const [neighbornessValue, setNeighbornessValue] = useState<any>(
    data?.person?.personAddress[0]?.neighborhood,
  );

  const handleSubmitRegister = (event: FormEvent) => {
    event.preventDefault();
    const id = data?.id;
    const nomePessoaFisica = name?.current?.value || "";
    const celular = phone?.current?.value || "";
    const sexo = sex?.current?.getValue()[0].value || "";
    const estado_civil = civilState?.current?.getValue()[0].value || "";
    const nomeMae = motherName?.current?.value || "";
    const setor = sectorName?.current?.getValue()[0].value || "";
    const cargo = occupationName?.current?.getValue()[0].value || "";
    const dataAdmissao = admissionDate?.current?.value || null;
    const relacao_trabalhista =
      admissionType?.current?.getValue()[0].value || "";
    const CEP = cep?.current?.value || "";
    const endereco = address?.current?.value || "";
    const bairroEndereco = neighborness?.current?.value || "";
    const complemento = complement?.current?.value || "";
    const numero = number?.current?.value || "";
    const municipio = city?.current?.getValue()[0].value || "";
    const municipioLabel = city?.current?.getValue()[0].label || "";
    const unidade_federativa = state?.current?.getValue()[0].value || "";
    const unidade_federativaLabel = state?.current?.getValue()[0].label || "";
    const flAtivacao = isActive ? "A" : data?.beneficiaryStatus;
    const idPerson = data?.person?.id;
    const registration = registrationRef?.current?.value || null;

    if (
      !estado_civil ||
      !setor ||
      !cargo ||
      !relacao_trabalhista ||
      !municipio ||
      !municipioLabel ||
      !unidade_federativa ||
      !unidade_federativaLabel
    ) {
      useToastStandalone({
        description: "Preencha todos os campos obrigatórios...",
        status: "warning",
      });
    } else {
      mutate({
        id,
        idPerson,
        nomePessoaFisica,
        celular,
        sexo,
        estado_civil,
        nomeMae,
        setor,
        cargo,
        dataAdmissao,
        relacao_trabalhista,
        CEP,
        endereco,
        bairroEndereco,
        complemento,
        municipio,
        municipioLabel,
        unidade_federativa,
        unidade_federativaLabel,
        flAtivacao,
        numero,
        registration,
      });
      setIsDisable(true);
    }
  };

  const { getCep } = useViaCep();
  const {
    isLoading: isLoadingCep,
    mutate: mutateCep,
    data: dataCep,
  } = getCep();

  const { data: positions, isLoading: isLoadingPositions } = getOccupation(
    sector?.value?.toString() || "",
  );

  useEffect(() => {
    if (data) {
      setAddressValue(data?.person?.personAddress[0]?.publicPlace);
      setNeighbornessValue(data?.person?.personAddress[0]?.neighborhood);
      setSector({
        label: data?.sector?.name,
        value: data?.sector?.id,
      });
      setOccupation({
        label: data?.position?.name,
        value: data?.position?.id,
      });
      const labelUf =
        uf.find(
          (state) =>
            state?.codIbgeUF ===
            data?.person?.personAddress[0]?.codIbgeUf?.toString(),
        )?.nomeUF || "";
      const valueUf =
        uf.find(
          (state) =>
            state?.codIbgeUF ===
            data?.person?.personAddress[0]?.codIbgeUf?.toString(),
        )?.codIbgeUF || 0;
      setUfHolder({
        label: labelUf,
        value: valueUf,
      });
      const labelCity =
        cities.find(
          (element) =>
            element?.codIbgeMunicipio ===
            data?.person?.personAddress[0]?.codIbgeCity?.toString(),
        )?.nomeMunicipio || "";
      const valueCity =
        cities.find(
          (element) =>
            element?.codIbgeMunicipio ===
            data?.person?.personAddress[0]?.codIbgeCity?.toString(),
        )?.codIbgeMunicipio || 0;
      setCityHolder({
        label: labelCity,
        value: valueCity,
      });
    }
  }, [data]);

  const handleCep = (cep: string) => {
    if (cep?.length >= 8) {
      mutateCep({
        cep: cep,
      });
    }
  };

  useEffect(() => {
    // if (dataCep?.erro) {
    //   useToastStandalone({
    //     title: "Erro ao buscar dados do CEP!",
    //     status: "warning",
    //   });
    // }
    if (dataCep) {
      const ufResult = cities.find(
        (city) => city?.codIbgeMunicipio === dataCep?.ibge,
      )?.unidade_federativa;

      setAddressValue(dataCep?.logradouro);
      setNeighbornessValue(dataCep?.bairro);

      setUfHolder(
        ufResult
          ? {
              value: ufResult?.codIbgeUF,
              label: ufResult?.nomeUF,
            }
          : null,
      );
      setCityHolder(
        dataCep?.localidade && dataCep?.ibge
          ? {
              value: dataCep?.ibge,
              label: dataCep?.localidade,
            }
          : null,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCep]);

  return (
    <>
      {isLoading && (
        <Box marginTop="40px">
          <Loading />
        </Box>
      )}

      {!isLoading && (
        <>
          {data && (
            <>
              {activeContracts ? (
                <>
                  <InactivateProductAndCollaborator
                    setActiveContracts={setActiveContracts}
                    activeContracts={activeContracts}
                    beneficiaryId={data?.id}
                  />
                </>
              ) : (
                <>
                  <Group padding={5}>
                    <form onSubmit={handleSubmitRegister}>
                      <HeaderInner>
                        <div className="title">
                          {isDisable ? (
                            <h3>Dados pessoais</h3>
                          ) : (
                            <>
                              <h3>
                                {isActive ? "Completar cadastro" : "Editar"}
                              </h3>
                              <span className="required">
                                (*) indica os campos obrigatórios
                              </span>
                            </>
                          )}
                        </div>

                        <GroupButtons>
                          {isDisable ? (
                            <>
                              {profile !== "companyIdParams" &&
                                ["A", "P"].includes(data?.beneficiaryStatus) &&
                                !isPre && (
                                  <Button
                                    variant="outline"
                                    leftIcon={<RiCloseFill />}
                                    onClick={() => {
                                      setModalState({
                                        ...modalState,
                                        disableCollaborator: true,
                                      });
                                    }}
                                  >
                                    Inativar
                                  </Button>
                                )}

                              {profile !== "companyIdParams" &&
                                data?.beneficiaryStatus === "P" && (
                                  <Button
                                    variant="outline"
                                    leftIcon={<RiCheckFill />}
                                    onClick={() => {
                                      setIsDisable(false);
                                      setIsActive(true);
                                    }}
                                  >
                                    Completar cadastro
                                  </Button>
                                )}

                              {data?.beneficiaryStatus === "I" && (
                                <Button
                                  variant="outline"
                                  leftIcon={<RiCheckFill />}
                                  onClick={() => {
                                    setModalState({
                                      ...modalState,
                                      reactivateCollaborator: true,
                                    });
                                  }}
                                >
                                  Reativar
                                </Button>
                              )}

                              {profile !== "companyIdParams" &&
                                data?.beneficiaryStatus !== "I" && (
                                  <Button
                                    variant="outline"
                                    leftIcon={<HiPencil />}
                                    onClick={() => {
                                      setIsDisable(false);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                )}
                            </>
                          ) : (
                            <>
                              <Button
                                type="submit"
                                variant="outline"
                                leftIcon={<HiCheck />}
                                isLoading={loadingMutate}
                                isDisabled={errorPhone}
                              >
                                Salvar
                              </Button>

                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsDisable(true);
                                  setIsActive(false);
                                }}
                              >
                                <RiCloseFill />
                              </Button>
                            </>
                          )}
                        </GroupButtons>
                      </HeaderInner>

                      <GroupFields>
                        <div className="left">
                          <Field>
                            <label>
                              Nome <span className="required">&nbsp;*</span>
                            </label>

                            <div className="inputWrap">
                              <Input
                                ref={name}
                                type="text"
                                defaultValue={capitalize(data?.person?.name)}
                                isDisabled={isDisable || loadingMutate}
                                required
                                id="name"
                                name="name"
                              />
                            </div>
                          </Field>

                          <Field>
                            <label htmlFor="cpf">CPF</label>

                            <div className="inputWrap">
                              <Input
                                type="text"
                                defaultValue={cpfHidden(
                                  cpfMask(data?.person?.cpf),
                                )}
                                isDisabled={true}
                                id="cpf"
                                name="cpf"
                              />
                            </div>
                          </Field>

                          <Field>
                            <label htmlFor="born">Data de nascimento</label>

                            <div className="inputWrap">
                              <Input
                                type="text"
                                defaultValue={
                                  data?.person.bornDate
                                    ? dateFormat(
                                        new Date(data?.person?.bornDate),
                                      )
                                    : undefined
                                }
                                isDisabled={true}
                                id="bornDate"
                                name="bornDate"
                              />
                            </div>
                          </Field>

                          <Field>
                            <label htmlFor="email">E-mail</label>
                            <div className="inputWrap">
                              <Input
                                type="email"
                                defaultValue={data?.person?.email}
                                isDisabled={true}
                                id="email"
                                name="email"
                              />
                            </div>
                          </Field>

                          <Field>
                            <label htmlFor="phone">
                              Número do Celular
                              <span className="required">&nbsp;*</span>
                            </label>
                            <div className="inputWrap">
                              <Flex flexDir="column" w="100%">
                                <Input
                                  ref={phone}
                                  type="text"
                                  id="phone"
                                  name="phone"
                                  placeholder="Digite o número do celular"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  defaultValue={cellphoneMask(
                                    data?.person?.phoneNumber || "",
                                  )}
                                  isDisabled={isDisable || loadingMutate}
                                  required
                                  maxLength={15}
                                  onInput={(
                                    event: FormEvent<HTMLInputElement>,
                                  ) => {
                                    event.currentTarget.value = cellphoneMask(
                                      event.currentTarget.value,
                                    );

                                    if (
                                      cellphoneValidation(
                                        event.currentTarget.value,
                                      )
                                    ) {
                                      setErrorPhone(false);
                                    } else {
                                      setErrorPhone(true);
                                    }
                                  }}
                                />
                                {errorPhone && (
                                  <p className="error">
                                    Informe um número com formato válido (00)
                                    90000-0000
                                  </p>
                                )}
                              </Flex>
                            </div>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="sex">Sexo</FormLabel>

                              <ReactSelect
                                required
                                ref={sex}
                                id="sexIdentity"
                                name="sexIdentity"
                                className="select-fields large"
                                classNamePrefix="select"
                                closeMenuOnSelect={true}
                                isSearchable={true}
                                placeholder="Selecione o sexo"
                                options={Object.keys(SEX_IDENTITY).map(
                                  (key) => ({
                                    value: key,
                                    label: SEX_IDENTITY[key],
                                  }),
                                )}
                                defaultValue={
                                  data?.person?.sexIdentity
                                    ? {
                                        label:
                                          SEX_IDENTITY[
                                            data?.person?.sexIdentity
                                          ] || "",
                                        value: data?.person?.sexIdentity,
                                      }
                                    : null
                                }
                                isDisabled={isDisable || loadingMutate}
                              />
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="civilState">
                                Estado civil
                              </FormLabel>

                              <ReactSelect
                                ref={civilState}
                                id="civilState"
                                required
                                name="civilState"
                                className="select-fields large"
                                classNamePrefix="select"
                                closeMenuOnSelect={true}
                                isSearchable={true}
                                placeholder="Selecione o estado civil"
                                options={Object.keys(PERSON_MARITAL_STATUS).map(
                                  (key) => ({
                                    value: key,
                                    label: PERSON_MARITAL_STATUS[key],
                                  }),
                                )}
                                defaultValue={
                                  data?.person?.personMaritalStatus
                                    ? {
                                        label:
                                          PERSON_MARITAL_STATUS[
                                            data?.person?.personMaritalStatus
                                          ] || "",
                                        value:
                                          data?.person?.personMaritalStatus,
                                      }
                                    : null
                                }
                                isDisabled={isDisable || loadingMutate}
                              />
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="motherName">
                                Nome da mãe
                              </FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={motherName}
                                  placeholder="Digite o nome completo"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  type="text"
                                  defaultValue={data?.person?.nameMother}
                                  isDisabled={isDisable || loadingMutate}
                                  id="motherName"
                                  name="motherName"
                                />
                              </div>
                            </FormControl>
                          </Field>
                        </div>

                        <div className="right">
                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="sector">Categoria</FormLabel>

                              <div className="inputWrap">
                                <ReactSelect
                                  ref={sectorName}
                                  id="sector"
                                  name="sector"
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
                                  noOptionsMessage={() =>
                                    "Nenhuma categoria encontrado"
                                  }
                                  options={dataSectors?.map((sector) => ({
                                    label: sector?.name,
                                    value: sector?.id,
                                  }))}
                                  value={sector}
                                  isDisabled={isDisable || loadingMutate}
                                  required
                                />

                                <Button
                                  id="add_sector"
                                  onClick={() => {
                                    setModalState({
                                      ...modalState,
                                      sector: true,
                                    });
                                  }}
                                  isDisabled={isDisable || loadingMutate}
                                >
                                  <IoIosAdd size={20} />
                                </Button>
                              </div>
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="occupation">
                                Subcategoria
                              </FormLabel>
                              <div className="inputWrap">
                                <ReactSelect
                                  ref={occupationName}
                                  id="occupation"
                                  name="occupation"
                                  className="select-fields large"
                                  classNamePrefix="select"
                                  closeMenuOnSelect={true}
                                  isSearchable={true}
                                  placeholder={
                                    isLoadingPositions ? "" : "Selecione"
                                  }
                                  isLoading={isLoadingPositions}
                                  onChange={(option) => {
                                    setOccupation(option);
                                  }}
                                  noOptionsMessage={() =>
                                    "Selecione uma categoria"
                                  }
                                  options={positions.map((position) => ({
                                    label: position?.name,
                                    value: position?.id,
                                  }))}
                                  value={occupation}
                                  isDisabled={isDisable || loadingMutate}
                                  required
                                />

                                <Button
                                  id="add_occupation"
                                  onClick={() => {
                                    setModalState({
                                      ...modalState,
                                      occupation: true,
                                    });
                                  }}
                                  isDisabled={isDisable || loadingMutate}
                                >
                                  <IoIosAdd size={20} />
                                </Button>
                              </div>
                            </FormControl>
                          </Field>
                          <Field>
                            <label>Matrícula</label>

                            <div className="inputWrap">
                              <Input
                                ref={registrationRef}
                                defaultValue={capitalize(data?.registration)}
                                isDisabled={isDisable || loadingMutate}
                                onInput={(event) => {
                                  const regex = /^[a-zA-Z0-9]+$/;
                                  if (regex.test(event.currentTarget.value)) {
                                    event.currentTarget.value =
                                      event.currentTarget.value;
                                  } else {
                                    event.currentTarget.value = "";
                                  }
                                }}
                                maxLength={40}
                                id="registration"
                                name="registration"
                              />
                            </div>
                          </Field>

                          <Field>
                            <FormControl display="flex">
                              <FormLabel htmlFor="admissionDate">
                                Data de admissão
                              </FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={admissionDate}
                                  id="admissionDate"
                                  name="admissionDate"
                                  placeholder="Digite a data de admissão"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  type="text"
                                  defaultValue={
                                    data?.admissionDate
                                      ? dateFormat(
                                          new Date(data?.admissionDate),
                                        )
                                      : undefined
                                  }
                                  onInput={(
                                    event: FormEvent<HTMLInputElement>,
                                  ) => {
                                    event.currentTarget.value = dateMask(
                                      event.currentTarget.value,
                                    );
                                  }}
                                  isDisabled={isDisable || loadingMutate}
                                />
                              </div>
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="admissionType">
                                Tipo de Vínculo
                              </FormLabel>

                              <ReactSelect
                                ref={admissionType}
                                required
                                id="admissionType"
                                name="admissionType"
                                className="select-fields large"
                                classNamePrefix="select"
                                closeMenuOnSelect={true}
                                isSearchable={true}
                                placeholder="Selecione um tipo de vínculo"
                                options={Object.keys(
                                  BENEFICIARY_EMPLOYMENT_RELATIONSHIP,
                                ).map((key) => ({
                                  value: key,
                                  label:
                                    BENEFICIARY_EMPLOYMENT_RELATIONSHIP[key],
                                }))}
                                defaultValue={
                                  data?.employmentRelationshipType
                                    ? {
                                        label:
                                          BENEFICIARY_EMPLOYMENT_RELATIONSHIP[
                                            data?.employmentRelationshipType
                                          ] || "",
                                        value: data?.employmentRelationshipType,
                                      }
                                    : null
                                }
                                isDisabled={isDisable || loadingMutate}
                              />
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="cep">CEP</FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={cep}
                                  id="cep"
                                  name="cep"
                                  type="text"
                                  placeholder="00000-000"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  defaultValue={cepMask(
                                    data?.person?.personAddress[0]?.cep || "",
                                  )}
                                  isDisabled={isDisable || loadingMutate}
                                  onInput={(
                                    event: FormEvent<HTMLInputElement>,
                                  ) => {
                                    event.currentTarget.value = cepMask(
                                      event.currentTarget.value,
                                    );
                                    handleCep(
                                      onlyNumberMask(
                                        event?.currentTarget?.value,
                                      ),
                                    );
                                  }}
                                  minLength={10}
                                />
                              </div>

                              {isLoadingCep && (
                                <Spinner
                                  position="absolute"
                                  top="8px"
                                  right="10px"
                                  thickness="4px"
                                  speed="0.65s"
                                  emptyColor="gray.200"
                                  size="md"
                                  color="brand.500"
                                />
                              )}
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="address">Endereço</FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={address}
                                  id="address"
                                  name="address"
                                  placeholder="Digite o endereço"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  value={addressValue}
                                  type="text"
                                  isDisabled={isDisable || loadingMutate}
                                  onChange={(e) => {
                                    setAddressValue(e.target.value);
                                  }}
                                />
                              </div>
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="number">Número</FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={number}
                                  id="number"
                                  name="number"
                                  placeholder="Digite o número"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  type="number"
                                  defaultValue={
                                    data?.person?.personAddress[0]?.number || ""
                                  }
                                  isDisabled={isDisable || loadingMutate}
                                  onInput={(
                                    event: FormEvent<HTMLInputElement>,
                                  ) => {
                                    event.currentTarget.value =
                                      event?.currentTarget?.value?.toString();
                                  }}
                                  minLength={1}
                                />
                              </div>
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl display="flex">
                              <FormLabel htmlFor="complement">
                                Complemento
                              </FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={complement}
                                  id="complement"
                                  name="complement"
                                  placeholder="Apartamento, sala, conjunto, edifício, andar, etc."
                                  _placeholder={{ color: "#a8a7a7" }}
                                  type="text"
                                  defaultValue={
                                    data?.person?.personAddress[0]?.complement
                                  }
                                  isDisabled={isDisable || loadingMutate}
                                />
                              </div>
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="neighborness">
                                Bairro
                              </FormLabel>

                              <div className="inputWrap">
                                <Input
                                  ref={neighborness}
                                  id="neighBorness"
                                  name="neighBorness"
                                  placeholder="Digite o bairro"
                                  _placeholder={{ color: "#a8a7a7" }}
                                  type="text"
                                  value={neighbornessValue}
                                  isDisabled={isDisable || loadingMutate}
                                  onChange={(e) => {
                                    setNeighbornessValue(e.target.value);
                                  }}
                                />
                              </div>
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="state">Estado</FormLabel>
                              <ReactSelect
                                menuPlacement="top"
                                ref={state}
                                id="uf"
                                required
                                name="uf"
                                className="select-fields large"
                                classNamePrefix="select"
                                closeMenuOnSelect={true}
                                isSearchable={true}
                                placeholder="Selecione um estado"
                                options={uf
                                  .sort((a, b) =>
                                    genericSort(a, b, {
                                      property: "nomeUF",
                                    }),
                                  )
                                  .map((state) => ({
                                    label: state.nomeUF,
                                    value: state?.codIbgeUF,
                                  }))}
                                value={ufHolder?.label ? ufHolder : null}
                                onChange={(option) => {
                                  setUfHolder(option);
                                  setCityHolder(null);
                                }}
                                isDisabled={
                                  isDisable ||
                                  loadingMutate ||
                                  (dataCep?.localidade && dataCep?.ibge
                                    ? true
                                    : false)
                                }
                              />
                            </FormControl>
                          </Field>

                          <Field>
                            <FormControl isRequired display="flex">
                              <FormLabel htmlFor="city">Município</FormLabel>

                              <ReactSelect
                                menuPlacement={
                                  !ufHolder?.label ? "bottom" : "top"
                                }
                                ref={city}
                                required
                                id="city"
                                name="city"
                                className="select-fields large"
                                classNamePrefix="select"
                                closeMenuOnSelect={true}
                                isSearchable={true}
                                placeholder="Selecione um município"
                                noOptionsMessage={() =>
                                  !ufHolder?.label
                                    ? "Selecione um Estado"
                                    : "Não há opções para selecionar"
                                }
                                options={cities
                                  .filter(
                                    (element) =>
                                      element.unidade_federativa?.codIbgeUF ===
                                      ufHolder?.value,
                                  )
                                  .sort((a, b) =>
                                    genericSort(a, b, {
                                      property: "nomeMunicipio",
                                    }),
                                  )
                                  .map((city) => ({
                                    label: city?.nomeMunicipio,
                                    value: city?.codIbgeMunicipio,
                                  }))}
                                onChange={(option) => {
                                  setCityHolder(option);
                                }}
                                value={cityHolder?.value ? cityHolder : null}
                                isDisabled={
                                  isDisable ||
                                  loadingMutate ||
                                  (dataCep?.localidade && dataCep?.ibge
                                    ? true
                                    : false)
                                }
                              />
                            </FormControl>
                          </Field>
                        </div>
                      </GroupFields>
                    </form>
                  </Group>

                  {!isBroker && (
                    <PersonDocuments
                      personId={data?.person?.id}
                      authorization={data?.authorizesDownloadDocument}
                    />
                  )}
                </>
              )}
            </>
          )}

          {modalState.sector && (
            <ModalSector
              handleOpen={(arg) => {
                setModalState({
                  ...modalState,
                  sector: arg,
                });
              }}
              isOpen={modalState.sector}
            />
          )}

          {modalState.occupation && (
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

          {modalState.reactivateCollaborator && (
            <AlertModal
              isLoading={isLoadingReactivate}
              question="Deseja confirmar?"
              request={() => {
                setIsLoadingReactivete(true);
                reactivateCollaborator(
                  data?.id,
                  company?.externalCompanyId || "",
                  data?.person?.completeRecord ? "A" : "P",
                )
                  .then(() => {
                    setModalState({
                      ...modalState,
                      reactivateCollaborator: false,
                    });
                  })
                  .finally(() => {
                    setIsLoadingReactivete(false);
                  });
              }}
              showModal={modalState.reactivateCollaborator}
              setShowModal={() =>
                setModalState({
                  ...modalState,
                  reactivateCollaborator: false,
                })
              }
              size="md"
            >
              O status será alterado para Ativo.
            </AlertModal>
          )}

          {modalState?.disableCollaborator && (
            <InactiveCollaboratorModal
              setActiveContracts={setActiveContracts}
              collaboratorId={data?.id || ""}
              modal={modalState?.disableCollaborator}
              setModal={() => {
                setModalState({
                  ...modalState,
                  disableCollaborator: false,
                });
              }}
            />
          )}
        </>
      )}

      {!data && (
        <Alert status="info" maxW="max-content">
          <AlertIcon />
          Dados não localizados!
        </Alert>
      )}
    </>
  );
};

export default PersonalData;
