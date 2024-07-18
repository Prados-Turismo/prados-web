/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useProduct from "../../../../hooks/useProducts";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
import useFornecedor from "../../../../hooks/useFornecedor";
import { useGlobal } from "../../../../contexts/UserContext";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  estoque: z
    .coerce
    .number()
    .min(0, {
      message: fieldRequired("estoque"),
    }),
  codigoFornecedor: z
    .string()
    .min(1, {
      message: fieldRequired("fornecedor"),
    })
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

  const isEmpty = (value: string | null | undefined) => {
    return value == null || value.trim() === "";
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

        <FieldWrap>
          <span>
            Estoque <Asterisk />
          </span>

          <Input
            placeholder="Digite o Estoque"
            id="estoque"
            type="number"
            {...register("estoque", { valueAsNumber: !isEmpty("estoque") })}
            min={0}
          />
          {errors.estoque && <p className="error">{errors.estoque.message}</p>}
        </FieldWrap>

        <FieldWrap>
          <span>Fornecedor</span>

          <Box display="flex" gap="10px">
            <ReactSelect
              isLoading={loadingFornecedores}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("codigoFornecedor")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há fornecedor cadastrado"}
              options={dataFornecedores
                ?.map((fornecedor) => ({
                  label: fornecedor?.nome,
                  value: fornecedor?.id,
                }))}
              name="codigoFornecedor"
              id="codigoFornecedor"
              onChange={(option) => {
                setValue("codigoFornecedor", option?.value.toString() || "");
              }}
            />
          </Box>
        </FieldWrap>

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
