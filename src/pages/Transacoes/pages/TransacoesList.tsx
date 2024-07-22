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
import { ISelect } from "../../../models/generics.model";
import ModalRecordTransacao from "../components/ModalRegisterTransacao";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import useProduct from "../../../hooks/useProducts";
import { MdEdit } from "react-icons/md";
import { IDataProduct } from "../../../models/product2.model";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import ModalUpdateTransacao from "../components/ModalUpdateTransacao";

const TransacoesList = () => {
  const { getProducts, deleteProduto } = useProduct();
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [resetFilter, setResetFilter] = useState(false);
  const [modalRecordTransacao, setModalRecordProduct] = useState(false);
  const [modalUpdateProduct, setModalUpdateTransacao] = useState(false);
  const [modalRemoveProduto, setModalRemoveProduto] = useState(false);
  const [productData, setProductData] = useState<IDataProduct | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { mutate: mutateToDeleteProduto } = deleteProduto();
  const [deleteItemId, setDeleteProdutoId] = useState('');

  const { data, count, isLoading } = getProducts({
    size: registerPerPage,
    page: currentPage
  });

  const onConfirmRemoveProduto = () => {
    mutateToDeleteProduto(deleteItemId || "");
    setModalRemoveProduto(false);
  };

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          leftIcon={<IoIosAdd />}
          onClick={() => {
            setModalRecordProduct(true);
          }}
        >
          Cadastrar transação
        </Button>
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <div className="searchWrap">
            <span>Buscar transação</span>
            <FieldSearch
              placeholder="Nome ou CPF"
              handleSearch={() => {
                setResetFilter(false);
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
                      <TD>Efetivado</TD>
                      <TD>Data</TD>
                      <TD>Tipo</TD>
                      <TD>Valor</TD>
                      <TD>Forma de pagamento</TD>
                      <TD>Recebimento</TD>
                      <TD>Visto</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.nome}
                          </TD>
                          <TD>
                            {item.estoque}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD>
                            {item.Fornecedor.nome}
                          </TD>
                          <TD gap={3}>
                            <MdEdit
                              size={20}
                              // color={customTheme.colors.brandSecond.first}
                              cursor="pointer"
                              onClick={() => {
                                setProductData(item)
                                setModalUpdateTransacao(true)
                              }}
                            />

                            <ButtonIcon tooltip="Excluir transação">
                              <Button
                                variant="unstyled"
                                display="flex"
                                alignItems="center"
                                colorScheme="red"
                                onClick={() => {
                                  setModalRemoveProduto(true)
                                  setDeleteProdutoId(item.id)
                                }}
                              >
                                <FiTrash />
                              </Button>
                            </ButtonIcon>
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
              <AlertNoDataFound title="Nenhuma transação encontrada" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Transação"
        size="xl"
        isOpen={modalRecordTransacao}
        handleModal={setModalRecordProduct}
      >
        <ModalRecordTransacao
          handleClose={() => setModalRecordProduct(false)}
        />
      </SimpleModal>

      {productData && (
        <SimpleModal
          title="Transação"
          size="xl"
          isOpen={modalUpdateProduct}
          handleModal={setModalUpdateTransacao}
        >
          <ModalUpdateTransacao
            handleClose={() => setModalUpdateTransacao(false)}
            data={productData}
          />
        </SimpleModal>
      )}

      {modalRemoveProduto && (
        <AlertModal
          title="Remover transação"
          question="Deseja realmente remover esta transação?"
          request={onConfirmRemoveProduto}
          showModal={modalRemoveProduto}
          setShowModal={setModalRemoveProduto}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default TransacoesList;
