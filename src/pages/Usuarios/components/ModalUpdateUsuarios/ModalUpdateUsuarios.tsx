/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useUsuarios from "../../../../hooks/useUsuarios";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import FormInputNumber from "../../../../components/FormInputNumber";
import SelectForm from "../../../../components/SelectForm";
import { IUsuario } from "../../../../models/usuarios.model";
import FormInput from "../../../../components/FormInput";

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired("nome"),
    }),
  email: z
    .string()
    .min(1, {
      message: fieldRequired("E-mail"),
    }),
  username: z
    .string()
    .min(1, {
      message: fieldRequired("username"),
    }),
  password: z
    .string()
    .min(1, {
      message: fieldRequired("password"),
    }),
  tipo: z
    .number()
    .min(1, {
      message: fieldRequired("Tipo Usuário")
    }),
  comissao: z
    .number()
    .optional(),
  meta: z
    .number()
    .optional()
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalUpdateUsuario {
  handleClose: () => void
  data: IUsuario
}

const ModalUpdateUsuarios = ({
  handleClose,
  data
}: IModalUpdateUsuario) => {
  const { user } = useGlobal();
  const { updateUsuario } = useUsuarios();

  const {
    getValues,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      nome: data.nome,
      username: data.username,
      password: data.password,
      email: data.email,
      tipo: data.tipo,
      comissao: data.comissao || undefined,
      meta: data.meta || undefined,
    }
  });
  const { mutate, isLoading } = updateUsuario(reset, handleClose);

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      id: data.id,
      usuarioCadastro: user?.id
    })
  };

  const dataTipo = [
    {
      id: 1,
      nome: "Admin"
    },
    {
      id: 2,
      nome: "Vendedor"
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
              Login <Asterisk />
            </span>

            <Input
              placeholder="Digite o Login"
              id="nome"
              type="text"
              minWidth="300px"
              {...register("username")}
            />
            {errors.nome && <p className="error">{errors.nome.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Senha <Asterisk />
            </span>

            <Input
              placeholder="Digite a senha"
              id="nome"
              type="password"
              {...register("password")}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </FieldWrap>
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
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
          />

          <SelectForm
            name="tipo"
            label="Tipo Usuário"
            minW="80px"
            maxW="195px"
            isRequired
            handleChange={(option) => {
              setValue("tipo", option?.value);
            }}
            options={dataTipo
              ?.map((tipo) => ({
                label: tipo?.nome,
                value: tipo?.id,
              }))}
            errors={errors.tipo}
            defaultValue={{
              value: data.tipo,
              label: data.tipo == 1 ? 'Admin' : 'Vendedor'
            }}
          />
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >

          <FormInputNumber
            height="40px"
            label="Comissão %"
            minWidth="200px"
            {...register("comissao")}
            setValue={setValue}
            isMoneyValue
            flex="1.01"
            name="comissao"
            maxLength={25}
            dontAllowNegative
            prefix="percentual"
            errors={errors.comissao}
          />

          <FormInputNumber
            height="40px"
            label="Meta (R$)"
            minWidth="200px"
            {...register("meta")}
            setValue={setValue}
            isMoneyValue
            flex="1.01"
            name="meta"
            maxLength={25}
            dontAllowNegative
            errors={errors.meta}
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
            Salvar
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default ModalUpdateUsuarios;
