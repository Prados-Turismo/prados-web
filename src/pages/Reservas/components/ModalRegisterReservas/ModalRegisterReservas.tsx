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
import useExcursoes from "../../../../hooks/useExcursao";
import { FormEvent, useState } from "react";
import { cpfMask } from "../../../../utils";
import usePessoas from "../../../../hooks/usePessoas";
import ReactSelect, { GroupBase } from "react-select";
import { IOption } from "../../../../components/SelectForm/types";
import useFormaPagamento from "../../../../hooks/useFormaPagamento";
import useContaBancaria from "../../../../hooks/useContaBancaria";
import { IExcursao } from "../../../../models/excursao.model";

const handleSubmitRegisterSchema = z.object({
  passageiros: z
    .array(z.string())
    .min(1, {
      message: fieldRequired("passageiro"),
    }),
  idExcursao: z
    .string()
    .min(1, {
      message: fieldRequired('Excursão')
    }),
  codigoFormaPagamento: z
    .string()
    .min(1, {
      message: fieldRequired('Forma Pagamento')
    }),
  codigoContaBancaria: z
    .string()
    .optional(),
  desconto: z
    .number()
    .optional(),
  criancasColo: z
    .number()
    .optional(),
  quantidade: z
    .number()
    .optional(),
  subtotal: z
    .number()
    .optional(),
  total: z
    .number()
    .optional(),
  valorDesconto: z
    .number()
    .optional()
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterReserva {
  handleClose: () => void;
}

const ModalRegisterReservas = ({
  handleClose,
}: IModalRegisterReserva) => {
  const { user } = useGlobal();
  const { createReserva } = useReservas()
  const { getExcursoes, findExcursao } = useExcursoes()
  const { getAllPessoas } = usePessoas()
  const { getAllFormaPagamentos } = useFormaPagamento()
  const { getAllContaBancaria } = useContaBancaria()

  const { data: dataClientes, isLoading: loadingClientes } = getAllPessoas();
  const { data: dataExcursoes, isLoading: loadingExcursoes } = getExcursoes({ page: 1, size: 100 });
  const { data: dataFormaPagamentos, isLoading: loadingFormaPagamentos } = getAllFormaPagamentos();
  const { data: dataContaBancaria, isLoading: isLoadingContaBancaria } = getAllContaBancaria();
  const { mutate: mutateToGetExcursao, isLoading: isLoadingExcursao } = findExcursao();
  const [subTotal, setSubtotal] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [total, setTotal] = useState(0);
  const [valorDesconto, setValorDesconto] = useState(0);

  const {
    setValue,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate, isLoading } = createReserva(reset, handleClose);


  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    debugger
    mutate({
      ...submitData,
      codigoUsuario: user?.id
    })
  };

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

  const onSelectExcursao = async (excursao: string) => {
    if (excursao) {
      mutateToGetExcursao(excursao, {
        onSuccess: (data: IExcursao) => {
          setSubtotal(data.valor)
          calculateTotal(quantidade, data.valor, desconto)
          calculateDesconto(quantidade, data.valor, getValues("desconto") || 0)
        }
      });
    }
  };

  const onSelectPassageiros = async (option: Array<{ label: string, value: string }>) => {
    const qtd = option.length ? option.length : 0
    setQuantidade(qtd)
    setValue('quantidade', qtd)
    calculateTotal(qtd, subTotal, desconto)
    calculateDesconto(qtd, subTotal, desconto)
  }

  const calculateTotal = async (qtd: number, valorPacote: number, discount: number) => {
    let result = (((qtd || 1) * valorPacote) - ((valorPacote * discount / 100) * qtd))
    setTotal(result)
    setValue('total', result)
  }

  const calculateDesconto = async (qtd: number, valorPacote: number, desconto: number) => {
    let valorDesconto = ((valorPacote * desconto / 100) * qtd)
    setValorDesconto(valorDesconto)
    setValue('valorDesconto', valorDesconto)
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


        <SelectForm
          name="idExcursao"
          label="Excursão"
          minW="200px"
          isRequired
          isLoading={loadingExcursoes}
          handleChange={(option) => {
            setValue("idExcursao", option?.value);
            onSelectExcursao(option?.value || '')
            calculateTotal(quantidade, subTotal, desconto)
            calculateDesconto(quantidade, subTotal, getValues("desconto") || 0)
          }}
          options={dataExcursoes
            ?.map((codigoExcursao) => ({
              label: codigoExcursao?.nome,
              value: codigoExcursao?.id,
            }))}
          errors={errors.idExcursao}
        />

        <SelectForm
          name="passageiros"
          placeholder="Selecione"
          label="Passageiros"
          minW="200px"
          isRequired
          isMulti
          isSearchable
          isLoading={loadingClientes}
          handleChange={(option) => {
            setValue("passageiros", option?.map((item: IOption) => item?.value.toString()) || []);
            onSelectPassageiros(option)
          }}
          options={dataClientes
            ?.map((codigoPessoa) => ({
              label: codigoPessoa?.nome,
              value: codigoPessoa?.id,
            }))}
          errors={errors.passageiros}
        />

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >

          <SelectForm
            name="codigoFormaPagamento"
            label="Forma de Pagamento"
            minW="135px"
            isRequired
            isSearchable
            isLoading={loadingFormaPagamentos}
            handleChange={(option) => {
              setValue("codigoFormaPagamento", option?.value);
            }}
            options={dataFormaPagamentos
              ?.map((codigoFormaPagamento) => ({
                label: codigoFormaPagamento?.nome,
                value: codigoFormaPagamento?.id,
              }))}
            errors={errors.codigoFormaPagamento}
          />

          <SelectForm
            name="codigoContaBancaria"
            label="Conta Bancária"
            minW="135px"
            isSearchable
            isLoading={isLoadingContaBancaria}
            handleChange={(option) => {
              setValue("codigoContaBancaria", option?.value);
            }}
            options={dataContaBancaria
              ?.map((codigoContaBancaria) => ({
                label: codigoContaBancaria?.nome,
                value: codigoContaBancaria?.id,
              }))}
            errors={errors.codigoContaBancaria}
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
            <span>Desconto %</span>
            <Input
              height="40px"
              {...register("desconto")}
              placeholder="Desconto %"
              flex="1.01"
              type="number"
              prefix="percentual"
              onChange={(event) => {
                let newValue = parseInt(event.target.value)

                if ((Number(newValue) <= 100 && !isNaN(Number(newValue)))) {
                  setValue('desconto', newValue);
                } else {
                  setValue('desconto', 0);
                }
              }}
              onBlur={() => {
                setDesconto(getValues("desconto") || 0)
                calculateDesconto(quantidade, subTotal, getValues("desconto") || 0)
                calculateTotal(quantidade, subTotal, getValues("desconto") || 0)
              }}
              minW="250px"
            />
          </FieldWrap>

          <FormInputNumber
            height="40px"
            label="Crianças de colo"
            minWidth="100px"
            // maxWidth="50%"
            {...register("criancasColo")}
            setValue={setValue}
            placeholder="Quantidade"
            flex="1.01"
            maxLength={25}
            dontAllowNegative={true}
            name="criancasColo"
            errors={errors.criancasColo}
          />
        </Flex>

        <Flex
          gap="15px"
          flexDirection={{
            base: "column",
            lg: "row",
          }}>

          <FormInputNumber
            height="40px"
            label="SubTotal"
            minWidth="100px"
            {...register("subtotal")}
            setValue={setValue}
            value={subTotal}
            isMoneyValue={true}
            flex="1.01"
            maxLength={25}
            dontAllowNegative={true}
            readOnly={true}
          />

          <FieldWrap>
            <span>Quantidade </span>
            <Input
              height="40px"
              type="number"
              minWidth="80px"
              {...register("quantidade")}
              flex="1.01"
              value={quantidade}
              maxLength={25}
              readOnly={true}
              sx={{
                border: 'none',
                backgroundColor: '',
                color: 'black'
              }}
            />
          </FieldWrap>

          <FieldWrap>
            <FormInputNumber
              height="40px"
              type="number"
              label="Desconto"
              minWidth="100px"
              {...register("valorDesconto")}
              setValue={setValue}
              flex="1.01"
              value={valorDesconto}
              readOnly={true}
              isMoneyValue={true}
              dontAllowNegative={true}
            />
          </FieldWrap>

          <FormInputNumber
            height="40px"
            label="Total"
            minWidth="100px"
            {...register("total")}
            setValue={setValue}
            isMoneyValue={true}
            flex="1.01"
            value={total}
            maxLength={25}
            dontAllowNegative={true}
            readOnly={true}
          />
        </Flex>

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

export default ModalRegisterReservas;
