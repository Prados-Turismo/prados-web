/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../../../components/Asterisk";

// Hooks
import useExcursaoQuarto from "../../../../../../hooks/useExcursaoQuarto";

import {
  fieldRequired
} from "../../../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
import { IExcursaoQuarto, IUpdateExcursaoQuartoArgs } from "../../../../../../models/excursao-quarto.model";
import { useGlobal } from "../../../../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import useTipoQuarto from "../../../../../../hooks/useTipoQuarto";
// import { useGlobal } from "../../../../contexts/UserContext";

const handleSubmitRegisterSchema = z.object({
  passageiros: z
    .array(
      z.string()
    )
    .min(1, {
      message: fieldRequired("Passageiro"),
    }),
  numeroQuarto: z
    .string(),
  idTipoQuarto: z
    .string()
    .min(1, {
      message: fieldRequired("Tipo Quarto")
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalUpdateRoom {
  handleClose: () => void;
  data: IExcursaoQuarto
}

const ModalUpdateQuarto = ({
  handleClose,
  data
}: IModalUpdateRoom) => {
  const { user } = useGlobal();
  const { updateExcursaoQuarto } = useExcursaoQuarto();
  const { listExcursaoPassageirosNoRoom } = useExcursaoQuarto();
  const { getAllTipoQuartos } = useTipoQuarto()
  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      numeroQuarto: data.numeroQuarto,
      idTipoQuarto: data.TipoQuarto.id
    }
  });
  const { id: idExcursao } = useParams();
  const { mutate, isLoading } = updateExcursaoQuarto(reset, handleClose);
  const { data: dataPassageiros, isLoading: loadingPassageiros } = listExcursaoPassageirosNoRoom(idExcursao || '');
  const { data: dataTipoQuarto, isLoading: loadingTipoQuarto } = getAllTipoQuartos()

  let passageiros = data.Passageiros.map((value) => {
    return { id: value.id, Pessoa: { id: value.id, nome: value.Pessoa.nome }, reserva: value.Reservas.reserva }
  })

  const allOptions = [...dataPassageiros, ...passageiros]

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      id: data.id,
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
          <span>Passageiros <Asterisk /></span>

          <Box display="flex" gap="10px">
            <ReactSelect
              isLoading={loadingPassageiros}
              isMulti={true}
              className="select-fields multi"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("passageiros")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há passageiros cadastrados"}
              options={allOptions
                ?.map((passageiro) => ({
                  label: `${passageiro.reserva} - ${passageiro?.Pessoa.nome}`,
                  value: passageiro?.Pessoa.id,
                }))}
              name="passageiros"
              id="passageiros"
              onChange={(option) => {
                setValue("passageiros", option?.map((item) => item?.value.toString()) || []);
              }}
              defaultValue={
                data.Passageiros.map((passageiro) => {
                  return { value: passageiro.id, label: `${passageiro.Reservas.reserva} - ${passageiro.Pessoa.nome}` }
                })}
            />
          </Box>
          {errors.passageiros && <p className="error">{errors.passageiros.message}</p>}
        </FieldWrap>

        <FieldWrap>
          <span>Tipo do Quarto <Asterisk /></span>

          <Box display="flex" gap="10px">
            <ReactSelect
              isLoading={loadingTipoQuarto}
              isMulti={false}
              className="select-fields multi"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("idTipoQuarto")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há tipos cadastrados"}
              options={dataTipoQuarto
                .map((tipo) => ({
                  label: tipo?.nome,
                  value: tipo?.id,
                }))}
              name="idTipoQuarto"
              id="idTipoQuarto"
              onChange={(option) => {
                setValue("idTipoQuarto", option?.value || '');
              }}
              defaultValue={{
                value: data.TipoQuarto.id,
                label: data.TipoQuarto.nome
              }}
            />
          </Box>
          {errors.passageiros && <p className="error">{errors.passageiros.message}</p>}
        </FieldWrap>

        <Input type="hidden" {...register("numeroQuarto")} />

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

export default ModalUpdateQuarto;
