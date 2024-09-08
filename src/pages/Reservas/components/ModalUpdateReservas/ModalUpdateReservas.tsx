/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import useReservas from "../../../../hooks/useReservas";
import usePessoas from "../../../../hooks/usePessoas";
import useFormaPagamento from "../../../../hooks/useFormaPagamento";
import useContaBancaria from "../../../../hooks/useContaBancaria";
import useExcursoes from "../../../../hooks/useExcursao";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import { useGlobal } from "../../../../contexts/UserContext";
import { IReserva } from "../../../../models/reservas.model";
import FormInputNumber from "../../../../components/FormInputNumber";
import SelectForm from "../../../../components/SelectForm";
import { IOption } from "../../../../components/SelectForm/types";
import useLocalEmbarque from "../../../../hooks/useLocalEmbarque";
import ReactSelect from "react-select";
import { useState } from "react";
import { IExcursao } from "../../../../models/excursao.model";
import { formattingDate } from "../../../../utils/formattingDate";
import useProduct from "../../../../hooks/useProducts";
import Opcionais from "../Opcionais";

const opcionalSchema = z.object({
  id: z.string(),
  quantidade: z.number().min(0),
  valor: z.number().min(0),
  nome: z.string()
});

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
    .optional(),
  localEmbarqueId: z
    .string()
    .min(1, {
      message: fieldRequired('Local de embarque')
    }),
  valorOpcionais: z
    .number()
    .optional(),
  opcionais: z
    .array(opcionalSchema)
    .optional(),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalUpdateReserva {
  handleClose: () => void
  data: IReserva
}

const ModalUpdateReserva = ({
  handleClose,
  data
}: IModalUpdateReserva) => {
  const { user } = useGlobal();
  const { updateReserva } = useReservas();
  const { getAllPessoas } = usePessoas()
  const { getAllFormaPagamentos } = useFormaPagamento()
  const { getAllContaBancaria } = useContaBancaria()
  const { getLocalEmbarque } = useLocalEmbarque()
  const { getExcursoes, findExcursao } = useExcursoes()
  const { getAllProducts } = useProduct()

  const { data: dataClientes, isLoading: loadingClientes } = getAllPessoas();
  const { data: dataFormaPagamentos, isLoading: loadingFormaPagamentos } = getAllFormaPagamentos();
  const { data: dataContaBancaria, isLoading: isLoadingContaBancaria } = getAllContaBancaria();
  const { data: localEmbarqueData, isLoading: isLoadingLocalEmbarque } = getLocalEmbarque()
  const { data: dataExcursoes, isLoading: loadingExcursoes } = getExcursoes({ page: 1, size: 100 });
  const { mutate: mutateToGetExcursao, isLoading: isLoadingExcursao } = findExcursao();
  const { data: produtoData, isLoading: isLoadingProduto } = getAllProducts()
  const [quantidade, setQuantidade] = useState(data.Pessoa.length);
  const [subTotal, setSubtotal] = useState(data.Excursao.valor);
  const [desconto, setDesconto] = useState(data.desconto);
  const [total, setTotal] = useState((subTotal * quantidade) - desconto);
  const [valorDesconto, setValorDesconto] = useState(data.desconto);
  const [valorOpcionais, setValorOpcionais] = useState(0);

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
      criancasColo: data.criancasColo,
      localEmbarqueId: data.LocalEmbarque.id,
      codigoContaBancaria: data.Transacoes[0].ContaBancaria?.id,
      codigoFormaPagamento: data.Transacoes[0].FormaPagamento.id,
      idExcursao: data.Excursao.id,
      opcionais: data.Opcionais,
      passageiros: data.Pessoa.map((passageiro) => { return passageiro.id })
    }
  });
  const { mutate, isLoading } = updateReserva(reset, handleClose);

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      ...data,
      codigoUsuario: user?.id
    })
  };

  const onSelectExcursao = async (excursao: string) => {
    if (excursao) {
      mutateToGetExcursao(excursao, {
        onSuccess: (data: IExcursao) => {
          setSubtotal(data.valor)
          calculateTotal(quantidade, data.valor, desconto)
          calculateDesconto(desconto || 0)
        }
      });
    }
  };

  const onSelectPassageiros = async (option: Array<{ label: string, value: string }>) => {
    const qtd = option.length ? option.length : 0
    setQuantidade(qtd)
    setValue('quantidade', qtd)
    calculateTotal(qtd, subTotal, desconto)
    calculateDesconto(desconto)
  }

  const calculateTotal = async (qtd: number, valorPacote: number, discount: number, totalOpcionais?: number) => {
    let result = (((qtd || 1) * valorPacote) + (totalOpcionais || valorOpcionais)) - (discount)
    setTotal(result)
    setValue('total', result)
  }

  const calculateDesconto = async (desconto: number) => {
    let newDesconto = desconto
    setValorDesconto(newDesconto)
    setValue('valorDesconto', newDesconto)
  }

  const handleOpcionaisTotalChange = (totalOpcionais: number) => {
    setValorOpcionais(totalOpcionais);
    setValue('valorOpcionais', totalOpcionais);
    calculateTotal(quantidade, subTotal, desconto, totalOpcionais)
  };

  const handleQuantitiesChange = (quantities: { id: string; quantidade: number; valor: number, nome: string }[]) => {
    setValue('opcionais', quantities);
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
            calculateDesconto(getValues("valorDesconto") || 0)
          }}
          options={dataExcursoes
            ?.map((codigoExcursao) => ({
              label: `${formattingDate(codigoExcursao.dataInicio)} à ${formattingDate(codigoExcursao.dataFim)} - ${codigoExcursao?.nome}`,
              value: codigoExcursao?.id,
            }))}
          defaultValue={{
            value: data.Excursao.id,
            label: `${formattingDate(data.Excursao.dataInicio)} à ${formattingDate(data.Excursao.dataFim)} - ${data.Excursao?.nome}`
          }}
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
            defaultValue={{
              value: data.Transacoes[0].FormaPagamento.id,
              label: data.Transacoes[0].FormaPagamento.nome
            }}
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
            defaultValue={{
              value: data.Transacoes[0].ContaBancaria?.id,
              label: data.Transacoes[0].ContaBancaria?.nome
            }}
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

          <FormInputNumber
            height="40px"
            label="Crianças de colo"
            minWidth="250px"
            maxWidth="250px"
            {...register("criancasColo")}
            setValue={setValue}
            placeholder="Quantidade"
            flex="1.01"
            maxLength={25}
            dontAllowNegative={true}
            name="criancasColo"
            value={data.criancasColo}
            errors={errors.criancasColo}
          />

          <FieldWrap width="250px">
            <span>Local De Embarque</span>
            <ReactSelect
              {...register('localEmbarqueId')}
              name="localEmbarqueId"
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum local encontrado"}
              isLoading={isLoadingLocalEmbarque}
              onChange={(item) => {
                setValue('localEmbarqueId', item?.value || '')
              }}
              options={localEmbarqueData.map((local) => {
                return { value: local.id, label: local.nome }
              })}
              defaultValue={{
                value: data.LocalEmbarque.id,
                label: data.LocalEmbarque.nome
              }}
            />

          </FieldWrap>

        </Flex>

        {!isLoadingExcursao && produtoData && (
          <Opcionais
            produtoData={produtoData}
            onTotalChange={handleOpcionaisTotalChange}
            onQuantitiesChange={handleQuantitiesChange}
            updateData={data}
          />
        )}


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

export default ModalUpdateReserva;
