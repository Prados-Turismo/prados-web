/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { useGlobal } from "../../../../contexts/UserContext";
import SelectForm from "../../../../components/SelectForm";
import FormInputNumber from "../../../../components/FormInputNumber";
import useFormaPagamento from "../../../../hooks/useFormaPagamento";
import useContaBancaria from "../../../../hooks/useContaBancaria";
import useUsuario from "../../../../hooks/useUsuarios";
import SelectAsyncPaginate from "../../../../components/SelectAsyncPaginate";
import useComissao from "../../../../hooks/useComissao";
import { formattingDate } from "../../../../utils/formattingDate";

const handleSubmitRegisterSchema = z.object({
  valor: z
    .number({
      required_error: fieldRequired("valor")
    }),
  codigoContaBancaria: z
    .string({
      required_error: fieldRequired("Conta Bancária")
    }),
  usuariosId: z
    .string({
      required_error: fieldRequired('Categoria')
    }),
  codigoFormaPagamento: z
    .string({
      required_error: fieldRequired("forma de pagamento")
    }),
  dataInicio: z
    .string({
      required_error: fieldRequired("Data Inicio")
    }),
  dataFim: z
    .string({
      required_error: fieldRequired("Data Fim")
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordTransacao {
  handleClose: () => void;
}

const ModalRegisterTransacao = ({
  handleClose,
}: IModalRecordTransacao) => {
  const { user } = useGlobal();
  const { createComissao } = useComissao();
  const { getAllFormaPagamentos } = useFormaPagamento();
  const { getAllContaBancaria } = useContaBancaria()
  const { usuarioPromiseOptions } = useUsuario()

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });

  const { mutate, isLoading } = createComissao(reset, handleClose);
  const { data: dataFormaPagamentos, isLoading: loadingFormaPagamentos } = getAllFormaPagamentos();
  const { data: dataContaBancaria, isLoading: isLoadingContaBancaria } = getAllContaBancaria();

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    mutate({
      ...data,
      periodo: `de ${formattingDate(data.dataInicio)} à ${formattingDate(data.dataFim)}`,
      userId: user?.id
    })
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRegister)}
      style={{ width: "100%" }}
    >
      <Box display="flex" flexDirection="column" gap="25px" padding="30px">
        <span>
          (<Asterisk />) indica os campos obrigatórios
        </span>


        <SelectAsyncPaginate
          name="usuariosId"
          placeholder="Selecione"
          label="Vendedor"
          minW="200px"
          isSearchable
          isRequired
          noOptionsMessage="Nenhum usuário encontrado"
          promiseOptions={usuarioPromiseOptions}
          handleChange={(option) => {
            setValue("usuariosId", option?.value);
          }}
          errors={errors.usuariosId}
        />


        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FormInputNumber
            height="40px"
            label="Valor"
            minWidth="200px"
            {...register("valor")}
            setValue={setValue}
            isMoneyValue
            flex="1.01"
            name="valor"
            maxLength={25}
            isRequired
            dontAllowNegative
            errors={errors.valor}
          />

          <SelectForm
            name="codigoFormaPagamento"
            label="Forma de Pagamento"
            minW="135px"
            isRequired
            isLoading={loadingFormaPagamentos}
            handleChange={(option) => {
              setValue("codigoFormaPagamento", option?.value);
            }}
            options={dataFormaPagamentos
              ?.map((codigoFormaPagamento) => ({
                label: codigoFormaPagamento?.nome,
                value: codigoFormaPagamento?.id,
              }))}
            errors={errors.codigoFormaPagamento}
          />
        </Flex>

        <SelectForm
          name="codigoContaBancaria"
          label="Conta Bancária"
          isRequired
          isLoading={isLoadingContaBancaria}
          handleChange={(option) => {
            setValue("codigoContaBancaria", option?.value);
          }}
          options={dataContaBancaria
            ?.map((codigoContaBancaria) => ({
              label: codigoContaBancaria?.nome,
              value: codigoContaBancaria?.id,
            }))}
          errors={errors.codigoContaBancaria}
        />

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}>

          <FormControl
            isInvalid={errors.dataInicio?.message ? true : false}
          >
            <FormLabel>Data Inicio <Asterisk /></FormLabel>
            <Input
              type="date"
              isRequired
              maxWidth="250px"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              {...register("dataInicio")}
            />
            <FormErrorMessage>{errors.dataInicio?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.dataFim?.message ? true : false}
          >
            <FormLabel>Data Fim <Asterisk /></FormLabel>
            <Input
              type="date"
              isRequired
              maxWidth="250px"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              {...register("dataFim")}
            />
            <FormErrorMessage>{errors.dataFim?.message}</FormErrorMessage>
          </FormControl>

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

export default ModalRegisterTransacao;
