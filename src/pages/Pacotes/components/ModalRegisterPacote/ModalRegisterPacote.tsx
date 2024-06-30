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
// import useOrigem from "../../../../hooks/useOrigem";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import FormInput from "../../../../components/FormInput";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  valor: z
    .string()
    .min(1, {
      message: fieldRequired("valor"),
    }),
  descricao: z
      .string()
      .optional(),
  codigoOrigem: z
    .string()
    .min(1, {
      message: fieldRequired("origem"),
    }),
  tipoTransporte: z
    .string()
    .min(1, {
      message: fieldRequired("tipo de transporte"),
    }),
  localEmbarque: z
    .array(
      z.string()
    )
    .min(1, {
      message: fieldRequired("local de embarque"),
    }),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  handleClose: () => void;
}

const ModalRegisterPacote = ({
  handleClose,
}: IModalRecordCollaborator) => {
  const { user } = useGlobal();
  const { createProduct } = useProduct();
  // const { getAllOrigemes } = useOrigem();

  const {
    setValue,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createProduct(reset, handleClose);
  // const { data: dataOrigens, isLoading: loadingOrigemes } = getAllOrigemes();

  const dataOrigens = [
    {
      id: 1,
      nome: "Tianguá, Ceará"
    },
    {
      id: 2,
      nome: "Fortaleza, Ceará"
    }
  ]

  const dataTipoTransporte = [
    {
      id: 1,
      nome: "Terrestre"
    },
    {
      id: 2,
      nome: "Aéreo"
    }
  ]

  const dataLocalEmbarque = [
    {
      id: 1,
      nome: "Local de Embarque 1"
    },
    {
      id: 2,
      nome: "Local de Embarque 2"
    },
    {
      id: 3,
      nome: "Local de Embarque 3"
    }
  ]

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    mutate({
      ...data,
      ativo: true,
      usuarioCadastro: user?.id
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

        <FormInputNumber
          height="40px"
          label="Valor"
          setValue={setValue}
          value={getValues("valor")}
          isMoneyValue
          flex="1.01"
          name="valor"
          maxLength={25}
          isRequired
          errors={errors.valor}
        />

        <FormInput
          id="descricao"
          label="Descrição"
          type="text"
          {...register("descricao")}
          inputArea={true}
          errors={errors.descricao}
        />

        <FieldWrap>
          <span>Origem</span>

          <Box display="flex" gap="10px">
            <ReactSelect
              // isLoading={loadingOrigemes}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("codigoOrigem")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há origem cadastrado"}
              options={dataOrigens
                ?.map((origem) => ({
                  label: origem?.nome,
                  value: origem?.id,
                }))}
              name="codigoOrigem"
              id="codigoOrigem"
              onChange={(option) => {
                setValue("codigoOrigem", option?.value.toString() || "");
              }}
            />
          </Box>
        </FieldWrap>

        <FieldWrap>
          <span>Tipo de Transporte</span>

          <Box display="flex" gap="10px">
            <ReactSelect
              // isLoading={loadingOrigemes}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("tipoTransporte")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há tipo de transporte cadastrado"}
              options={dataTipoTransporte
                ?.map((tipoTransporte) => ({
                  label: tipoTransporte?.nome,
                  value: tipoTransporte?.id,
                }))}
              name="tipoTransporte"
              id="tipoTransporte"
              onChange={(option) => {
                setValue("tipoTransporte", option?.value.toString() || "");
              }}
            />
          </Box>
        </FieldWrap>

        <FieldWrap>
          <span>Local de Embarque</span>

          <Box display="flex" gap="10px">
            <ReactSelect
              // isLoading={loadingOrigemes}
              isMulti={true}
              className="select-fields multi"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("localEmbarque")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há tipo de transporte cadastrado"}
              options={dataLocalEmbarque
                ?.map((localEmbarque) => ({
                  label: localEmbarque?.nome,
                  value: localEmbarque?.id,
                }))}
              name="localEmbarque"
              id="localEmbarque"
              onChange={(option) => {
                setValue("localEmbarque", option?.map((item) => item?.value.toString()) || []);
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

export default ModalRegisterPacote;
