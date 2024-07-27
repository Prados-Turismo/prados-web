/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import usePacotes from "../../../../hooks/usePacotes";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
// import useOrigem from "../../../../hooks/useOrigem";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import FormInput from "../../../../components/FormInput";
import { useState } from "react";
import { IDataPacote } from "../../../../models/pacote.model";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  descricao: z
    .string()
    .optional(),
  origem: z
    .number()
    .min(1, {
      message: fieldRequired("origem"),
    }),
  tipoTransporte: z
    .number()
    .min(1, {
      message: fieldRequired("tipo de transporte"),
    }),
  destino: z
    .string()
    .min(1, {
      message: fieldRequired("destino")
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  handleClose: () => void
  data: IDataPacote
}

const ModalUpdatePacote = ({
  handleClose,
  data
}: IModalRecordCollaborator) => {
  const { user } = useGlobal();
  const { updatePacote } = usePacotes();

  const [ufSelected, setUfSelected] = useState<any>(null);
  const [citySelected, setCitySelected] = useState<any>(null);

  const {
    setValue,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      nome: data.nome,
      descricao: data.descricao || '',
      origem: data.origem,
      tipoTransporte: data.tipoTransporte,
      destino: data.destino
    }
  });

  const { mutate, isLoading } = updatePacote(reset, handleClose);

  const dataOrigens = [
    {
      id: 1,
      nome: "Fortaleza, Ceará"
    },
    {
      id: 2,
      nome: "Tianguá, Ceará"
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

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      id: data.id,
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

        <FormInput
          id="descricao"
          label="Descrição"
          type="text"
          {...register?.("descricao")}
          inputArea={true}
          errors={errors.descricao}
          name="descricao"
          defaultValue={
            data.descricao || ''
          }
          onChangeTextarea={(event) => {
            setValue("descricao", event.target.value || '');
          }}
        />

        <FieldWrap>
          <span>Origem</span>

          <Box display="flex" gap="10px">
            <ReactSelect
              // isLoading={loadingOrigemes}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("origem")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há origem cadastrado"}
              options={dataOrigens
                ?.map((origem) => ({
                  label: origem?.nome,
                  value: origem?.id,
                }))}
              name="origem"
              id="origem"
              onChange={(option) => {
                setValue("origem", option?.value || 1);
              }}
              defaultValue={{
                label: data.origem == 1 ? 'Fortaleza, Ceará' : 'Tianguá, Ceará',
                value: data.origem
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
                setValue("tipoTransporte", option?.value || 1);
              }}
              defaultValue={{
                label: data.tipoTransporte == 1 ? 'Terrestre' : 'Áereo',
                value: data.tipoTransporte
              }}
            />
          </Box>
        </FieldWrap>

        <FieldWrap>
          <span>
            Destino <Asterisk />
          </span>

          <Input
            placeholder="Digite o destino"
            id="destino"
            type="text"
            {...register("destino")}
          />
          {errors.destino && <p className="error">{errors.destino.message}</p>}
        </FieldWrap>

        {/* <Flex gap={5}>
          <FormControl
            maxWidth={{
              base: "100%",
              md: "250px",
            }}
            minW="130px"
          >
            <FormLabel>Estado</FormLabel>

            <ReactSelect
              className="estado select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum opção para selecionar"}
              value={ufSelected}
              onChange={(selectedOption) => {
                setUfSelected(selectedOption)
                setCitySelected(null)
              }}
            // options={
            //   uf &&
            //   uf
            //     .filter((el) =>
            //       search?.uf ? !search?.uf.includes(el.codIbgeUF) : true,
            //     )
            //     .map((item) => ({
            //       value: item?.codIbgeUF,
            //       label: item?.nomeUF,
            //     }))
            // }
            />
          </FormControl>

          <FormControl
            maxWidth={{
              base: "100%",
              md: "250px",
            }}
          >
            <FormLabel>Município</FormLabel>

            {!ufSelected ? (
              <Flex
                justifyContent="flex-start"
                paddingLeft="10px"
                alignItems="center"
                border="1px solid hsl(0, 0%, 80%)"
                borderRadius="4px"
                height="38px"
                minW="165px"
              >
                Selecione um Estado
              </Flex>
            ) : (
              <ReactSelect
                className="municipio select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecionar"
                noOptionsMessage={() => "Nenhum opção para selecionar"}
                value={citySelected}
                onChange={(selectedOption) => {
                  setCitySelected(selectedOption)
                }}
              // options={
              //   cities &&
              //   cities
              //     .filter(
              //       (item) =>
              //         item?.unidade_federativa?.codIbgeUF === ufSelected?.value,
              //     )
              //     .map((item) => ({
              //       value: item?.codIbgeMunicipio,
              //       label: item?.nomeMunicipio,
              //       uf: item?.unidade_federativa?.codIbgeUF,
              //     }))
              // }
              />
            )}
          </FormControl>
        </Flex> */}

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

export default ModalUpdatePacote;
