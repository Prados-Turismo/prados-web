/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import usePessoas from "../../../../hooks/usePessoas";
import useEndereco from "../../../../hooks/useEndereco";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import SelectForm from "../../../../components/SelectForm";
import FormInput from "../../../../components/FormInput";
import { IPessoa } from "../../../../models/pessoa.model";
import { FormEvent, useState } from "react";
import { cellphoneMask, cpfMask } from "../../../../utils/fieldMask";
import { IEndereco } from "../../../../models/endereco.model";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  cpf: z
    .string()
    .min(1, {
      message: fieldRequired('cpf')
    }),
  email: z
    .string()
    .min(1, {
      message: fieldRequired('email')
    }),
  sexo: z
    .string()
    .min(1, {
      message: fieldRequired('sexo')
    }),
  observacoes: z
    .string(),
  contato: z
    .string(),
  telefone: z
    .string(),
  telefoneWpp: z
    .string(),
  telefoneContato: z
    .string(),
  dataNascimento: z
    .string(),
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
  rg: z
    .string()
    .optional()
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalUpdateCliente {
  handleClose: () => void
  data: IPessoa
}

const ModalUpdateCliente = ({
  handleClose,
  data
}: IModalUpdateCliente) => {
  const { user } = useGlobal();
  const { updatePessoa } = usePessoas();
  const { buscaCep } = useEndereco();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      sexo: data.sexo,
      observacoes: data?.observacoes || undefined,
      contato: data?.contato || undefined,
      telefone: data.telefone ? cellphoneMask(data.telefone) : undefined,
      telefoneWpp: data.telefoneWpp ? cellphoneMask(data.telefoneWpp) : undefined,
      telefoneContato: data.telefoneContato ? cellphoneMask(data.telefoneContato) : undefined,
      dataNascimento: data.dataNascimento ? data.dataNascimento.split('T')[0] : undefined,
      cep: data.Endereco[0]?.cep || '',
      logradouro: data.Endereco[0]?.logradouro || '',
      numero: data.Endereco[0]?.numero || '',
      complemento: data.Endereco[0]?.complemento || '',
      cidade: data.Endereco[0]?.cidade || '',
      uf: data.Endereco[0]?.uf || '',
      bairro: data.Endereco[0]?.bairro || '',
      rg: data.rg || ''
    }
  });
  const { mutate, isLoading } = updatePessoa(reset, handleClose);
  const { mutate: mutateToGetCep, isLoading: isLoadingCep } = buscaCep();
  const [cepValue, setCepValue] = useState('');

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      id: data.id,
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

  const phoneMask = (event: FormEvent<HTMLInputElement>) => {

    event.currentTarget.value = cellphoneMask(
      event.currentTarget.value,
    );
    /*
        if (cellphoneValidation(event.currentTarget.value)) {
          setErrorPhone(false);
        } else {
          setErrorPhone(true);
        }
          */
  }

  const cpfMasked = (event: FormEvent<HTMLInputElement>) => {

    event.currentTarget.value = cpfMask(
      event.currentTarget.value,
    );

    /*
        if (cellphoneValidation(event.currentTarget.value)) {
          setErrorPhone(false);
        } else {
          setErrorPhone(true);
        }
          */
  }

  const dataSexo = [
    {
      id: 'M',
      nome: "Masculino"
    },
    {
      id: 'F',
      nome: "Feminino"
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

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FieldWrap>
            <span>
              CPF <Asterisk />
            </span>
            <Input
              placeholder="Digite o cpf"
              id="cpf"
              type="text"
              {...register("cpf")}
              onInput={cpfMasked}
            />
            {errors.cpf && <p className="error">{errors.cpf.message}</p>}
          </FieldWrap>

          <SelectForm
            name="sexo"
            label="Sexo"
            isRequired
            handleChange={(option) => {
              setValue("sexo", option?.value);
            }}
            options={dataSexo
              ?.map((sexo) => ({
                label: sexo?.nome,
                value: sexo?.id,
              }))}
            defaultValue={{
              label: data.sexo == "F" ? "Feminino" : "Masculino",
              value: data.sexo
            }}
            errors={errors.sexo}
          />
        </Flex>

        <FormInput
          id="email"
          label="E-Mail"
          type="text"
          name="email"
          register={register}
          inputArea={false}
          errors={errors.email}
          placeholder="Digite o E-Mail"
          isRequired
          setValue={setValue}
        />

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <FormInput
            id="telefone"
            label="Telefone"
            type="text"
            name="telefone"
            register={register}
            inputArea={false}
            errors={errors.telefone}
            placeholder="Digite o telefone"
            minW="135px"
            setValue={setValue}
            onInput={phoneMask}
          />

          <FormInput
            id="telefoneWpp"
            label="Whatsapp"
            type="text"
            name="telefoneWpp"
            register={register}
            inputArea={false}
            errors={errors.telefoneWpp}
            placeholder="Digite o Wpp"
            minW="135px"
            setValue={setValue}
            onInput={phoneMask}
          />
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >

          <FormInput
            id="contato"
            label="Nome Contato"
            type="text"
            name="contato"
            register={register}
            inputArea={false}
            errors={errors.contato}
            placeholder="Digite o contato"
            minW="135px"
            setValue={setValue}
          />

          <FormInput
            id="telefoneContato"
            label="Telefone Contato"
            type="text"
            name="telefoneContato"
            register={register}
            inputArea={false}
            errors={errors.telefoneContato}
            placeholder="Digite o telefone do contato"
            minW="135px"
            setValue={setValue}
            onInput={phoneMask}
          />

        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >

          <FormControl
            isInvalid={errors.dataNascimento?.message ? true : false}
          >
            <FormLabel>Data Nascimento</FormLabel>
            <Input
              type="date"
              maxWidth="300px"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              {...register("dataNascimento")}
            />
            <FormErrorMessage>{errors.dataNascimento?.message}</FormErrorMessage>
          </FormControl>

          <FormInput
            id="rg"
            label="RG"
            type="text"
            name="rg"
            register={register}
            inputArea={false}
            errors={errors.telefoneContato}
            placeholder="Digite o RG"
            maxWidth="300px"
            setValue={setValue}
            maxLengthInpt={15}
          />
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
          setValue={setValue}
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

export default ModalUpdateCliente;
