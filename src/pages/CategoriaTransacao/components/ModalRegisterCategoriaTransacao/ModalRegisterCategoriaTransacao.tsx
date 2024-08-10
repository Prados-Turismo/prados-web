/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useCategoriaTransacao from "../../../../hooks/useCategoriaTransacao";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import ReactSelect from "react-select";
import useSubCategoriaTransacao from "../../../../hooks/useSubCategoriaTransacao";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  tipo: z
    .number()
    .min(1, {
      message: fieldRequired('tipo')
    }),
  codigoSubCategoria: z
    .string()
    .min(1, {
      message: fieldRequired("Subcategoria")
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterCategoriaTransacao {
  handleClose: () => void;
}

const ModalRegisterCategoriaTransacao = ({
  handleClose,
}: IModalRegisterCategoriaTransacao) => {
  const { user } = useGlobal();
  const { createCategoriaTransacao } = useCategoriaTransacao();
  const { getAllSubCategoriaTransacao } = useSubCategoriaTransacao()

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createCategoriaTransacao(reset, handleClose);
  const { data: dataSubCategoria, isLoading: isLoadingSubCategoria } = getAllSubCategoriaTransacao()

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      codigoUsuario: user?.id
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
          <span>Tipo <Asterisk /></span>

          <Box display="flex" gap="10px">
            <ReactSelect
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("tipo")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há tipo cadastrado"}
              options={dataTipo
                ?.map((tipo) => ({
                  label: tipo?.nome,
                  value: tipo?.id,
                }))}
              name="tipo"
              id="tipo"
              onChange={(option) => {
                setValue("tipo", option?.value || 1);
              }}
            />
          </Box>
        </FieldWrap>

        <FieldWrap>
          <span>Subcategoria <Asterisk /></span>

          <Box display="flex" gap="10px">
            <ReactSelect
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("codigoSubCategoria")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há subcategoria cadastrada"}
              options={dataSubCategoria
                ?.map((subcategoria) => ({
                  label: subcategoria?.nome,
                  value: subcategoria?.id,
                }))}
              name="codigoSubCategoria"
              id="codigoSubCategoria"
              onChange={(option) => {
                setValue("codigoSubCategoria", option?.value || '');
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

export default ModalRegisterCategoriaTransacao;
