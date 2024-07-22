/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
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
    })
    .optional(),
  data: z
    .string({
      required_error: fieldRequired("data")
    }),
  efetivado: z
    .number({
      required_error: fieldRequired("efetivado")
    }),
  codigoPessoa: z
    .string()
    .optional(),
  codigoFornecedor: z
    .string()
    .optional(),
  codigoProduto: z
    .string()
    .optional(),
  codigoExcursao: z
    .string()
    .optional(),
  codigoPacote: z
    .string()
    .optional(),
  codigoFormaPagamento: z
    .string({
      required_error: fieldRequired("forma de pagamento")
    }),
  observacao: z
    .string()
    .optional()
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

  const dataProdutos = [
    {
      id: 1,
      nome: "Produto 1"
    },
    {
      id: 2,
      nome: "Produto 2"
    }
  ]

  const dataExcursao = [
    {
      id: 1,
      nome: "Excursão 1"
    },
    {
      id: 2,
      nome: "Excursão 2"
    }
  ]

  const dataPacotes = [
    {
      id: 1,
      nome: "Pacote 1"
    },
    {
      id: 2,
      nome: "Pacote 2"
    }
  ]

  const dataFormaPagamento = [
    {
      id: 1,
      nome: "Forma de pagamento 1"
    },
    {
      id: 2,
      nome: "Forma de pagamento 2"
    }
  ]

  const dataEfetivado = [
    {
      id: 1,
      nome: "Sim"
    },
    {
      id: 2,
      nome: "Não"
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
            label="Tipo"
            minW="50%"
            isRequired
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
        </Flex>

        <SelectForm
          name="codigoFormaPagamento"
          label="Forma de Pagamento"

          isRequired
          // isLoading={loadingFornecedores}
          handleChange={(option) => {
            setValue("codigoFormaPagamento", option?.value);
          }}
          options={dataFormaPagamento
            ?.map((codigoFormaPagamento) => ({
              label: codigoFormaPagamento?.nome,
              value: codigoFormaPagamento?.id,
            }))}
          errors={errors.codigoFormaPagamento}
        />

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FormControl
            isRequired
            minW = "50%"
            isInvalid={errors.data?.message ? true : false}
          >
            <FormLabel>Data</FormLabel>
            <Input
              type="date"
              minW = "50%"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              {...register("data")}
            />
            <FormErrorMessage>{errors.data?.message}</FormErrorMessage>
          </FormControl>

          <SelectForm
            name="efetivado"
            label="Efetivado"
            minW = "235px"
            // isLoading={loadingFornecedores}
            handleChange={(option) => {
              setValue("efetivado", option?.value);
            }}
            options={dataEfetivado
              ?.map((efetivado) => ({
                label: efetivado?.nome,
                value: efetivado?.id,
              }))}
            errors={errors.efetivado}
          />
        </Flex>

        <FormInput
          label="Nº do comprovante bancário"
          errors={errors?.numeroComprovanteBancario}
          name="numeroComprovanteBancario"
          register={register}
        />

        <SelectForm
          name="codigoExcursao"
          label="Excursão"
          minW="20px"
          // isLoading={loadingFornecedores}
          handleChange={(option) => {
            setValue("codigoExcursao", option?.value);
          }}
          options={dataExcursao
            ?.map((codigoExcursao) => ({
              label: codigoExcursao?.nome,
              value: codigoExcursao?.id,
            }))}
          errors={errors.codigoExcursao}
        />

        <SelectForm
          name="codigoPacote"
          label="Pacote"
          minW="20px"
          // isLoading={loadingFornecedores}
          handleChange={(option) => {
            setValue("codigoPacote", option?.value);
          }}
          options={dataPacotes
            ?.map((codigoPacote) => ({
              label: codigoPacote?.nome,
              value: codigoPacote?.id,
            }))}
          errors={errors.codigoPacote}
        />

        <SelectForm
          name="codigoPessoa"
          label="Passageiro"
          minW="20px"
          handleChange={(option) => {
            setValue("codigoPessoa", option?.value);
          }}
          options={dataPassageiros
            ?.map((codigoPessoa) => ({
              label: codigoPessoa?.nome,
              value: codigoPessoa?.id,
            }))}
          errors={errors.codigoPessoa}
        />

        <SelectForm
          name="codigoFornecedor"
          label="Fornecedor"
          minW="20px"
          isLoading={loadingFornecedores}
          handleChange={(option) => {
            setValue("codigoFornecedor", option?.value);
          }}
          options={dataFornecedores
            ?.map((codigoFornecedor) => ({
              label: codigoFornecedor?.nome,
              value: codigoFornecedor?.id,
            }))}
          errors={errors.codigoFornecedor}
        />

        <SelectForm
          name="codigoProduto"
          label="Produto"
          minW="20px"
          // isLoading={loadingFornecedores}
          handleChange={(option) => {
            setValue("codigoProduto", option?.value);
          }}
          options={dataProdutos
            ?.map((codigoProduto) => ({
              label: codigoProduto?.nome,
              value: codigoProduto?.id,
            }))}
          errors={errors.codigoProduto}
        />

        <FormInput
          id="observacao"
          label="Observações"
          type="text"
          {...register("observacao")}
          inputArea={true}
          errors={errors.observacao}
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
