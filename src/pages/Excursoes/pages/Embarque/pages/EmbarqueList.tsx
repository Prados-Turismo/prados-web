import { Button, Checkbox, Flex, TableContainer, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../../../components/Loading";
import Pagination from "../../../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import { ISelect } from "../../../../../models/generics.model";
import AlertNoDataFound from "../../../../../components/AlertNoDataFound";
import { useNavigate, useParams } from "react-router-dom";
import useExcursaoPassageiro from "../../../../../hooks/useExcursaoPassageiros";
import useExcursao from "../../../../../hooks/useExcursao";
import { IExcursaoEmbarque, IUpdateExcursaoEmbarqueArgs, IUpdateExcursaoEmbarqueResponse } from "../../../../../models/excursao-embarque.model";
import useExcursaoEmbarque from "../../../../../hooks/useExcursaoEmbarque";
import { useGlobal } from "../../../../../contexts/UserContext";
import useLocalEmbarque from "../../../../../hooks/useLocalEmbarque";

const EmbarqueList = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const { getAllPassageiros } = useExcursaoPassageiro();
  const { getExcursao } = useExcursao();
  const { createExcursaoEmbarque, updateExcursaoEmbarque } = useExcursaoEmbarque()
  const { getLocalEmbarque } = useLocalEmbarque()
  const [checkEmbarqueDesembarque, setcheckEmbarqueDesembarque] = useState<boolean>(false);
  const { user } = useGlobal();

  const { data: dataExcursao, isLoading: loadingExcursao } = getExcursao(_id || '');
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getAllPassageiros({
    size: registerPerPage,
    page: currentPage
  }, _id || '');
  const { mutate: mutateToCreateEmbarque, isLoading: isLoadingCreateEmbarque } = createExcursaoEmbarque()
  const { mutate: mutateToUpdateEmbarque, isLoading: isLoadingUpdateEmbarque } = updateExcursaoEmbarque()
  const { data: localEmbarqueData, isLoading: isLoadingLocalEmbarque } = getLocalEmbarque()

  const embarqueDesembarque = (dadosEmbarque: IUpdateExcursaoEmbarqueArgs) => {
    if (!isLoadingCreateEmbarque && !isLoadingUpdateEmbarque) {
      if (dadosEmbarque.id) {
        mutateToUpdateEmbarque(dadosEmbarque)
      } else {
        mutateToCreateEmbarque(dadosEmbarque)
      }
    }
  }

  return (
    <>
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
            Embarque:
          </Text>
          <Text fontSize="2xl">
            {dataExcursao.nome}
          </Text>
        </Flex>
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <Flex flexDirection="column" gap="5px" width="500px">
            <span>Local</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum local encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={localEmbarqueData.map((local) => {
                return { value: local.id, label: local.nome }
              })}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setStatusSelected(null);
            }}
          >
            Limpar Filtros
          </Button>
        </Flex>

        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding="0 30px 0 30px">
                      <TD>Passageiro</TD>
                      <TD>Local de Embarque</TD>
                      <TD>Hora Prevista</TD>
                      <TD>Hora Embarque</TD>
                      <TD>Embarcou?</TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.Pessoa.id}>
                          <TD>
                            {item.Pessoa.nome}
                          </TD>
                          <TD>
                            {item?.LocalEmbarque.nome}
                          </TD>
                          <TD>
                            {item.LocalEmbarque.horaEmbarque}
                          </TD>
                          <TD>
                            {item.horaEmbarque}
                          </TD>
                          <TD>
                            <Checkbox
                              borderColor="#909090"
                              isChecked={item.embarcou}
                              _checked={{
                                ".chakra-checkbox__control": {
                                  bgColor: "brand.500",
                                  borderColor: "brand.500",
                                  boxShadow: "none",
                                },
                                ".chakra-checkbox__control:hover": {
                                  bgColor: "brand.500",
                                  borderColor: "brand.500",
                                  boxShadow: "none",
                                },
                              }}
                              onChange={(event) => {
                                setcheckEmbarqueDesembarque(event.target.checked ? true : false)
                                if (!isLoadingCreateEmbarque && !isLoadingUpdateEmbarque) {
                                  embarqueDesembarque({
                                    'codigoPassageiro': item.Pessoa.id,
                                    'codigoLocalEmbarque': item.LocalEmbarque.id,
                                    'embarcou': event.target.checked ? true : false,
                                    'horaEmbarque': '12:00:00',
                                    'codigoExcursao': _id || '',
                                    'usuarioCadastro': user?.id || '',
                                    'id': item.hasBoarded
                                  })
                                }
                              }}
                            />
                          </TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhuma excursão encontrado" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default EmbarqueList;
