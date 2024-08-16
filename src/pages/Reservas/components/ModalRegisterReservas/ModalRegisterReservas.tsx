/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useReservas from "../../../../hooks/useReservas";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import SelectForm from "../../../../components/SelectForm";
import useExcursoes from "../../../../hooks/useExcursao";
import { FormEvent } from "react";
import { cpfMask } from "../../../../utils";
import usePessoas from "../../../../hooks/usePessoas";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  saldo: z
    .number()
    .min(0, {
      message: fieldRequired('saldo')
    }),
  ativo: z
    .boolean()
    .refine(value => value != undefined, {
      message: fieldRequired('ativo')
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterReserva {
  handleClose: () => void;
}

const ModalRegisterContabancaria = ({
  handleClose,
}: IModalRegisterReserva) => {
  const { user } = useGlobal();
  const { createReserva } = useReservas();
  const { getExcursoes } = useExcursoes()
  const { getAllPessoas } = usePessoas()

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createReserva(reset, handleClose);
  const { data: dataExcursoes, isLoading: loadingExcursoes } = getExcursoes({ page: 1, size: 100 });


  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      usuarioCadastro: user?.id
    })
  };

  const cpfMasked = (event: FormEvent<HTMLInputElement>) => {

    event.currentTarget.value = cpfMask(
      event.currentTarget.value,
    );

    /*
        if (cellphoneValidation(event.currentTarget.value)) {
          setErrorPhone(false);
        } else {
          setErrorPhone(true);
        }
          */
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRegister)}
      style={{ width: "100%" }}
    >
      <Box display="flex" flexDirection="column" gap="25px" padding="30px">
        <span>
          (<Asterisk />) indica os campos obrigatórios
        </span>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FieldWrap>
            <span>
              CPF <Asterisk />
            </span>
            <Input
              placeholder="Digite o cpf"
              id="cpf"
              type="text"
              onInput={cpfMasked}
              onBlur={() => {
              }}
            />
          </FieldWrap>

          <FieldWrap>
            <span>
              Passageiro <Asterisk />
            </span>

            <Input
              placeholder="Digite CPF ou Nome"
              id="nome"
              type="text"
              readOnly={true}
              minWidth="300px"
            />
          </FieldWrap>
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FormInputNumber
            height="40px"
            label="Saldo"
            minWidth="200px"
            {...register("saldo")}
            setValue={setValue}
            isMoneyValue
            flex="1.01"
            name="saldo"
            maxLength={25}
            isRequired
            dontAllowNegative
            errors={errors.saldo}
          />

          <SelectForm
            name="ativo"
            label="Excursão"
            isRequired
            handleChange={(option) => {
              setValue("ativo", option?.value);
            }}
            options={dataExcursoes
              ?.map((Excursao) => ({
                label: Excursao?.nome,
                value: Excursao?.id,
              }))}
            errors={errors.ativo}
          />
        </Flex>

        <Flex justifyContent="flex-end" gap="15px">
          <Button
            isDisabled={
              isLoading
            }
            isLoading={isLoading}
            type="submit"
          >
            Cadastrar
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default ModalRegisterContabancaria;
