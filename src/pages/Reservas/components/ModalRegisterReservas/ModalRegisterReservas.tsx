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

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      usuarioCadastro: user?.id
    })
  };

  const dataAtivo = [
    {
      id: true,
      nome: "Ativo"
    },
    {
      id: false,
      nome: "Inativo"
    }
  ]

  return (
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
            Nome <Asterisk />
          </span>

          <Input
            placeholder="Digite o nome"
            id="nome"
            type="text"
            {...register("nome")}
          />
          {errors.nome && <p className="error">{errors.nome.message}</p>}
        </FieldWrap>

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
            label="Status"
            isRequired
            handleChange={(option) => {
              setValue("ativo", option?.value);
            }}
            options={dataAtivo
              ?.map((ativo) => ({
                label: ativo?.nome,
                value: ativo?.id,
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
