/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../../../components/Asterisk";

// Hooks
import useProduct from "../../../../../../hooks/useProducts";

import {
  fieldRequired
} from "../../../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
// import { useGlobal } from "../../../../contexts/UserContext";

const handleSubmitRegisterSchema = z.object({
  passageiros: z
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

const ModalRegisterQuarto = ({
  handleClose,
}: IModalRecordCollaborator) => {
  // const { user } = useGlobal();
  const { createProduct } = useProduct();
  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate: _, isLoading } = createProduct(reset, handleClose);
  // const { data: dataPacotes, isLoading: loadingpacotees } = getAllpacotees();

  const datapassageiros = [
    {
      id: 1,
      nome: "Passageiro 1"
    },
    {
      id: 2,
      nome: "Passageiro 2"
    },
    {
      id: 3,
      nome: "Passageiro 3"
    }
  ]

  const handleSubmitRegister = (_data: IhandleSubmitRegister) => {
    // mutate({
    //   ...data,
    //   ativo: true,
    //   usuarioCadastro: user?.id
    // })
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
              // isLoading={loadingOrigemes}
              isMulti={true}
              className="select-fields multi"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              {...register?.("passageiros")}
              isSearchable={true}
              placeholder="Selecione"
              noOptionsMessage={() => "Não há passageiros cadastrados"}
              options={datapassageiros
                ?.map((passageiro) => ({
                  label: passageiro?.nome,
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
