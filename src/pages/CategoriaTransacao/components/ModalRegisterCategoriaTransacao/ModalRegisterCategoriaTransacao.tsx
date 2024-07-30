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
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterTipoQuarto {
  handleClose: () => void;
}

const ModalRegisterTipoQuarto = ({
  handleClose,
}: IModalRegisterTipoQuarto) => {
  const { user } = useGlobal();
  const { createCategoriaTransacao } = useCategoriaTransacao();

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
              noOptionsMessage={() => "Não há origem cadastrado"}
              options={dataTipo
                ?.map((tipo) => ({
                  label: tipo?.nome,
                  value: tipo?.id,
                }))}
              name="origem"
              id="origem"
              onChange={(option) => {
                setValue("tipo", option?.value || 1);
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

export default ModalRegisterTipoQuarto;
