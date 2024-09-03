import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Asterisk from '../../../../components/Asterisk';
import usePacotes from '../../../../hooks/usePacotes';
import useExcursoes from '../../../../hooks/useExcursao';
import { fieldRequired } from '../../../../utils/messagesError';
import { FieldWrap } from './styled';
import ReactSelect from 'react-select';
import { useGlobal } from '../../../../contexts/UserContext';
import FormInputNumber from '../../../../components/FormInputNumber';
import FormInput from '../../../../components/FormInput';
import { useState } from 'react';
import { isDateLessThan150YearsAgo } from '../../../../utils/formattingDate';
import { IoAddCircleOutline } from 'react-icons/io5';
import useFornecedor from '../../../../hooks/useFornecedor';
import { dateFormat } from '../../../../utils';

const handleSubmitRegisterSchema = z.object({
  nome: z
    .string()
    .min(1, {
      message: fieldRequired('nome')
    }),
  codigoPacote: z
    .string()
    .min(1, {
      message: fieldRequired('pacote')
    }),
  dataInicio: z
    .string()
    .min(1, {
      message: fieldRequired('data de início')
    }),
  dataFim: z
    .string()
    .min(1, {
      message: fieldRequired('data de fim')
    }),
  vagas: z
    .number()
    .min(1, {
      message: fieldRequired('vagas')
    }),
  valor: z
    .number()
    .min(1, {
      message: fieldRequired('valor')
    }),
  observacoes: z
    .string()
    .optional(),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  handleClose: () => void;
}

const ModalRegisterExcursao = ({ handleClose }: IModalRecordCollaborator) => {
  const { user } = useGlobal();
  const { createExcursao } = useExcursoes();
  const { getAllPacotes } = usePacotes();
  const { getAllFornecedores } = useFornecedor();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [items, setItems] = useState<{
    fornecedor: {
      id: string;
      nome: string;
    };
    valor: string;
    data: string;
  }[]>([]);
  const [errorDate, setErrorDate] = useState({ message: '' });
  const [fornecedor, setFornecedor] = useState({
    id: '',
    nome: '',
  });
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

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
  const { data: dataFornecedores, isLoading: loadingFornecedores } = getAllFornecedores();

  const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
    mutate({
      ...submitData,
      ativo: true,
      usuarioCadastro: user?.id,
      itensAdicionais: items.map((item) => ({
        idFornecedor: item.fornecedor.id,
        valor: item.valor,
        data: item.data,
      }))
    });
  };

  const handleAddItem = () => {
    setItems([...items, {
      fornecedor: {
        id: fornecedor.id,
        nome: fornecedor.nome,
      },
      valor,
      data
    }]);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitRegister)} style={{ width: '100%' }}>
        <Box display="flex" flexDirection="column" gap="25px" padding="30px">
          <span>
            (<Asterisk />) indica os campos obrigatórios
          </span>

          <FieldWrap>
            <span>
              Nome <Asterisk />
            </span>
            <Input placeholder="Digite o nome" id="nome" type="text" {...register('nome')} />
            {errors.nome && <p className="error">{errors.nome.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Pacote <Asterisk />
            </span>
            <Box display="flex" gap="10px">
              <ReactSelect
                isLoading={loadingPacotes}
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect
                {...register?.('codigoPacote')}
                isSearchable
                placeholder="Selecione"
                noOptionsMessage={() => 'Não há pacote cadastrado'}
                options={dataPacotes?.map((pacote) => ({
                  label: pacote?.nome,
                  value: pacote?.id,
                }))}
                name="codigoPacote"
                id="codigoPacote"
                onChange={(option) => {
                  setValue('codigoPacote', option?.value.toString() || '');
                }}
              />
            </Box>
          </FieldWrap>

          <Flex gap="15px" flexDirection={{ base: 'column', lg: 'row' }}>
            <FormControl isRequired isInvalid={!!errorDate?.message}>
              <FormLabel>Data de início</FormLabel>
              <Input
                name="dataInicio"
                type="date"
                placeholder="dd/mm/aaaa"
                onChange={({ target: { value } }) => {
                  const dataAtual = new Date();
                  const data = new Date(value);

                  if (data < dataAtual) {
                    setErrorDate({ message: 'A data de início não pode ser inferior a data atual' });
                  } else if (isDateLessThan150YearsAgo(data)) {
                    setErrorDate({ message: 'A data de início não pode ser inferior há 150 anos atrás' });
                  } else {
                    setErrorDate({ message: '' });
                  }
                  setValue('dataInicio', value);
                }}
                max="2099-12-31"
                maxLength={10}
              />
              <FormErrorMessage>{errorDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errorDate?.message}>
              <FormLabel>Data de fim</FormLabel>
              <Input
                name="dataFim"
                type="date"
                placeholder="dd/mm/aaaa"
                onChange={({ target: { value } }) => {
                  const dataAtual = new Date();
                  const data = new Date(value);

                  if (data < dataAtual) {
                    setErrorDate({ message: 'A data de fim não pode ser inferior a data atual' });
                  } else if (isDateLessThan150YearsAgo(data)) {
                    setErrorDate({ message: 'A data de fim não pode ser inferior há 150 anos atrás' });
                  } else {
                    setErrorDate({ message: '' });
                  }
                  setValue('dataFim', value);
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
            {...register('valor')}
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
            {...register('observacoes')}
            inputArea
            errors={errors.observacoes}
            onChangeTextarea={(event) => setValue('observacoes', event.target.value || '')}
          />

          <Flex justifyContent="space-between">
            <Flex justifyContent="start">
              <h1><b>Itens Adicionais</b></h1>
            </Flex>

            <Flex justifyContent="flex-end">
              <IconButton icon={<IoAddCircleOutline />} onClick={onOpen} aria-label="Adicionar item" />
            </Flex>
          </Flex>

          <Box border="1px solid #ccc" borderRadius="5px" minHeight={20}>
            {items.map((item, index) => (
              <Box key={index} p="10px" border="1px solid #ccc" borderRadius="5px" m="10px">
                <p><b>Fornecedor:</b> {item.fornecedor.nome}</p>
                <p><b>Valor:</b> {item.valor}</p>
                <p><b>Data:</b> {dateFormat(new Date(item.data))}</p>
              </Box>
            ))}
          </Box>

          <Flex justifyContent="flex-end" gap="15px">
            <Button isDisabled={isLoading} isLoading={isLoading} type="submit">
              Cadastrar
            </Button>
          </Flex>
        </Box>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FieldWrap>
              <span>Fornecedor <Asterisk /></span>

              <Box display="flex" gap="10px">
                <ReactSelect
                  required
                  isLoading={loadingFornecedores}
                  className="select-fields large"
                  classNamePrefix="select"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  placeholder="Selecione"
                  noOptionsMessage={() => "Não há fornecedor cadastrado"}
                  options={dataFornecedores
                    ?.map((fornecedor) => ({
                      label: fornecedor?.nome,
                      value: fornecedor?.id,
                    }))}
                  name="codigoFornecedor"
                  id="codigoFornecedor"
                  onChange={(option) => {
                    setFornecedor({
                      id: option?.value.toString() || "",
                      nome: option?.label || "",
                    })
                  }}
                />
              </Box>
            </FieldWrap>
            <FormControl mt="4">
              <FormInputNumber
                height="40px"
                label="Valor"
                minWidth="200px"
                setValue={setValor}
                isMoneyValue
                flex="1.01"
                name="valor"
                maxLength={25}
                isRequired
                dontAllowNegative
                isStateForm
              />
            </FormControl>
            <FormControl mt="12">
              <FormLabel>Data <Asterisk /></FormLabel>
              <Input
                type="date"
                placeholder="dd/mm/aaaa"
                max="2099-12-31"
                maxLength={10}
                required
                onChange={(e) => setData(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex gap="15px" justifyContent="space-between">
              <Button
                border="none"
                background="#F5F5F5"
                borderRadius="4px"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddItem}>
                Adicionar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegisterExcursao;
