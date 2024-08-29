/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useReservas from "../../../../hooks/useReservas";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import SelectForm from "../../../../components/SelectForm";
import { useState } from "react";
import { IOption } from "../../../../components/SelectForm/types";
import { formattingDate } from "../../../../utils/formattingDate";
import { IReserva } from "../../../../models/reservas.model";

const handleSubmitRegisterSchema = z.object({
  passageiros: z
    .array(z.string())
    .min(1, {
      message: fieldRequired("passageiro"),
    }),
  valor: z
    .number()
    .min(1, {
      message: fieldRequired("Digite um valor")
    }),
  valorDisponivel: z
    .number()
    .min(1, {
      message: fieldRequired("Digite um valor")
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterCredito {
  handleClose: () => void;
  valorPacote: number
  data: IReserva
}

const ModalRegisterCredito = ({
  handleClose,
  valorPacote,
  data
}: IModalRegisterCredito) => {
  const { user } = useGlobal();
  const { createCreditoCliente } = useReservas()
  const [valorDisponivel, setValorDisponivel] = useState(valorPacote);

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      passageiros: data.Pessoa.map((passageiro) => { return passageiro.id }),
      valor: 0,
      valorDisponivel: valorPacote
    }
  });
  const { mutate, isLoading } = createCreditoCliente(reset, handleClose);


  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      ...data,
      codigoUsuario: user?.id
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
          <span>Excursão </span>
          <Input
            height="40px"
            type="text"
            minWidth="80px"
            flex="1.01"
            value={`${formattingDate(data.Excursao.dataInicio)} à ${formattingDate(data.Excursao.dataFim)} - ${data.Excursao.nome}`}
            readOnly={true}
            sx={{
              border: 'none',
              backgroundColor: '',
              color: 'black'
            }}
          />
        </FieldWrap>

        <SelectForm
          name="passageiros"
          placeholder="Selecione"
          label="Passageiros"
          minW="200px"
          isRequired
          isMulti
          isSearchable
          handleChange={(option) => {
            setValue("passageiros", option?.map((item: IOption) => item?.value.toString()) || []);
          }}
          options={data.Pessoa
            ?.map((codigoPessoa) => ({
              label: codigoPessoa?.nome,
              value: codigoPessoa?.id,
            }))}
          defaultValue={data.Pessoa.map((passageiro) => {
            return {
              value: passageiro.id,
              label: passageiro.nome
            }
          })}
          errors={errors.passageiros}
        />

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >

          <FieldWrap>
            <span>Valor (R$)</span>
            <Input
              height="40px"
              {...register("valor", { valueAsNumber: true })}
              placeholder="Valor (R$)"
              flex="1.01"
              type="number"
              prefix="money"
              onChange={(event) => {
                let newValue = parseInt(event.target.value)

                if ((Number(newValue) && newValue <= valorPacote && !isNaN(Number(newValue)))) {
                  setValue('valor', newValue);
                } else {
                  setValue('valor', 0);
                }
              }}
              onBlur={(event) => {
                let newValue = (valorPacote - parseFloat(event.target.value))
                setValorDisponivel(newValue || 0)
              }}
              minW="250px"
              defaultValue={0}
            />
          </FieldWrap>

          <FormInputNumber
            height="40px"
            label="Valor Disponível"
            minWidth="250px"
            maxWidth="250px"
            {...register("valorDisponivel")}
            setValue={setValue}
            isMoneyValue={true}
            value={valorDisponivel}
            flex="1.01"
            maxLength={25}
            dontAllowNegative={true}
            readOnly
          />
        </Flex>

        <br />

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

export default ModalRegisterCredito;
