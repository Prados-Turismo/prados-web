/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useLocalEmbarque from "../../../../hooks/useLocalEmbarque";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import { useState } from "react";
import useEndereco from "../../../../hooks/useEndereco";
import { IEndereco } from "../../../../models/endereco.model";
import FormInput from "../../../../components/FormInput";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  horaEmbarque: z
    .string()
    .min(1, {
      message: fieldRequired('horaEmbarque')
    }),
  observacoes: z
    .string()
    .optional(),
  cep: z
    .string(),
  cidade: z
    .string(),
  uf: z
    .string(),
  bairro: z
    .string(),
  logradouro: z
    .string(),
  numero: z
    .string(),
  complemento: z
    .string(),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterLocalEmbarque {
  handleClose: () => void;
}

const ModalRegisterLocalEmbarque = ({
  handleClose,
}: IModalRegisterLocalEmbarque) => {
  const { user } = useGlobal();
  const { createLocalEmbarque } = useLocalEmbarque();
  const { buscaCep } = useEndereco();
  const [cepValue, setCepValue] = useState('');
  const { mutate: mutateToGetCep, isLoading: isLoadingCep } = buscaCep();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createLocalEmbarque(reset, handleClose);

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      usuarioCadastro: user?.id
    })
  };

  const onBlurCep = async () => {
    if (cepValue.length == 8) {
      mutateToGetCep(cepValue || "", {
        onSuccess: (data: IEndereco) => {
          setValue('cidade', data.cidade)
          setValue('uf', data.uf)
          setValue('logradouro', `${data.tipo_logradouro} ${data.logradouro}`)
          setValue('bairro', data.bairro)
        }
      });
    }
  };

  const handleChangeHora = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^0-9]/g, '');
    let formatted = '';

    if (cleaned.length >= 1) {
      formatted += cleaned.substring(0, 2);
    }

    if (cleaned.length >= 3) {
      formatted += ':' + cleaned.substring(2, 4);
    }
    setValue('horaEmbarque', formatted);
  };

  const handleBlurHora = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);

    if (
      value.length === 5 &&
      hours >= 0 &&
      hours < 24 &&
      minutes >= 0 &&
      minutes < 60
    ) {
      return;
    }

    setValue('horaEmbarque', '');
    return '';
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

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FieldWrap>
            <span>
              Nome <Asterisk />
            </span>

            <Input
              placeholder="Digite o nome"
              id="nome"
              type="text"
              minWidth="300px"
              {...register("nome")}
            />
            {errors.nome && <p className="error">{errors.nome.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Hora <Asterisk />
            </span>

            <Input
              {...register('horaEmbarque')}
              type="text"
              name="hora"
              onChange={handleChangeHora}
              onBlur={(e) => {
                handleBlurHora(e.target.value)
              }}
            />

          </FieldWrap>
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FieldWrap>
            <span>
              CEP
            </span>

            <Input
              placeholder="Digite o CEP"
              id="cep"
              type="text"
              {...register("cep")}
              onChange={(event) => {
                setCepValue(event.target.value);
                setValue('cep', event.target.value)
              }}
              onBlur={onBlurCep}
              minW="100px"
            />
            {errors.cep && <p className="error">{errors.cep.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Cidade
            </span>

            <Input
              placeholder="Cidade"
              id="cidade"
              type="text"
              {...register("cidade")}
              minW="100px"
            />
            {errors.cidade && <p className="error">{errors.cidade.message}</p>}

          </FieldWrap>

          <FieldWrap>
            <span>
              Estado
            </span>

            <Input
              placeholder="Estado"
              id="uf"
              type="text"
              {...register("uf")}
              minW="100px"
            />
            {errors.uf && <p className="error">{errors.uf.message}</p>}

          </FieldWrap>
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FieldWrap>
            <span>
              Logradouro
            </span>

            <Input
              placeholder="Logradouro"
              id="logradouro"
              type="text"
              {...register("logradouro")}
              minW="150px"
            />
            {errors.logradouro && <p className="error">{errors.logradouro.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Bairro
            </span>

            <Input
              placeholder="Bairro"
              id="bairro"
              type="text"
              {...register("bairro")}
              minW="100px"
            />
            {errors.bairro && <p className="error">{errors.bairro.message}</p>}

          </FieldWrap>

          <FieldWrap>
            <span>
              Nº
            </span>

            <Input
              placeholder="Número"
              id="numero"
              type="text"
              {...register("numero")}
              minW="20px"
            />
            {errors.numero && <p className="error">{errors.numero.message}</p>}

          </FieldWrap>
        </Flex>

        <FieldWrap>
          <span>
            Complemento
          </span>

          <Input
            placeholder="Complemento"
            id="complemento"
            type="text"
            {...register('complemento')}
            minW="270px"
          />
        </FieldWrap>

        <FormInput
          id="observacoes"
          label="Observações"
          type="text"
          name="observacoes"
          register={register}
          inputArea={true}
          errors={errors.observacoes}
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

export default ModalRegisterLocalEmbarque;
