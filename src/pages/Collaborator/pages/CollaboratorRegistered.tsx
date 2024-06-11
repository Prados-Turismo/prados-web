import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import FieldSearch from "../../../components/FieldSearch";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import SimpleModal from "../../../components/SimpleModal";
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";
import { ISelect } from "../../../models/generics.model";
import { cpfHidden, cpfMask } from "../../../utils";
import { capitalize } from "../../../utils/capitalize";
import IconGroupCollaborator from "../components/IconGroupCollaborator";
import ModalRecordCollaborator from "../components/ModalRecordCollaborator";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const CollaboratorList = () => {
  const { getCollaborators } = useCollaborator();
  const { company } = useGlobal();
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [resetFilter, setResetFilter] = useState(false);
  const [modalRecordCollaborator, setModalRecordCollaborator] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading, setFieldSearch } = getCollaborators({
    size: registerPerPage,
    page: currentPage,
    companyId: company!.externalCompanyId,
    status: statusSelected
      ? statusSelected?.value === 1
        ? true
        : false
      : null,
  });

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          leftIcon={<IoIosAdd />}
          onClick={() => {
            setModalRecordCollaborator(true);
          }}
        >
          Cadastrar pacote
        </Button>
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <div className="searchWrap">
            <span>Buscar pacote</span>
            <FieldSearch
              placeholder="Nome ou CPF"
              handleSearch={(value) => {
                setResetFilter(false);
                setFieldSearch(value);
                setCurrentPage(1);
              }}
              reset={resetFilter}
            />
          </div>
          <Flex flexDirection="column" gap="5px" width="300px">
            <span>Status</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum Status encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={[
                {
                  label: "Completo",
                  value: 1,
                },
                {
                  label: "Incompleto",
                  value: 2,
                },
              ]}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setFieldSearch(null);
              setResetFilter(true);
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
                      <TD style={{ flex: "0 0 10%" }}>Status do cadastro</TD>
                      <TD style={{ flex: "0 0 30%" }}>Colaborador</TD>
                      <TD>CPF</TD>
                      <TD>Categoria</TD>
                      <TD>Subcategoria</TD>
                      <TD style={{ flex: "0 0 10%", minWidth: "100px" }}>
                        &nbsp;
                      </TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD style={{ flex: "0 0 10%" }}>
                            {item?.beneficiaryStatus === "A"
                              ? "Completo"
                              : "Incompleto"}
                          </TD>
                          <TD style={{ flex: "0 0 30%" }}>
                            <TooltipSubstring
                              name={capitalize(item.person?.name) || "-"}
                              length={25}
                            />
                          </TD>
                          <TD>
                            {item.person?.cpf
                              ? cpfHidden(cpfMask(item.person?.cpf))
                              : "-"}
                          </TD>
                          <TD>
                            <TooltipSubstring
                              name={item.sector?.name || "-"}
                              length={18}
                            />
                          </TD>
                          <TD>
                            <TooltipSubstring
                              name={item.position?.name || "-"}
                              length={18}
                            />
                          </TD>
                          <TD style={{ flex: "0 0 10%" }}>
                            <IconGroupCollaborator
                              item={item}
                              filter={
                                item?.beneficiaryStatus === "A"
                                  ? "complete"
                                  : "incomplete"
                              }
                              menu={1}
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
              <AlertNoDataFound title="Nenhum pacote encontrado" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Pacote"
        size="xl"
        isOpen={modalRecordCollaborator}
        handleModal={setModalRecordCollaborator}
      >
        <ModalRecordCollaborator
          companyId={company!.externalCompanyId}
          handleClose={() => setModalRecordCollaborator(false)}
        />
      </SimpleModal>
    </>
  );
};

export default CollaboratorList;
