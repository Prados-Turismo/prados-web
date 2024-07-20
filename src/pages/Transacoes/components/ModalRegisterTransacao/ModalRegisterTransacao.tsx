/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useProduct from "../../../../hooks/useProducts";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import useFornecedor from "../../../../hooks/useFornecedor";
import { useGlobal } from "../../../../contexts/UserContext";
import SelectForm from "../../../../components/SelectForm";
import FormInputNumber from "../../../../components/FormInputNumber";
import FormInput from "../../../../components/FormInput";

const handleSubmitRegisterSchema = z.object({
  tipo: z
    .number({
      required_error: fieldRequired("tipo")
    }),
  valor: z
    .number({
      required_error: fieldRequired("valor")
    }),
  numeroComprovanteBancario: z
    .string({
      required_error: fieldRequired("número do comprovante bancário")
    }),
  passageiro: z
    .string()
    .optional(),
  fornecedor: z
    .string()
    .optional(),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  handleClose: () => void;
}

const ModalRegisterTransacao = ({
  handleClose,
}: IModalRecordCollaborator) => {
  const { user } = useGlobal();
  const { createProduct } = useProduct();
  const { getAllFornecedores } = useFornecedor();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createProduct(reset, handleClose);
  const { data: dataFornecedores, isLoading: loadingFornecedores } = getAllFornecedores();

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    mutate({
      ...data,
      ativo: true,
      usuarioCadastro: user?.id
    })
  };

  const dataTipo = [
    {
      id: 1,
      nome: "Débito"
    },
    {
      id: 2,
      nome: "Crédito"
    }
  ]

  const dataPassageiros = [
    {
      id: 1,
      nome: "João"
    },
    {
      id: 2,
      nome: "Maria"
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

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <SelectForm
            name="tipo"
            label="tipo"
            isRequired
            minW="20px"
            handleChange={(option) => {
              setValue("tipo", option?.value || 1);
            }}
            options={dataTipo
              ?.map((tipo) => ({
                label: tipo?.nome,
                value: tipo?.id,
              }))}
            errors={errors.tipo}
          />

          <FormInputNumber
            height="40px"
            label="Valor"
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
        </Flex>

        <FormInput
          label="Nº do comprovante bancário"
          isRequired
          errors={errors?.numeroComprovanteBancario}
          name="numeroComprovanteBancario"
          register={register}
        />

        <SelectForm
          name="passageiro"
          label="Passageiro"
          minW="20px"
          handleChange={(option) => {
            setValue("passageiro", option?.value);
          }}
          options={dataPassageiros
            ?.map((passageiro) => ({
              label: passageiro?.nome,
              value: passageiro?.id,
            }))}
          errors={errors.passageiro}
        />

        <SelectForm
          name="fornecedor"
          label="fornecedor"
          minW="20px"
          isLoading={loadingFornecedores}
          handleChange={(option) => {
            setValue("fornecedor", option?.value);
          }}
          options={dataFornecedores
            ?.map((fornecedor) => ({
              label: fornecedor?.nome,
              value: fornecedor?.id,
            }))}
          errors={errors.fornecedor}
        />

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
