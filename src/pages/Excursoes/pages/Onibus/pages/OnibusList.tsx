import { useState } from 'react';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import { Content, SectionTop } from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import useExcursoes from '../../../../../hooks/useExcursao';
import Loading from '../../../../../components/Loading';
import useExcursaoOnibus from '../../../../../hooks/useExcursaoOnibus';
import useExcursaoQuarto from "../../../../../hooks/useExcursaoQuarto";
import { z } from 'zod';
import { fieldRequired } from '../../../../../utils/messagesError';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobal } from '../../../../../contexts/UserContext';
import SelectForm from '../../../../../components/SelectForm';

const handleSubmitRegisterSchema = z.object({
  codigoPassageiro: z
    .string()
    .min(1, {
      message: fieldRequired("local de embarque"),
    }),
  numeroCadeira: z
    .string()
    .min(1, {
      message: fieldRequired("Cadeira")
    })

});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

function OnibusList() {
  const navigate = useNavigate();
  const { user } = useGlobal();
  const { id: _id } = useParams();
  const { getExcursao } = useExcursoes();
  const { getAcentos, createExcursaoOnibus, listExcursaoPassageirosNoChair } = useExcursaoOnibus();
  const { data: dataExcursao, isLoading: loadingExcursao } = getExcursao(_id || '');
  const { data: dataPassageiros, isLoading: loadingPassageiros } = listExcursaoPassageirosNoChair(_id || '');
  const registerPerPage = 10
  const [currentPage, setCurrentPage] = useState(1);
  const [acentos, setAcentoName] = useState('')
  const { mutate: mutateTocreateOnibus, isLoading: isLoadingOnibus } = createExcursaoOnibus();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema)
  });

  const { data, count, isLoading } = getAcentos({
    size: registerPerPage,
    page: currentPage
  }, _id || '');

  const saveAcentoOnibus = async (passageiro: string, acento: string) => {
    mutateTocreateOnibus({
      numeroCadeira: acento,
      codigoExcursao: _id || '',
      codigoPassageiro: passageiro,
      usuarioCadastro: user?.id,
    })
  };

  return (
    <>
      <Flex>
        <SectionTop className="contentTop" gap="30px">
          <Button
            variant="outline"
            width="74px"
            onClick={() => navigate("/excursoes")}
          >
            Voltar
          </Button>

          <Flex gap="10px" flexWrap="wrap">
            <Text fontSize="2xl" fontWeight="bold">
              Ônibus:
            </Text>
            <Text fontSize="2xl">
              {dataExcursao.nome}
            </Text>
          </Flex>
        </SectionTop>
      </Flex>

      <Content className="contentMain">
        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}
        {!isLoading && (
          <>
            <Flex width="100%">
              <Grid templateColumns={`repeat(1, 1fr)`} gap={5}>
                {data.map((item, index) => (
                  <h2>
                    <Box as='span' flex='1' textAlign='left'>
                      <Flex
                        gap="15px"
                        flexDirection={{
                          base: "column",
                          lg: "row",
                        }}>
                        <Text fontSize="1xl">
                          Poltrona Nº {currentPage == 1 ? `${index + 1}` : `${currentPage - 1}${index}`}
                        </Text>

                        <SelectForm
                          name="codigoPassageiro"
                          maxW='100px'
                          isRequired
                          handleChange={(option) => {
                            setValue("codigoPassageiro", option?.value);
                            saveAcentoOnibus(option.value || '', option.data.index)
                          }}
                          options={dataPassageiros
                            ?.map((passageiro) => ({
                              label: passageiro?.Pessoa?.nome,
                              value: passageiro?.id,
                              data: {
                                index: currentPage == 1 ? `${index + 1}` : `${currentPage - 1}${index}`
                              }
                            }))}
                          defaultValue={{
                            label: item?.Passageiro?.Pessoa.nome,
                            value: item?.id
                          }}
                          errors={errors.codigoPassageiro}
                        />
                      </Flex>
                    </Box>
                  </h2>

                ))}
              </Grid>
            </Flex>
          </>
        )}
      </Content >

    </>
  );
}

export default OnibusList;
