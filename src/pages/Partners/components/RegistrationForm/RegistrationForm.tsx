import {
  Input,
  Button,
  Select,
  FormControl,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cnpjMask, cpfMask, onlyNumberMask } from "../../../../utils";
import { optionsPreferenceContact } from "../../../../utils/optionsPreferenceContact";
import { handleSubmitRegisterSchema } from "../../utils/handleSubmitRegisterSchema";

// Styles
import { ModalContent, Form, FormLabel } from "./styled";
import usePartner from "../../../../hooks/usePartner";
import useCollaborator from "../../../../hooks/useCollaborator";
import { cpfIso } from "../../../../components/ProductAdhesion/utils/cpf.mask";
import { cellphoneMask } from "../../../../utils/fieldMask";

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

const RegistrationForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { checkByCpf } = useCollaborator();
  const { checkByCnpj, createPartnership } = usePartner();
  const [ísDisabled, setIsDisabled] = useState(true);
  const [isDisabledCpf, setIsDisabledCpf] = useState(true);

  const { mutate: mutateCheckCpf, isLoading: isLoadingCheckCpf } =
    checkByCpf(setIsDisabledCpf);

  const { mutate: mutateCreate, isLoading: isLoadingCreate } =
    createPartnership(setShowModal);

  const {
    mutate: mutateCheckCnpj,
    isLoading: isLoadingCheckCnpj,
    corporate,
  } = checkByCnpj(setIsDisabled);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });

  const handleSubmitRegister = ({
    cpf,
    name,
    phone,
    email,
    preference,
  }: IhandleSubmitRegister) => {
    if (corporate) {
      mutateCreate({
        id: corporate?.id,
        name,
        email,
        cpf: onlyNumberMask(cpf),
        phone: onlyNumberMask(phone),
        preference,
      });
    }
  };

  const handleCheckCpf = (cpf: string) => {
    mutateCheckCpf({ cpf: cpf });
  };

  const handleCheckCnpj = (cnpj: string) => {
    mutateCheckCnpj({ cnpj: cnpj });
  };

  return (
    <ModalContent>
      <span className="title">Pré-cadastro</span>

      <div className="details">
        <div className="subtitle">
          (<span>*</span>) indica os campos obrigatórios
        </div>

        <div className="detailsForm">
          <Form onSubmit={handleSubmit(handleSubmitRegister)}>
            <div className="fieldsWrap">
              <div className="field">
                <Flex position="relative" alignItems="center">
                  <FormControl isRequired>
                    <FormLabel>CNPJ</FormLabel>
                    <Input
                      placeholder="Digite o CNPJ da empresa"
                      type="text"
                      onInput={(event: FormEvent<HTMLInputElement>) => {
                        event.currentTarget.value = cnpjMask(
                          event.currentTarget.value,
                        );

                        if (event.currentTarget.value.length === 18) {
                          handleCheckCnpj(event.currentTarget.value);
                        } else {
                          setIsDisabledCpf(true);
                        }
                      }}
                      {...register("cnpj")}
                    />
                    {errors.cnpj && (
                      <p className="error">{errors.cnpj.message}</p>
                    )}
                  </FormControl>

                  {isLoadingCheckCnpj && (
                    <Spinner
                      position="absolute"
                      right="10px"
                      bottom="9px"
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      size="md"
                      color="brand.500"
                    />
                  )}
                </Flex>
              </div>
              {corporate && (
                <div className="field">
                  <FormControl>
                    <FormLabel>Razão Social</FormLabel>
                    <Input
                      variant="flushed"
                      value={corporate?.corporateName || ""}
                      isReadOnly
                      type="text"
                    />
                  </FormControl>
                </div>
              )}

              <div className="field">
                <Flex position="relative" alignItems="center">
                  <FormControl isRequired>
                    <FormLabel>CPF do responsável</FormLabel>
                    <Input
                      isDisabled={ísDisabled}
                      placeholder="Digite o CPF do responsável"
                      type="text"
                      onInput={(event: FormEvent<HTMLInputElement>) => {
                        event.currentTarget.value = cpfMask(
                          event.currentTarget.value,
                        );
                        if (cpfIso(event.currentTarget.value).length === 11) {
                          handleCheckCpf(cpfIso(event.currentTarget.value));
                        } else {
                          setIsDisabledCpf(true);
                        }
                      }}
                      {...register("cpf")}
                    />
                  </FormControl>

                  {isLoadingCheckCpf && (
                    <Spinner
                      position="absolute"
                      right="10px"
                      bottom="9px"
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      size="md"
                      color="brand.500"
                    />
                  )}
                </Flex>
              </div>

              <div className="field">
                <FormControl isRequired>
                  <FormLabel>Nome do responsável</FormLabel>
                  <Input
                    isDisabled={ísDisabled || isDisabledCpf}
                    placeholder="Digite o nome de contato"
                    type="text"
                    {...register("name")}
                    maxLength={120}
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message}</p>
                  )}
                </FormControl>
              </div>

              <div className="field">
                <FormControl isRequired>
                  <FormLabel>Telefone celular para contato</FormLabel>
                  <Input
                    isDisabled={ísDisabled || isDisabledCpf}
                    placeholder="Digite o telefone para contato"
                    type="text"
                    onInput={(event: FormEvent<HTMLInputElement>) => {
                      event.currentTarget.value = cellphoneMask(
                        event.currentTarget.value,
                      );
                    }}
                    maxLength={15}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="error">{errors.phone.message}</p>
                  )}
                </FormControl>
              </div>

              <div className="field">
                <FormControl isRequired>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    isDisabled={ísDisabled || isDisabledCpf}
                    placeholder="Digite o e-mail do contato"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </FormControl>
              </div>

              <div className="field">
                <FormControl isRequired>
                  <FormLabel>Preferência de contato</FormLabel>
                  <Select
                    isDisabled={ísDisabled || isDisabledCpf}
                    placeholder="Selecione"
                    {...register("preference")}
                  >
                    {optionsPreferenceContact.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {errors.preference && (
                    <p className="error">{errors.preference.message}</p>
                  )}
                </FormControl>
              </div>
            </div>

            <div className="buttonBox">
              <Button
                isLoading={isLoadingCreate}
                isDisabled={ísDisabled || isDisabledCpf}
                type="submit"
              >
                Confirmar cadastro
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </ModalContent>
  );
};

export default RegistrationForm;
