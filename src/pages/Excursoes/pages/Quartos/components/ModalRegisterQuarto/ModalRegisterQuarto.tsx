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
import { useGlobal } from "../../../../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import useTipoQuarto from "../../../../../../hooks/useTipoQuarto";

const handleSubmitRegisterSchema = z.object({
  passageiros: z
    .array(
      z.string()
    )
    .min(1, {
      message: fieldRequired("local de embarque"),
    }),
  numeroQuarto: z
    .string()
    .min(1),
  idTipoQuarto: z
    .string()
    .min(1, {
      message: fieldRequired("Tipo Quarto")
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterRoom {
  handleClose: () => void,
  numeroQuarto: string
}

const ModalRegisterQuarto = ({
  handleClose,
  numeroQuarto
}: IModalRegisterRoom) => {
  const { user } = useGlobal();
  const { createExcursaoQuarto, listExcursaoPassageirosNoRoom } = useExcursaoQuarto();
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
      numeroQuarto: `Quarto ${numeroQuarto}`
    }
  });
  const { id: idExcursao } = useParams();
  const { mutate, isLoading } = createExcursaoQuarto(reset, handleClose);
  const { data: dataPassageiros, isLoading: loadingPassageiros } = listExcursaoPassageirosNoRoom(idExcursao || '');
  const { data: dataTipoQuarto, isLoading: loadingTipoQuarto } = getAllTipoQuartos()

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      codigoExcursao: idExcursao,
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
              options={dataPassageiros
                .map((passageiro) => ({
                  label: `${passageiro?.reserva} - ${passageiro?.Pessoa.nome}`,
                  value: passageiro?.id,
                }))}
              name="passageiros"
              id="passageiros"
              onChange={(option) => {
                setValue("passageiros", option?.map((item) => item?.value.toString()) || []);
              }}
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
            Cadastrar
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default ModalRegisterQuarto;
