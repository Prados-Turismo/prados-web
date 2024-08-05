/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import usePacotes from "../../../../hooks/usePacotes";
import useExcursoes from "../../../../hooks/useExcursao";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import FormInput from "../../../../components/FormInput";
import { useState } from "react";
import { isDateLessThan150YearsAgo } from "../../../../utils/formattingDate";


const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  codigoPacote: z
    .string()
    .min(1, {
      message: fieldRequired("pacote"),
    }),
  dataInicio: z
    .string()
    .min(1, {
      message: fieldRequired("data de início"),
    }),
  dataFim: z
    .string()
    .min(1, {
      message: fieldRequired("data de fim"),
    }),
  vagas: z
    .number()
    .min(1, {
      message: fieldRequired("vagas"),
    }),
  valor: z
    .number()
    .min(1, {
      message: fieldRequired("valor")
    }),
  observacoes: z
    .string()
    .optional()
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  handleClose: () => void;
}

const ModalRegisterExcursao = ({
  handleClose,
}: IModalRecordCollaborator) => {
  const { user } = useGlobal();
  const { createExcursao } = useExcursoes();
  const { getAllPacotes } = usePacotes();

  const [errorDate, setErrorDate] = useState({
    message: "",
  });

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createExcursao(reset, handleClose);
  const { data: dataPacotes, isLoading: loadingPacotes } = getAllPacotes();

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
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

        <FieldWrap>
          <span>Pacote</span>

          <Box display="flex" gap="10px">
            <ReactSelect
              isLoading={loadingPacotes}
              className="select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("codigoPacote")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há pacote cadastrado"}
              options={dataPacotes
                ?.map((pacote) => ({
                  label: pacote?.nome,
                  value: pacote?.id,
                }))}
              name="codigoPacote"
              id="codigoPacote"
              onChange={(option) => {
                setValue("codigoPacote", option?.value.toString() || "");
              }}
            />
          </Box>
        </FieldWrap>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FormControl
            isRequired
            isInvalid={errorDate?.message ? true : false}
          >
            <FormLabel>Data de início</FormLabel>
            <Input
              name="dataInicio"
              type="date"
              placeholder="dd/mm/aaaa"
              onChange={({ target: { value } }) => {
                const dataAtual = new Date();
                const data = new Date(value);

                if (data < dataAtual) {
                  setErrorDate({
                    message:
                      "A data de início não pode ser inferior a data atual",
                  });
                } else if (isDateLessThan150YearsAgo(data)) {
                  setErrorDate({
                    message:
                      "A data de início não pode ser inferior há 150 anos atrás",
                  });
                } else {
                  setErrorDate({
                    message: "",
                  });
                }
                setValue("dataInicio", value);
              }}
              max="2099-12-31"
              maxLength={10}
            />
            <FormErrorMessage>{errorDate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errorDate?.message ? true : false}
          >
            <FormLabel>Data de fim</FormLabel>
            <Input
              name="dataFim"
              type="date"
              placeholder="dd/mm/aaaa"
              onChange={({ target: { value } }) => {
                const dataAtual = new Date();
                const data = new Date(value);

                if (data < dataAtual) {
                  setErrorDate({
                    message:
                      "A data de fim não pode ser inferior a data atual",
                  });
                } else if (isDateLessThan150YearsAgo(data)) {
                  setErrorDate({
                    message:
                      "A data de fim não pode ser inferior há 150 anos atrás",
                  });
                } else {
                  setErrorDate({
                    message: "",
                  });
                }
                setValue("dataFim", value);
              }}
              max="2099-12-31"
              maxLength={10}
            />
            <FormErrorMessage>{errorDate?.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <FormInputNumber
          height="40px"
          label="Vagas"
          setValue={setValue}
          name="vagas"
          maxLength={25}
          isRequired
          errors={errors.vagas}
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
          errors={errors.valor}
        />

        <FormInput
          id="observacoes"
          label="Observações"
          type="text"
          {...register("observacoes")}
          inputArea={true}
          errors={errors.observacoes}
          onChangeTextarea={(event) => {
            setValue("observacoes", event.target.value || '');
          }}
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

export default ModalRegisterExcursao;
