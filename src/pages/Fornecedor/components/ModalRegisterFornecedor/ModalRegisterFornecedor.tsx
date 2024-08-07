/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useFornecedor from "../../../../hooks/useFornecedor";
import useEndereco from "../../../../hooks/useEndereco";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInput from "../../../../components/FormInput";
import { FormEvent, useState } from "react";
import { cellphoneMask, cnpjMask } from "../../../../utils/fieldMask";
import { IEndereco } from "../../../../models/endereco.model";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  cnpj: z
    .string()
    .min(1, {
      message: fieldRequired('cnpj')
    }),
  email: z
    .string()
    .min(1, {
      message: fieldRequired('email')
    }),
  fantasia: z
    .string()
    .min(1, {
      message: fieldRequired('fantasia')
    }),
  site: z
    .string(),
  contato: z
    .string(),
  telefone: z
    .string(),
  observacoes: z
    .string(),
  telefoneContato: z
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
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterFornecedor {
  handleClose: () => void;
}

const ModalRegisterFornecedor = ({
  handleClose,
}: IModalRegisterFornecedor) => {
  const { user } = useGlobal();
  const { createFornecedor } = useFornecedor();
  const { buscaCep } = useEndereco();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });

  const { mutate, isLoading } = createFornecedor(reset, handleClose);
  const [errorPhone, setErrorPhone] = useState(false);
  const [cepValue, setCepValue] = useState('');
  const { mutate: mutateToGetCep, isLoading: isLoadingCep } = buscaCep();

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

  const cepMasked = (event: FormEvent<HTMLInputElement>) => {
    // Remove any non-digit characters
    const digits = event.currentTarget.value.replace(/\D/g, '');

    // Format the digits into the "00000-000" pattern
    if (digits.length <= 5) {
      return digits;
    } else {
      return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
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

  const cnpjMasked = (event: FormEvent<HTMLInputElement>) => {

    event.currentTarget.value = cnpjMask(
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
          <span>
            Fantasia <Asterisk />
          </span>

          <Input
            placeholder="Digite a fantasia"
            id="fantasia"
            type="text"
            {...register("fantasia")}
          />
          {errors.fantasia && <p className="error">{errors.fantasia.message}</p>}
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
              CNPJ <Asterisk />
            </span>
            <Input
              placeholder="Digite o CNPJ"
              id="CNPJ"
              type="text"
              {...register("cnpj")}
              onInput={cnpjMasked}
              minW="180px"
              maxW="180px"
            />
            {errors.cnpj && <p className="error">{errors.cnpj.message}</p>}
          </FieldWrap>

          <FormInput
            id="site"
            label="Site"
            type="text"
            name="site"
            register={register}
            inputArea={false}
            errors={errors.site}
            placeholder="Digite o site"
            minW="220px"
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

          <FormInput
            id="telefone"
            label="Telefone"
            type="text"
            name="telefone"
            register={register}
            inputArea={false}
            errors={errors.telefone}
            placeholder="Digite o telefone"
            maxLengthInpt={15}
            onInput={phoneMask}
            minW="135px"
          />

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
            minW="135px"
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
            onInput={phoneMask}
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

export default ModalRegisterFornecedor;
