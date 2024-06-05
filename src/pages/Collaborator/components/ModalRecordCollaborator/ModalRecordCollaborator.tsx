/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";
import ModalOccupation from "../../../../components/ModalOccupation";
import ModalSector from "../../../../components/ModalSector";

// Hooks
import useCollaborator from "../../../../hooks/useCollaborator";
import useSector from "../../../../hooks/useSector";

// Funções de utilidade
import { emailValidation } from "../../../../utils/regexExpressions";

import {
  cpfInvalid,
  emailInvalid,
  fieldRequired,
  maxContent,
  minContent,
} from "../../../../utils/messagesError";

import {
  cepMask,
  cpfMask,
  cpfValidation,
  genericSort,
} from "../../../../utils";

import ReactSelect from "react-select";
import { cpfIso } from "../../../../components/ProductAdhesion/utils/cpf.mask";
import useViaCep from "../../../../hooks/useViaCep";
import { ISelect } from "../../../../models/generics.model";
import { cities } from "../../../../utils/cities";
import {
  BENEFICIARY_EMPLOYMENT_RELATIONSHIP,
  PERSON_MARITAL_STATUS,
  SEX_IDENTITY,
} from "../../../../utils/enumFormat";
import {
  cellphoneMask,
  cellphoneValidation,
  dateMask,
  onlyNumberMask,
} from "../../../../utils/fieldMask";
import { uf } from "../../../../utils/uf";
import { FieldWrap } from "./styled";
import { IBeneficiaryCheckResponse } from "../../../../models/collaborator.model";

const handleSubmitRegisterSchema = z.object({
  name: z
    .string()
    .min(7, {
      message: `O nome ${minContent(7)}`,
    })
    .max(120, {
      message: `O nome ${maxContent(120)}`,
    })
    .min(1, {
      message: fieldRequired("nome"),
    }),
  cpf: z
    .string()
    .min(1, {
      message: fieldRequired("CPF"),
    })
    .refine((cpf: string) => cpfValidation(cpf), {
      message: cpfInvalid,
    }),
  email: z
    .string()
    .min(1, {
      message: fieldRequired("e-mail"),
    })
    .regex(emailValidation, {
      message: emailInvalid,
    })
    .transform((email) => email.toLocaleLowerCase()),

  bornDate: z
    .string()
    .min(1, {
      message: "data de nascimento é obrigatória",
    })
    .min(10, {
      message:
        "A data deve conter o dia (2 caracteres), o mês (2 caracteres) e o ano (4 caracteres)",
    })
    .max(10, {
      message:
        "A data deve conter o dia (2 caracteres), o mês (2 caracteres) e o ano (4 caracteres)",
    }),
  phone: z
    .string()
    .refine(
      (value) => {
        if (value.trim() === "") {
          return true;
        }

        return cellphoneValidation(value);
      },
      {
        message: "Informe um número com formato válido (00) 90000-0000.",
      },
    )
    .optional(),
  registration: z.string().optional(),
  sector: z.string().optional(),
  occupation: z.string().optional(),
  sex: z.string().optional(),
  typeContract: z.string().optional(),
  contractDate: z
    .string()
    .refine(
      (value) => {
        if (value.trim() === "") {
          return true;
        }

        return value.length === 10;
      },
      {
        message:
          "A data deve conter o dia (2 caracteres), o mês (2 caracteres) e o ano (4 caracteres)",
      },
    )
    .optional(),
  estado_civil: z.string().optional(),
  nomeMae: z
    .string()
    .refine(
      (value) => {
        if (value === null || value === "") {
          return true;
        }

        const trimmedValue = value.trim();
        return trimmedValue.length >= 7;
      },
      {
        message: `O nome da mãe ${minContent(7)}`,
      },
    )
    .optional(),
  cep: z
    .string()
    .refine(
      (value) => {
        if (value === null || value === "") {
          return true;
        }

        const trimmedValue = value.trim();
        return trimmedValue.length >= 10;
      },
      {
        message: "Informe um Cep válido",
      },
    )
    .optional()
    .nullable(),
  endereco: z.string().optional().nullable(),
  numero: z.string().optional().nullable(),
  bairroEndereco: z.string().optional().nullable(),
  complemento: z.string().optional().nullable(),
  uf: z.any().optional(),
  codIbgeUf: z.any().optional(),
  codIbgeCity: z.any().optional(),
  city: z.any().optional(),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  companyId: string;
  handleClose: () => void;
}

const ModalRecordCollaborator = ({
  companyId,
  handleClose,
}: IModalRecordCollaborator) => {
  const { getSector, getOccupation } = useSector();
  const { createCollaborator, checkByCpf, checkBirthDate } = useCollaborator();
  const { data: dataSectors, isLoading: loadingSectors } = getSector(companyId);
  const [occupationSelected, setOcuppationSelected] = useState<ISelect | null>(
    null,
  );
  const [ufHolder, setUfHolder] = useState<ISelect | null>(null);
  const [cityHolder, setCityHolder] = useState<ISelect | null>(null);
  const [addProduct, setAddProduct] = useState(false);
  const [isDateHigher, setIsDateHigher] = useState(false);
  const [isBornDateHigher, setIsBornDateHigher] = useState(false);
  const [sexValue, setSexValue] = useState<any>(null);
  const [maritalStatusValue, setMaritalStatusValue] = useState<any>(null);
  const [cpfFeedback, setCpfFeedback] = useState(false);
  const [birthDateFeedback, setBirthDateFeedback] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const [disabled, setDisabled] = useState(true);
  const [birthDateDisabled, setBirthDateDisable] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataCheckCpf, setDataCheckCpf] = useState<{
    id?: string;
    cpf: string;
  }>();
  const [dataCheckBirthDate, setDataCheckBirthDate] =
    useState<IBeneficiaryCheckResponse>({} as IBeneficiaryCheckResponse);
  const { mutate, isLoading } = createCollaborator(reset, handleClose);
  const { mutate: mutateCheckCpf, isLoading: isLoadingCheckCpf } = checkByCpf(
    setDisabled,
    setDataCheckCpf,
    setBirthDateDisable,
    setCpfFeedback,
  );

  const { mutate: mutateCheckBirthDate } = checkBirthDate(
    setDisabled,
    setDataCheckBirthDate,
    setBirthDateFeedback,
    setCpfFeedback,
  );

  const [sector, setSector] = useState<ISelect | null>(null);

  const [modalState, setModalState] = useState({
    sector: false,
    occupation: false,
  });

  const { getCep } = useViaCep();
  const {
    isLoading: isLoadingCep,
    mutate: mutateCep,
    data: dataCep,
  } = getCep();

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    mutate({
      ...data,
      companyId,
      codIbgeCity: data?.codIbgeCity ? parseInt(data?.codIbgeCity) : undefined,
      codIbgeUf: data?.codIbgeUf ? parseInt(data.codIbgeUf) : undefined,
      addProduct: addProduct,
      isLink: dataCheckCpf ? true : false,
      personId: (dataCheckCpf && dataCheckCpf?.id) || "",
    });
  };

  const handleCheckCpf = (cpf: string) => {
    mutateCheckCpf({ cpf: cpf });
  };

  const handleCheckByBirthDate = ({
    bornDate,
    personId,
  }: {
    bornDate: string;
    personId: string;
  }) => {
    mutateCheckBirthDate({
      bornDate,
      personId,
    });
  };

  const bornDate = watch("bornDate");
  const contractDate = watch("contractDate");

  useEffect(() => {
    if (new Date(bornDate) > new Date()) {
      setIsBornDateHigher(true);
      setError("bornDate", {
        type: "manual",
        message: "A data de nascimento não pode ser maior que a data atual",
      });
    } else {
      setIsBornDateHigher(false);
      clearErrors("bornDate");
    }

    if (bornDate?.length === 10 && contractDate?.length === 10) {
      const date1 = new Date(bornDate);
      const date2 = new Date(contractDate);

      if (date2 < date1) {
        setIsDateHigher(true);
        setError("contractDate", {
          type: "manual",
          message:
            "A data de Admissão não pode ser menor que a data de Nascimento",
        });
      } else {
        setIsDateHigher(false);
        clearErrors("contractDate");
      }
    } else {
      setIsDateHigher(false);
      clearErrors("contractDate");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bornDate, contractDate]);

  const { data: positions, isLoading: isLoadingPositions } = getOccupation(
    sector?.value?.toString() || "",
  );

  const isComplete =
    Object.values(watch()).filter(
      (e) => e === "" || e === undefined || e === null,
    ).length > 0
      ? false
      : true;

  const handleClearFields = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("bornDate", "");
    setValue("sex", "");
    setValue("phone", "");
    setValue("codIbgeCity", "");
    setValue("bairroEndereco", "");
    setValue("codIbgeUf", "");
    setValue("complemento", "");
    setValue("endereco", "");
    setValue("estado_civil", "");
    setValue("nomeMae", "");
    setValue("numero", "");
    setValue("occupation", "");
    setValue("registration", "");
    setValue("sector", "");
    setValue("typeContract", "");
    setValue("uf", "");
    setSexValue(undefined);
    setMaritalStatusValue(undefined);
    setUfHolder(null);
    setCityHolder(null);
    setDataCheckBirthDate({} as IBeneficiaryCheckResponse);
  };
  useEffect(() => {
    if (dataCheckBirthDate) {
      setValue("name", dataCheckBirthDate?.name || "");
      setValue("email", dataCheckBirthDate?.email || "");
      setValue("bornDate", dataCheckBirthDate?.bornDate || "");
      setValue("sex", dataCheckBirthDate?.sexIdentity || "");
      setValue(
        "phone",
        (dataCheckBirthDate?.phoneNumber &&
          cellphoneMask(dataCheckBirthDate?.phoneNumber)) ||
          "",
      );
      setValue("estado_civil", dataCheckBirthDate?.personMaritalStatus || "");
      setValue("nomeMae", dataCheckBirthDate?.nameMother || "");
      setSexValue(
        dataCheckBirthDate?.sexIdentity
          ? {
              label: SEX_IDENTITY[dataCheckBirthDate?.sexIdentity],
              value: dataCheckBirthDate?.sexIdentity,
            }
          : null,
      );
      setMaritalStatusValue(
        dataCheckBirthDate?.personMaritalStatus
          ? {
              label:
                PERSON_MARITAL_STATUS[dataCheckBirthDate?.personMaritalStatus],
              value: dataCheckBirthDate?.personMaritalStatus,
            }
          : null,
      );
      setValue(
        "cep",
        dataCheckBirthDate?.personAddress?.[0]?.cep &&
          cepMask(dataCheckBirthDate?.personAddress?.[0]?.cep),
      );
      setValue("endereco", dataCheckBirthDate?.personAddress?.[0]?.publicPlace);
      setValue("numero", dataCheckBirthDate?.personAddress?.[0]?.number);
      setValue(
        "complemento",
        dataCheckBirthDate?.personAddress?.[0]?.complement,
      );
      setValue(
        "bairroEndereco",
        dataCheckBirthDate?.personAddress?.[0]?.neighborhood,
      );

      setValue("uf", dataCheckBirthDate?.personAddress?.[0]?.uf);
      setValue("codIbgeUf", dataCheckBirthDate?.personAddress?.[0]?.codIbgeUf);
      setValue("city", dataCheckBirthDate?.personAddress?.[0]?.city);
      setValue(
        "codIbgeCity",
        dataCheckBirthDate?.personAddress?.[0]?.codIbgeCity,
      );
      setUfHolder(
        dataCheckBirthDate?.personAddress?.[0]?.codIbgeUf
          ? {
              value: dataCheckBirthDate?.personAddress?.[0]?.codIbgeUf,
              label: dataCheckBirthDate?.personAddress?.[0]?.uf,
            }
          : null,
      );
      setCityHolder(
        dataCheckBirthDate?.personAddress?.[0]?.codIbgeCity
          ? {
              value: dataCheckBirthDate?.personAddress?.[0]?.codIbgeCity,
              label: dataCheckBirthDate?.personAddress?.[0]?.city,
            }
          : null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCheckBirthDate]);

  const handleCep = (cep: string) => {
    if (cep?.length >= 8) {
      mutateCep({
        cep: cep,
      });
    } else {
      setValue("endereco", "");
      setValue("bairroEndereco", "");
      setValue("complemento", "");
      setValue("uf", "");
      setValue("codIbgeUf", "");
      setValue("city", "");
      setValue("codIbgeCity", "");
      setUfHolder(null);
      setCityHolder(null);
    }
  };

  useEffect(() => {
    const ufResult = cities.find(
      (city) => city?.codIbgeMunicipio === dataCep?.ibge,
    )?.unidade_federativa;
    setValue("endereco", dataCep?.logradouro);
    setValue("bairroEndereco", dataCep?.bairro);
    setValue("uf", ufResult?.nomeUF);
    setValue("codIbgeUf", ufResult?.codIbgeUF);
    setValue("city", dataCep?.localidade);
    setValue("codIbgeCity", dataCep?.ibge);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCep]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitRegister)}
        style={{ width: "100%" }}
      >
        <Box display="flex" flexDirection="column" gap="25px" padding="30px">
          <span>
            (<Asterisk />) indica os campos obrigatórios
          </span>

          <FieldWrap>
            <span>
              CPF <Asterisk />
            </span>

            <Flex position="relative" alignItems="center">
              <Input
                placeholder="Digite o CPF"
                type="text"
                id="cpf"
                onInput={(event: FormEvent<HTMLInputElement>) => {
                  event.currentTarget.value = cpfMask(
                    event.currentTarget.value,
                  );
                  handleClearFields();
                  if (cpfIso(event.currentTarget.value).length === 11) {
                    handleCheckCpf(cpfIso(event.currentTarget.value));
                  } else {
                    setDisabled(true);
                    setDataCheckCpf(undefined);
                  }
                }}
                {...register("cpf")}
              />
              {isLoadingCheckCpf && (
                <Spinner
                  position="absolute"
                  right="10px"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  size="md"
                  color="brand.500"
                />
              )}
            </Flex>

            {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            {cpfFeedback && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#707070",
                  width: "100%",
                  padding: "6px 0",
                }}
              >
                <b
                  style={{
                    fontSize: "12px",
                    color: "#E92043",
                  }}
                >
                  Este CPF já está cadastrado.
                </b>{" "}
                Confirme a data de nascimento para continuar o cadastro.
              </p>
            )}
          </FieldWrap>

          <FieldWrap>
            <span>
              Nome Completo <Asterisk />
            </span>

            <Input
              placeholder="Digite o nome completo"
              disabled={disabled}
              id="name"
              type="text"
              {...register("name")}
              defaultValue={dataCheckBirthDate && dataCheckBirthDate?.name}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              E-mail <Asterisk />
            </span>

            <Input
              placeholder="Digite o e-mail"
              disabled={
                disabled || !!(dataCheckBirthDate && dataCheckBirthDate?.email)
              }
              type="email"
              id="email"
              {...register("email")}
              defaultValue={dataCheckBirthDate && dataCheckBirthDate?.email}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Data de Nascimento <Asterisk />
            </span>

            <Input
              placeholder="Digite a data de nascimento"
              disabled={
                birthDateDisabled ||
                !!(dataCheckBirthDate && dataCheckBirthDate?.bornDate)
              }
              id="bornDate"
              type="date"
              onInput={(event: FormEvent<HTMLInputElement>) => {
                event.currentTarget.value = event?.currentTarget?.value || "";
                const pattern =
                  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
                if (
                  dataCheckCpf?.id &&
                  pattern.test(event?.currentTarget?.value)
                )
                  handleCheckByBirthDate({
                    personId: dataCheckCpf.id as string,
                    bornDate: event?.currentTarget?.value,
                  });
              }}
              {...register("bornDate")}
              max="2099-12-31"
              defaultValue={
                dataCheckBirthDate &&
                dataCheckBirthDate?.bornDate &&
                dateMask(dataCheckBirthDate?.bornDate)
              }
              maxLength={10}
            />
            {errors.bornDate && (
              <p className="error">{errors.bornDate.message}</p>
            )}
            {birthDateFeedback && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#707070",
                  width: "100%",
                  padding: "6px 0",
                }}
              >
                <b
                  style={{
                    fontSize: "12px",
                    color: "#E92043",
                  }}
                >
                  Data de nascimento incorreta.
                </b>{" "}
                Abra um novo chamado em{" "}
                <a
                  href={`${window.location.origin}/canal-de-atendimento?incorrectBornDate=${dataCheckCpf?.cpf}`}
                  target="_blank"
                  style={{
                    fontSize: "12px",
                    color: "#E92043",
                    fontWeight: 600,
                  }}
                  rel="noreferrer"
                >
                  Canal de Atendimento
                </a>{" "}
                e faça o upload de um documento oficial com foto.
              </p>
            )}
          </FieldWrap>

          <Text fontWeight="bold" color="text.fourth" letterSpacing="0.5px">
            Dados complementares
          </Text>

          <FieldWrap>
            <span>Categoria</span>

            <Box display="flex" gap="10px">
              <ReactSelect
                isDisabled={disabled}
                isLoading={loadingSectors}
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                {...register?.("sector")}
                isSearchable={true}
                placeholder="Selecione"
                noOptionsMessage={() => "Não há categoria cadastrada"}
                options={dataSectors
                  ?.filter(
                    (sector) => sector?.nameFormatted !== "NAO INFORMADO",
                  )
                  ?.map((sector) => ({
                    label: sector?.name,
                    value: sector?.id,
                  }))}
                onChange={(option) => {
                  setValue("sector", option?.value.toString() || "");
                  setValue("occupation", "");
                  setSector(option);
                  setOcuppationSelected(null);
                }}
                name="sector"
                id="sector"
              />

              {!disabled && (
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
              )}
            </Box>
          </FieldWrap>

          <FieldWrap>
            <span>Subcategoria</span>

            <Box display="flex" gap="10px">
              <ReactSelect
                noOptionsMessage={() => "Não há Subcategoria cadastrada"}
                isDisabled={disabled || !sector || isLoadingPositions}
                isLoading={isLoadingPositions}
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                {...register?.("occupation")}
                value={occupationSelected}
                isSearchable={true}
                placeholder={
                  !sector
                    ? "Selecione uma categoria"
                    : positions?.filter(
                        (position) =>
                          position?.nameFormatted !== "NAO INFORMADO",
                      )?.length < 1
                    ? "Não há Subcategorias cadastradas"
                    : "Selecione"
                }
                options={positions
                  ?.filter(
                    (position) => position?.nameFormatted !== "NAO INFORMADO",
                  )
                  ?.map((position) => ({
                    label: position?.name,
                    value: position?.id,
                  }))}
                onChange={(option) => {
                  setValue("occupation", option?.value.toString() || "");
                  setOcuppationSelected(option);
                }}
                name="occupation"
                id="occupation"
              />

              {sector !== null && !disabled && (
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
            </Box>
          </FieldWrap>
          <FieldWrap>
            <span>Matrícula</span>
            <Input
              placeholder="Digite a matrícula"
              disabled={disabled}
              id="registration"
              {...register("registration")}
              maxLength={40}
            />
          </FieldWrap>

          <FieldWrap>
            <span>Sexo</span>
            <ReactSelect
              isDisabled={disabled}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("sex")}
              isSearchable={true}
              placeholder="Selecione"
              options={Object.keys(SEX_IDENTITY).map((key) => ({
                value: key,
                label: SEX_IDENTITY[key],
              }))}
              onChange={(option) => {
                setValue("sex", option?.value.toString() || "");
                setSexValue(option);
              }}
              name="sex"
              id="sex"
              value={sexValue}
            />
          </FieldWrap>

          <FieldWrap>
            <span>Número do Celular</span>

            <Input
              placeholder="Digite o número do celular"
              type="text"
              id="phone"
              disabled={disabled}
              onInput={(event: FormEvent<HTMLInputElement>) => {
                event.currentTarget.value = cellphoneMask(
                  event.currentTarget.value,
                );
              }}
              {...register("phone")}
              maxLength={15}
              defaultValue={
                dataCheckBirthDate &&
                dataCheckBirthDate?.phoneNumber &&
                cellphoneMask(dataCheckBirthDate?.phoneNumber)
              }
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>Data de Admissão</span>

            <Input
              placeholder="Digite a data de admissão"
              disabled={disabled}
              id="contractDate"
              type="date"
              onInput={(event: FormEvent<HTMLInputElement>) => {
                event.currentTarget.value = event.currentTarget.value || "";
              }}
              {...register("contractDate")}
              max="2099-12-31"
              maxLength={10}
            />
            {(errors.contractDate || isDateHigher) && (
              <p className="error">
                {isDateHigher
                  ? "A data de Admissão não pode ser menor que a data de Nascimento"
                  : errors?.contractDate?.message}
              </p>
            )}
          </FieldWrap>

          <FieldWrap>
            <span>Tipo de Vínculo</span>
            <ReactSelect
              isDisabled={disabled}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("typeContract")}
              isSearchable={true}
              placeholder="Selecione"
              options={Object.keys(BENEFICIARY_EMPLOYMENT_RELATIONSHIP).map(
                (key) => ({
                  value: key,
                  label: BENEFICIARY_EMPLOYMENT_RELATIONSHIP[key],
                }),
              )}
              onChange={(option) => {
                setValue("typeContract", option?.value.toString() || "");
              }}
              name="typeContract"
              id="typeContract"
            />
          </FieldWrap>

          <FieldWrap>
            <span>Estado Civil</span>
            <ReactSelect
              className="select-fields large"
              isDisabled={disabled}
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("estado_civil")}
              isSearchable={true}
              placeholder="Selecione"
              options={Object.keys(PERSON_MARITAL_STATUS).map((key) => ({
                value: key,
                label: PERSON_MARITAL_STATUS[key],
              }))}
              onChange={(option) => {
                setValue("estado_civil", option?.value.toString() || "");
                setMaritalStatusValue(option);
              }}
              name="estado_civil"
              id="estado_civil"
              value={maritalStatusValue}
            />
          </FieldWrap>

          <FieldWrap>
            <span>Nome da Mãe</span>

            <Input
              placeholder="Digite o nome completo"
              disabled={disabled}
              type="text"
              id="nomeMae"
              {...register("nomeMae")}
              maxLength={120}
              defaultValue={
                dataCheckBirthDate && dataCheckBirthDate?.nameMother
              }
            />
            {errors.nomeMae && (
              <p className="error">{errors.nomeMae.message}</p>
            )}
          </FieldWrap>

          <FieldWrap>
            <span>CEP</span>

            <Flex position="relative" alignItems="center">
              <Box w="100%">
                <Input
                  placeholder="00000-000"
                  disabled={disabled}
                  type="text"
                  id="cep"
                  onInput={(event: FormEvent<HTMLInputElement>) => {
                    event.currentTarget.value = cepMask(
                      event.currentTarget.value,
                    );
                    handleCep(onlyNumberMask(event?.currentTarget?.value));
                  }}
                  {...register("cep")}
                  maxLength={10}
                  defaultValue={
                    dataCheckBirthDate &&
                    dataCheckBirthDate?.personAddress?.[0]?.cep
                  }
                />
                {errors.cep && <p className="error">{errors.cep.message}</p>}
              </Box>

              {isLoadingCep && (
                <Spinner
                  position="absolute"
                  right="10px"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  size="md"
                  color="brand.500"
                />
              )}
            </Flex>
          </FieldWrap>

          <FieldWrap>
            <span>Endereço</span>

            <Input
              placeholder="Digite o endereço"
              disabled={disabled}
              type="text"
              id="endereco"
              {...register("endereco")}
              maxLength={120}
              defaultValue={
                dataCheckBirthDate &&
                dataCheckBirthDate?.personAddress?.[0]?.publicPlace
              }
            />
            {errors.endereco && (
              <p className="error">{errors.endereco.message}</p>
            )}
          </FieldWrap>

          <FieldWrap>
            <span>Número</span>

            <Input
              type="number"
              placeholder="Digite o número"
              id="numero"
              disabled={disabled}
              {...register("numero")}
              minLength={1}
              defaultValue={
                dataCheckBirthDate &&
                dataCheckBirthDate?.personAddress?.[0]?.number
              }
            />
            {errors.numero && <p className="error">{errors.numero.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>Complemento</span>

            <Input
              placeholder="Apartamento, sala, conjunto, edifício, andar, etc."
              disabled={disabled}
              id="complemento"
              type="text"
              {...register("complemento")}
              maxLength={120}
              defaultValue={
                dataCheckBirthDate &&
                dataCheckBirthDate?.personAddress?.[0]?.complement
              }
            />
            {errors.complemento && (
              <p className="error">{errors.complemento.message}</p>
            )}
          </FieldWrap>

          <FieldWrap>
            <span>Bairro</span>

            <Input
              placeholder="Digite o bairro"
              disabled={disabled}
              id="bairroEndereco"
              type="text"
              maxLength={120}
              defaultValue={
                dataCheckBirthDate &&
                dataCheckBirthDate?.personAddress?.[0]?.neighborhood
              }
              {...register("bairroEndereco")}
            />
            {errors.bairroEndereco && (
              <p className="error">{errors.bairroEndereco.message}</p>
            )}
          </FieldWrap>

          <FieldWrap>
            <span>Estado</span>
            <ReactSelect
              className="select-fields large"
              isDisabled={disabled}
              menuPlacement="top"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register("codIbgeUf")}
              isSearchable={true}
              placeholder="Selecione"
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
              value={ufHolder}
              onChange={(option) => {
                setValue("codIbgeUf", option?.value.toString() || "");
                setValue("uf", option?.label.toString() || "");
                setUfHolder(option);
                setCityHolder(null);
              }}
              id="codIbgeUf"
              name="codIbgeUf"
            />
          </FieldWrap>

          <FieldWrap>
            <span>Município</span>
            <ReactSelect
              className="select-fields large"
              id="codIbgeCity"
              isDisabled={disabled || !ufHolder}
              {...register("codIbgeCity")}
              classNamePrefix="select"
              menuPlacement="top"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder={ufHolder ? "Selecione" : "Selecione um Estado"}
              options={cities
                .filter(
                  (element) =>
                    element.unidade_federativa?.codIbgeUF === ufHolder?.value,
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
                setValue("codIbgeCity", option?.value.toString() || "");
                setValue("city", option?.label.toString() || "");
                setCityHolder(option);
              }}
              value={cityHolder}
              noOptionsMessage={() =>
                ufHolder
                  ? "Não há opções para selecionar"
                  : "Selecione um Estado"
              }
              name="codIbgeCity"
            />
          </FieldWrap>

          <Flex justifyContent="flex-end" gap="15px">
            {isComplete && (
              <Button
                isDisabled={
                  isLoading || isDateHigher || disabled || isBornDateHigher
                }
                variant="outline"
                isLoading={isLoading}
                type="submit"
                onClick={() => setAddProduct(true)}
              >
                Cadastrar e adicionar produtos
              </Button>
            )}

            <Button
              isDisabled={
                isLoading || isDateHigher || disabled || isBornDateHigher
              }
              isLoading={isLoading}
              type="submit"
              onClick={() => setAddProduct(false)}
            >
              Cadastrar
            </Button>
          </Flex>
        </Box>
      </form>

      <ModalSector
        handleOpen={(arg) => {
          setModalState({
            ...modalState,
            sector: arg,
          });
        }}
        isOpen={modalState.sector}
      />

      {sector !== null && (
        <ModalOccupation
          companyId={companyId}
          sectorId={sector.value.toString()}
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

export default ModalRecordCollaborator;
