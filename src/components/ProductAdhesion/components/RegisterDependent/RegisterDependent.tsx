import React, { ChangeEvent, useEffect, useState } from "react";
import { cpfIso, cpfMask } from "../../utils/cpf.mask";
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Box,
  Spinner,
  Button,
  Flex,
} from "@chakra-ui/react";

import { phoneIso, phoneMask } from "../../utils/phone.mask";
import { useMaskedState } from "../../utils/use-masked-state";
import { handleEnter } from "../../utils/nextInputEnter";
import ReactSelect from "react-select";
import {
  BENEFICIARY_KINSHIP,
  PERSON_MARITAL_STATUS,
  SEX_IDENTITY,
} from "../../../../utils/enumFormat";
import useCollaborator from "../../../../hooks/useCollaborator";
import { onlyNumberMask } from "../../../../utils";
import { cellphoneValidation } from "../../../../utils/fieldMask";
import {
  IBeneficiaryCheckResponse,
  ILinkBeneficiaryDependantDTO,
} from "../../../../models/collaborator.model";
import { useGlobal } from "../../../../contexts/UserContext";

interface PropsLike {
  holderId: string;
  setIndex?: (value: React.SetStateAction<number>) => void;
  maxHeight?: string;
  handleCloseModal?: () => void;
}

const RegisterDependent = ({
  holderId,
  setIndex,
  maxHeight = "550px",
  handleCloseModal,
}: PropsLike) => {
  const { company } = useGlobal();
  const { checkByCpf, createDependent, checkBirthDate, linkDependant } =
    useCollaborator();
  const { mutate, isLoading } = createDependent(
    holderId,
    setIndex,
    handleCloseModal,
  );
  const [emailError, setEmailError] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [cpfData, setCpfData] = useState<{
    id?: string;
    cpf: string;
  }>();
  const [bornDateData, setBornDateData] = useState(
    {} as IBeneficiaryCheckResponse,
  );
  const [bornDateDisabled, setBornDateDisabled] = useState(true);
  const [cpfFeedback, setCpfFeedback] = useState(false);
  const [bornDateFeedback, setBornDateFeedback] = useState(false);

  const { mutate: mutateCheckCpf, isLoading: isLoadingCheckCpf } = checkByCpf(
    setDisabled,
    setCpfData,
    setBornDateDisabled,
    setCpfFeedback,
  );
  const initialState = {
    cpf: "",
    nomePessoaFisica: "",
    dataNascimento: "",
    email: "",
    sexo: "",
    estado_civil: "",
    celular: "",
    nomeMae: "",
    parentesco: "",
  };
  const [form, setForm] = useState(initialState);
  const [cpf, setCpf] = useMaskedState(cpfMask, "");
  const [phoneError, setPhoneError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [genderSelected, setGenderSelected] = useState<{
    label: string;
    value: string;
  }>();
  const [matrialStatusSelected, setMatrialStatusSelectedSelected] = useState<{
    label: string;
    value: string;
  }>();

  const emailValidation = (email: string) => {
    if (!email) {
      setEmailError(true);
      return true;
    }
    const regex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      setEmailError(false);
      return false;
    } else {
      setEmailError(true);
      return true;
    }
  };

  const handleCheckCpf = (cpf: string) => {
    mutateCheckCpf({ cpf: cpf, holderId });
  };

  const { mutate: mutateCheckBirthDate } = checkBirthDate(
    setDisabled,
    setBornDateData,
    setBornDateFeedback,
    setCpfFeedback,
    setBornDateDisabled,
  );

  const { mutate: mutateLinkDependant } = linkDependant(handleCloseModal);

  const handleSubmitRegister = () => {
    const payload: ILinkBeneficiaryDependantDTO = {
      cpf: form?.cpf,
      name: form?.nomePessoaFisica,
      bornDate: form?.dataNascimento,
      phoneNumber: onlyNumberMask(form?.celular),
      email: form?.email.length < 1 ? null : form?.email,
      sexIdentity: form?.sexo,
      beneficiaryKinship: form?.parentesco,
      beneficiaryType: "dependent",
      personMaritalStatus: form?.estado_civil,
      nameMother: form?.nomeMae,
    };
    if (cpfData?.id) {
      Object.assign(payload, {
        companyId: company?.externalCompanyId,
        holderId,
        personId: cpfData.id,
      });

      mutateLinkDependant(payload);
      return;
    }

    mutate(payload);
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

  const handleInputData = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      dataNascimento: event.target.value,
    }));
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const dateAmericaFormat = event.target.value;

    if (cpfData?.id && pattern.test(dateAmericaFormat)) {
      handleCheckByBirthDate({
        personId: cpfData.id as string,
        bornDate: dateAmericaFormat,
      });
    }
  };

  useEffect(() => {
    setForm((state) => ({ ...state, cpf: cpfIso(cpf as string) }));
  }, [cpf]);

  useEffect(() => {
    bornDateData.phoneNumber && setPhoneError(false);
    bornDateData.personMaritalStatus &&
      setMatrialStatusSelectedSelected({
        label: PERSON_MARITAL_STATUS[bornDateData.personMaritalStatus],
        value: bornDateData.personMaritalStatus,
      });
    bornDateData.sexIdentity &&
      setGenderSelected({
        label: SEX_IDENTITY[bornDateData.sexIdentity],
        value: bornDateData.sexIdentity,
      });
    setForm((prev) => ({
      ...prev,
      celular: bornDateData.phoneNumber && phoneIso(bornDateData.phoneNumber),
      email: bornDateData.email,
      estado_civil: bornDateData.personMaritalStatus,
      nomeMae: bornDateData.nameMother,
      nomePessoaFisica: bornDateData.name,
      sexo: bornDateData.sexIdentity,
    }));
  }, [bornDateData]);

  return (
    <Box maxHeight={maxHeight}>
      <Flex flexDirection="column" gap="15px">
        <Box fontSize="15px" color="#E53E3E" textAlign="left">
          (*) indica os campos obrigatórios
        </Box>
        <FormControl isRequired position="relative">
          <FormLabel htmlFor="cpf">CPF</FormLabel>
          <Input
            name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={({ target: { value } }) => {
              setForm(initialState);
              if (cpfIso(value).length === 11) {
                handleCheckCpf(cpfIso(value));
                setForm(initialState);
              } else {
                setDisabled(true);
                setBornDateDisabled(true);
              }
              setCpf(value);
            }}
            onKeyDown={handleEnter}
            maxLength={14}
          />
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
          {isLoadingCheckCpf && (
            <Spinner
              position="absolute"
              bottom="8px"
              right="10px"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              size="md"
              color="brand.500"
            />
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="nomePessoaFisica">Nome completo</FormLabel>
          <Input
            isDisabled={disabled}
            name="nomePessoaFisica"
            placeholder="Nome completo"
            value={form.nomePessoaFisica}
            onChange={({ target: { value } }) =>
              setForm((prev) => ({ ...prev, nomePessoaFisica: value }))
            }
            onKeyDown={handleEnter}
            maxLength={120}
          />
          {form?.nomePessoaFisica?.length > 0 &&
            form?.nomePessoaFisica?.length < 7 && (
              <Text
                color="rgb(229, 62, 62)"
                fontSize="14px"
                textAlign="left"
                alignItems="left"
              >
                O nome deve conter no mínimo 7 e no máximo 120 caracteres
              </Text>
            )}
        </FormControl>
        <Flex gap="15px">
          <FormControl isRequired>
            <FormLabel htmlFor="dataNascimento">Data de Nascimento</FormLabel>
            <Input
              name="dataNascimento"
              type="date"
              isDisabled={bornDateDisabled}
              placeholder="Data de Nascimento"
              value={form.dataNascimento}
              onChange={handleInputData}
              maxLength={10}
            />
            {form.dataNascimento.length > 0 && dateError && (
              <Text
                color="rgb(229, 62, 62)"
                fontSize="14px"
                textAlign="left"
                alignItems="left"
              >
                A data de nascimento não pode ser superior a data atual
              </Text>
            )}
            {bornDateFeedback && (
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
                  href={`${window.location.origin}/canal-de-atendimento?incorrectBornDate=${cpfData?.cpf}`}
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
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="celular">Número do celular</FormLabel>
            <Input
              name="celular"
              isDisabled={disabled}
              placeholder="Número do celular"
              value={phoneMask(form.celular)}
              onChange={({ target: { value } }) => {
                setForm((prev) => ({ ...prev, celular: phoneIso(value) }));
                setPhoneError(!cellphoneValidation(value));
              }}
              onKeyDown={handleEnter}
              maxLength={15}
            />
            {phoneError && (
              <Text
                color="rgb(229, 62, 62)"
                fontSize="14px"
                textAlign="left"
                alignItems="left"
              >
                Informe um número com formato válido (00) 90000-0000
              </Text>
            )}
          </FormControl>
        </Flex>
        <Flex gap="15px">
          <FormControl isRequired>
            <FormLabel htmlFor="sexo">Sexo</FormLabel>
            <ReactSelect
              className="select-fields large"
              classNamePrefix="select"
              isDisabled={disabled}
              value={genderSelected}
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecione"
              options={Object.keys(SEX_IDENTITY).map((key) => ({
                value: key,
                label: SEX_IDENTITY[key],
              }))}
              onChange={(option) => {
                if (option?.label && option.value)
                  setGenderSelected({
                    label: option?.label,
                    value: option?.value,
                  });
                setForm((prev) => ({
                  ...prev,
                  sexo: option?.value || "",
                }));
              }}
              name="sex"
              id="sex"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="parentesco">Grau de Parentesco</FormLabel>
            <ReactSelect
              isDisabled={disabled}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecione"
              options={Object.keys(BENEFICIARY_KINSHIP).map((key) => ({
                value: key,
                label: BENEFICIARY_KINSHIP[key],
              }))}
              onChange={(option) => {
                setForm((prev) => ({
                  ...prev,
                  parentesco: option?.value || "",
                }));
              }}
              name="kinship"
              id="kinship"
            />
          </FormControl>
        </Flex>
        <FormControl isRequired>
          <FormLabel htmlFor="estado_civil">Estado Civil</FormLabel>
          <ReactSelect
            isDisabled={disabled}
            className="select-fields large"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            isSearchable={true}
            value={matrialStatusSelected}
            placeholder="Selecione"
            options={Object.keys(PERSON_MARITAL_STATUS).map((key) => ({
              value: key,
              label: PERSON_MARITAL_STATUS[key],
            }))}
            onChange={(option) => {
              if (option?.label && option.value)
                setMatrialStatusSelectedSelected({
                  label: option?.label,
                  value: option?.value,
                });
              setForm((prev) => ({
                ...prev,
                estado_civil: option?.value || "",
              }));
            }}
            name="marital_status"
            id="marital_status"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="nomeMae">Nome da Mãe</FormLabel>
          <Input
            isDisabled={disabled}
            name="nomeMae"
            placeholder="Nome da Mãe"
            value={form.nomeMae}
            onChange={({ target: { value } }) =>
              setForm((prev) => ({ ...prev, nomeMae: value }))
            }
            onKeyDown={handleEnter}
            maxLength={120}
          />
          {form?.nomeMae?.length > 0 && form?.nomeMae?.length < 7 && (
            <Text
              color="rgb(229, 62, 62)"
              fontSize="14px"
              textAlign="left"
              alignItems="left"
            >
              O nome deve conter no mínimo 7 e no máximo 120 caracteres
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            isDisabled={disabled || !!cpfData?.id}
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={({ target: { value } }) => {
              setForm((prev) => ({ ...prev, email: value }));
              emailValidation(value);
            }}
            onKeyDown={handleEnter}
          />
          {!emailError && !disabled && form.email?.length > 0 && (
            <Text
              color="rgb(229, 62, 62)"
              fontSize="14px"
              textAlign="left"
              alignItems="left"
            >
              Informe um e-mail válido
            </Text>
          )}
        </FormControl>

        <Flex padding="10px 0 20px" justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            w="max-content"
            isDisabled={
              !form.nomePessoaFisica ||
              (form?.nomePessoaFisica?.length > 0 &&
                form?.nomePessoaFisica?.length < 7) ||
              !cpf ||
              !emailError ||
              !form.celular ||
              !form.dataNascimento ||
              form.dataNascimento?.length < 10 ||
              dateError ||
              !form.nomeMae ||
              (form?.nomeMae?.length > 0 && form?.nomeMae?.length < 7) ||
              !form.sexo ||
              !form.parentesco ||
              !form.estado_civil
            }
            type="button"
            onClick={handleSubmitRegister}
            onKeyDown={handleEnter}
            name="submitRegister"
            id="submitRegister"
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RegisterDependent;
