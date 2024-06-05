/* eslint-disable no-loops/no-loops */
import {
  Box,
  Button,
  Flex,
  Stack,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import Loading from "../../../components/Loading";
import { TBody, TD, THead, Table } from "../../../components/Table";

// Styled Components
import { Content } from "./styled";

// Hooks and utils
import TRBenefits from "../components/TRBenefits/TRBenfits";

// Types
import { IBenefitsAll } from "./types";

import { useEffect, useState } from "react";
import ButtonTabbed, {
  ButtonTabbedWrap,
} from "../../../components/ButtonTabbed";
import ColumnOrder from "../../../components/ColumnOrder";
import IndicateProductModal from "../../../components/IndicateProductModal";
import ProductSearchFilter from "../../../components/ProductSearchFilter/ProductSearchFilter";
import SimpleModal from "../../../components/SimpleModal";
import { useGlobal } from "../../../contexts/UserContext";
import { IDataProductContract } from "../../../models/product.model";
import { pixelToRem } from "../../../utils";
import Comparator from "../../../components/Comparator";
import AlertModal from "../../../components/AlertModal";
import AlertContent from "../../../components/AlertContent";
import HelpPopOver from "../../../components/HelpPopOver";
import {
  HelpContentDescription,
  HelpContentTitle,
  HelpContentWrapper,
} from "../../../components/ImplantationForm/ImplantationTabs/ActiveContractsTab/styled";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const BenefitsAll = ({
  data,
  isLoading,
  isFetching,
  setSearch,
  search,
  setOrderBy,
  orderBy,
  setOrder,
  order,
  counts,
  menu,
  currentTab,
  setCurrentTab,
  userId,
}: IBenefitsAll) => {
  const {
    isBroker,
    isCompany,
    isPartner,
    comparatorCount,
    setComparatorCount,
  } = useGlobal();

  const memoryProductComparator = localStorage.getItem("@comparatorSelected")
    ? JSON.parse(localStorage.getItem("@comparatorSelected") || "")
    : [];
  const [comparatorAlertModal, setComparatorAlertModal] = useState(false);
  const [comparatorAlertText, setcomparatorAlertText] = useState("");
  const [indicateProductModal, setIndicateProductModal] = useState(false);
  const [productComparator, setProductComparator] = useState<
    IDataProductContract[] | []
  >(memoryProductComparator || []);

  useEffect(() => {
    setProductComparator(memoryProductComparator || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const provideFavoriteOption = isBroker || isPartner || isCompany;

  const menuFirst = [
    {
      status: 1,
      name: "Produtos disponíveis",
      isDisabled: false,
    },
    provideFavoriteOption
      ? {
          status: 3,
          name: "Favoritos",
          isDisabled: isFetching,
        }
      : { status: 3, name: "", isDisabled: false },
    productComparator
      ? {
          status: 2,
          name: "Compare",
          isDisabled: isFetching,
        }
      : { status: 2, name: "", isDisabled: false },
  ];

  const menuFiltered = menuFirst.filter(({ name }) => name);

  const selectProduct = (product: IDataProductContract) => {
    setComparatorAlertModal(false);
    setcomparatorAlertText("");
    const productAlreadySelected = productComparator.find(
      ({ id }) => id === product?.id,
    );
    const productWithDifferentClass = productComparator.find(
      (currProduct) =>
        currProduct?.product?.productClass !== product?.product?.productClass,
    );
    const maximumQuantityProductsSelected = productComparator.length == 3;

    if (productAlreadySelected) {
      const cleanList = productComparator.filter(
        ({ id }) => id !== product?.id,
      );
      if (currentTab?.status === 2 && productComparator?.length === 1) {
        setCurrentTab({
          status: 1,
          name: "Produtos disponíveis",
          isDisabled: false,
        });
      }
      localStorage.setItem("@comparatorSelected", JSON.stringify(cleanList));
      return setProductComparator(cleanList);
    }
    if (maximumQuantityProductsSelected) {
      setComparatorAlertModal(true);
      setcomparatorAlertText("É possível comparar apenas três produtos.");
      return;
    }
    if (productWithDifferentClass) {
      setComparatorAlertModal(true);
      setcomparatorAlertText(
        "Produtos de classes diferentes não podem ser comparados.",
      );
      return;
    }

    setProductComparator((prevState) => [...prevState, product]);
    localStorage.setItem(
      "@comparatorSelected",
      JSON.stringify([...memoryProductComparator, product]),
    );
  };

  useEffect(() => {
    setComparatorCount(memoryProductComparator?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productComparator, comparatorCount]);

  return (
    <>
      <Content
        className="contentMain"
        // height="unset !important"
        padding={"0 !important"}
      >
        <Stack>
          <ButtonTabbedWrap>
            {menuFiltered.map((item) => (
              <ButtonTabbed
                key={item.status}
                selected={currentTab?.status === item.status}
                onClick={() => {
                  setCurrentTab(item);
                }}
                isDisabled={item.isDisabled}
              >
                {item.name}
                {item?.name === "Compare" && (
                  <Text
                    background="brand.50"
                    marginLeft="5px"
                    padding="2px 7px"
                    color="brand.500"
                    cursor="default"
                    borderRadius="5px"
                    fontWeight={500}
                    fontSize="0.9rem"
                  >
                    {comparatorCount}
                  </Text>
                )}
              </ButtonTabbed>
            ))}
          </ButtonTabbedWrap>
        </Stack>
        {currentTab?.status == 1 && (
          <Stack px="30px">
            <ProductSearchFilter
              isLoading={isLoading}
              setSearch={setSearch}
              search={search}
              counts={counts}
              menu={menu}
              setOrderBy={setOrderBy}
            />
          </Stack>
        )}

        {currentTab?.status === 2 ? (
          <Comparator isFetching={isFetching} setCurrentTab={setCurrentTab} />
        ) : (
          <>
            {isLoading && (
              <Box marginTop="50px">
                <Loading
                  productPage={
                    currentTab?.status === 3 && isFetching ? false : true
                  }
                />
              </Box>
            )}

            {!isLoading && (
              <>
                {data && data?.length > 0 && (
                  <>
                    <TableContainer marginBottom="10px">
                      <Table>
                        <THead>
                          <TD style={{ flex: "0 0 6%" }}>&nbsp;</TD>
                          <ColumnOrder
                            maxW="200px"
                            label="Fornecedor"
                            columnName="providerName"
                            setOrderBy={setOrderBy}
                            orderBy={orderBy}
                            setOrder={setOrder}
                            order={order}
                          >
                            <Text
                              background="brand.50"
                              padding="2px 7px"
                              color="brand.500"
                              cursor="default"
                              borderRadius="5px"
                              fontWeight={500}
                              fontSize="0.9rem"
                            >
                              {counts?.providersCount}
                            </Text>
                          </ColumnOrder>
                          <ColumnOrder
                            label="Produto"
                            columnName="reducedName"
                            setOrderBy={setOrderBy}
                            orderBy={orderBy}
                            setOrder={setOrder}
                            order={order}
                          >
                            <Text
                              background="brand.50"
                              padding="2px 7px"
                              color="brand.500"
                              cursor="default"
                              borderRadius="5px"
                              fontWeight={500}
                              fontSize="0.9rem"
                            >
                              {counts?.count}
                            </Text>
                          </ColumnOrder>
                          <TD maxW="200px">Valor</TD>
                          <TD maxW="80px">Simular</TD>
                          <TD maxW="80px" gap="5px">
                            Comparar
                            <HelpPopOver
                              content={
                                <HelpContentWrapper>
                                  <HelpContentTitle>Ajuda</HelpContentTitle>
                                  <HelpContentDescription>
                                    Selecione até 3 produtos e clique na aba
                                    &apos;Compare&apos; para verificar o
                                    comparativo entre eles.
                                  </HelpContentDescription>
                                </HelpContentWrapper>
                              }
                            />
                          </TD>
                          <TD style={{ flex: "0 0 5%" }}>Aderir</TD>
                        </THead>
                        <TBody>
                          {data.map((item, index) => {
                            return (
                              <TRBenefits
                                key={index}
                                item={item}
                                userId={userId}
                                provideFavoriteOption={provideFavoriteOption}
                                selectProduct={selectProduct}
                                selectedProducts={productComparator}
                                isFetching={isFetching}
                              />
                            );
                          })}
                        </TBody>
                      </Table>
                    </TableContainer>
                    {currentTab?.status !== 3 && (
                      <Flex padding="0 15px" justifyContent="space-between">
                        <Box flex="1"></Box>
                        <Flex
                          alignItems="center"
                          gap="5px"
                          fontSize={pixelToRem(15)}
                        >
                          Não encontrou o que procura?{" "}
                          <Button
                            padding="5px"
                            maxH="28px"
                            w="116px"
                            borderRadius="4px"
                            onClick={() => setIndicateProductModal(true)}
                            display="flex"
                            h="28px"
                            alignItems="center"
                          >
                            <Text fontSize={pixelToRem(14)} marginRight="5px">
                              Solicite aqui
                            </Text>
                            <HiPlus size={15} />
                          </Button>
                        </Flex>
                      </Flex>
                    )}
                  </>
                )}
                {data?.length === 0 && (!isLoading || !isFetching) && (
                  <AlertNoDataFound
                    title={
                      currentTab?.status === 3
                        ? "Nenhum produto favoritado"
                        : "Nenhum produto disponível"
                    }
                    buttonTitle={
                      currentTab?.status === 3 ? "Produtos disponíveis" : ""
                    }
                    onClick={
                      currentTab?.status === 3
                        ? () => {
                            setCurrentTab({
                              status: 1,
                              name: "Produtos disponíveis",
                              isDisabled: false,
                            });
                          }
                        : undefined
                    }
                  />
                )}
              </>
            )}
          </>
        )}
      </Content>

      {indicateProductModal && (
        <SimpleModal
          isOpen={indicateProductModal}
          handleModal={setIndicateProductModal}
          size="2xl"
          minHeight="650px"
          title="Não encontrou o que estava procurando?"
        >
          <IndicateProductModal />
        </SimpleModal>
      )}

      {comparatorAlertModal && (
        <AlertModal
          request={() => setComparatorAlertModal(false)}
          showModal={comparatorAlertModal}
          setShowModal={setComparatorAlertModal}
          size="md"
          confirmButtonTitle="OK"
          hasNotCancelButton={true}
        >
          <AlertContent title={comparatorAlertText} />
        </AlertModal>
      )}
    </>
  );
};

export default BenefitsAll;
