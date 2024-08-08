/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useFormaPagamento from "../../../../hooks/useFormaPagamento";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import SelectForm from "../../../../components/SelectForm";
import { IFormaPagamento } from "../../../../models/forma-pagamento.model";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  taxa: z
    .number()
    .min(0, {
      message: fieldRequired('taxa')
    }),
  taxa2x: z
    .number(),
  taxa3x: z
    .number(),
  taxa4x: z
    .number(),
  taxa5x: z
    .number(),
  taxa6x: z
    .number(),
  taxa7x: z
    .number(),
  taxa8x: z
    .number(),
  taxa9x: z
    .number(),
  taxa10x: z
    .number(),
  taxa11x: z
    .number(),
  taxa12x: z
    .number(),
  ativo: z
    .boolean()
    .refine(value => value != undefined, {
      message: fieldRequired('ativo')
    }),
  qtdDiasRecebimento: z
    .number()
    .min(1, {
      message: fieldRequired('qtdDiasRecebimento')
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalUpdateFormaPagamento {
  handleClose: () => void
  data: IFormaPagamento
}

const ModalUpdateContaBancaria = ({
  handleClose,
  data
}: IModalUpdateFormaPagamento) => {
  const { user } = useGlobal();
  const { updateFormaPagamento } = useFormaPagamento();

  const {
    getValues,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      nome: data.nome,
      taxa: data.taxa,
      taxa2x: data.taxa2x,
      taxa3x: data.taxa3x,
      taxa4x: data.taxa4x,
      taxa5x: data.taxa5x,
      taxa6x: data.taxa6x,
      taxa7x: data.taxa7x,
      taxa8x: data.taxa8x,
      taxa9x: data.taxa9x,
      taxa10x: data.taxa10x,
      taxa11x: data.taxa11x,
      taxa12x: data.taxa12x,
      qtdDiasRecebimento: data.qtdDiasRecebimento,
      ativo: data.ativo
    }
  });
  const { mutate, isLoading } = updateFormaPagamento(reset, handleClose);

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      id: data.id,
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
            label="Nº dias para recebimento"
            minWidth="200px"
            {...register("qtdDiasRecebimento")}
            setValue={setValue}
            value={getValues("qtdDiasRecebimento")}
            flex="1.01"
            name="qtdDiasRecebimento"
            maxLength={25}
            isRequired
            dontAllowNegative
            errors={errors.qtdDiasRecebimento}
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
            defaultValue={{
              label: data.ativo ? 'Ativo' : 'Inativo',
              value: data.ativo
            }}
          />
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}>

          <FormInputNumber
            value={getValues('taxa')}
            label="Taxa"
            {...register("taxa")}
            setValue={setValue}
            flex="1.01"
            name="taxa"
            maxLength={25}
            isRequired
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa2x')}
            label="Taxa 2x"
            {...register("taxa2x")}
            setValue={setValue}
            flex="1.01"
            name="taxa2x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa3x')}
            label="Taxa 3x"
            {...register("taxa3x")}
            setValue={setValue}
            flex="1.01"
            name="taxa3x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}>

          <FormInputNumber
            value={getValues('taxa4x')}
            label="Taxa 4x"
            {...register("taxa4x")}
            setValue={setValue}
            flex="1.01"
            name="taxa4x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa5x')}
            label="Taxa 5x"
            {...register("taxa5x")}
            setValue={setValue}
            flex="1.01"
            name="taxa5x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa6x')}
            label="Taxa 6x"
            {...register("taxa6x")}
            setValue={setValue}
            flex="1.01"
            name="taxa6x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}>

          <FormInputNumber
            value={getValues('taxa7x')}
            label="Taxa 7x"
            {...register("taxa7x")}
            setValue={setValue}
            flex="1.01"
            name="taxa7x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa8x')}
            label="Taxa 8x"
            {...register("taxa8x")}
            setValue={setValue}
            flex="1.01"
            name="taxa8x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa9x')}
            label="Taxa 9x"
            {...register("taxa9x")}
            setValue={setValue}
            flex="1.01"
            name="taxa9x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}>

          <FormInputNumber
            value={getValues('taxa10x')}
            label="Taxa 10x"
            {...register("taxa10x")}
            setValue={setValue}
            flex="1.01"
            name="taxa10x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa11x')}
            label="Taxa 11x"
            {...register("taxa11x")}
            setValue={setValue}
            flex="1.01"
            name="taxa11x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
          />

          <FormInputNumber
            value={getValues('taxa12x')}
            label="Taxa 12x"
            {...register("taxa12x")}
            setValue={setValue}
            flex="1.01"
            name="taxa12x"
            maxLength={25}
            dontAllowNegative
            errors={errors.taxa}
            prefix="percentual"
            minWidth="90px"
            maxWidth="33%"
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
            Salvar
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default ModalUpdateContaBancaria;
