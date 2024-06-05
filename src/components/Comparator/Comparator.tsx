import { useEffect, useRef, useState } from "react";
import { IDataProductContract } from "../../models/product.model";
import "./printStyle.css";
import { Box, Button, Flex, useTheme } from "@chakra-ui/react";
import ComparatorTable from "./components/ComparatorTable";
import { dateFormat, genericSort, pixelToRem } from "../../utils";
import { IComparator } from "./types";
import { useReactToPrint } from "react-to-print";
import ComparatorColumnAdhesionContent from "./components/ComparatorColumnAdhesionContent";
import ComparatorDetails from "./components/ComparatorDetails";
import AlertNoDataFound from "../AlertNoDataFound";

const Comparator = ({ isFetching, setCurrentTab }: IComparator) => {
  const theme = useTheme();
  const [ansProducts, setAnsProdcts] = useState<IDataProductContract[]>([]);
  const [personalizedProducts, setPersonalizedProdcts] = useState<
    IDataProductContract[]
  >([]);

  const componentRef = useRef(null);
  const [loadingPrint, setLoadingPrint] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      document.title = `comparador-fiibo.pdf`;
      setLoadingPrint(true);
    },
    onAfterPrint: () => {
      document.title = `Fiibo - Produtos`;
      setLoadingPrint(false);
    },
  });

  const handleSetProductsDataState = (products: IDataProductContract[]) => {
    const ansData = products
      ?.filter(
        (product) =>
          product?.precification[0]?.holder.length === 10 ||
          product?.precification[0]?.holder[0]?.range === "0 a 999",
      )
      ?.sort((a: IDataProductContract, b: IDataProductContract) =>
        genericSort(a?.precification[0]?.holder, b?.precification[0]?.holder, {
          property: "length",
          isDescending: true,
        }),
      );
    const personalizedData = products?.filter(
      (product) =>
        product?.precification[0]?.holder.length !== 10 &&
        product?.precification[0]?.holder[0]?.range !== "0 a 999",
    );

    setAnsProdcts(ansData);
    setPersonalizedProdcts(personalizedData);
  };

  const handleRemoveProduct = (id: string) => {
    const productsLocalStorageData =
      localStorage.getItem("@comparatorSelected") || "";

    const products: IDataProductContract[] = JSON.parse(
      productsLocalStorageData,
    )
      ?.filter((el: IDataProductContract) => el?.id !== id)
      ?.sort((a: IDataProductContract, b: IDataProductContract) =>
        genericSort(a?.product, b?.product, {
          property: "commercialName",
        }),
      );

    localStorage.setItem("@comparatorSelected", JSON.stringify(products));

    handleSetProductsDataState(products);
  };

  const handleGetProduts = () => {
    const productsLocalStorageData =
      localStorage.getItem("@comparatorSelected") || "";

    if (productsLocalStorageData) {
      const products: IDataProductContract[] = JSON.parse(
        productsLocalStorageData,
      )?.sort((a: IDataProductContract, b: IDataProductContract) =>
        genericSort(a?.product, b?.product, {
          property: "commercialName",
        }),
      );

      handleSetProductsDataState(products);
    }
  };

  useEffect(() => {
    handleGetProduts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <Box
      w="100%"
      h="100%"
      fontFamily="Poppins, Roboto, sans-serif"
      overflow="auto"
    >
      {ansProducts?.length < 1 && personalizedProducts?.length < 1 ? (
        <AlertNoDataFound
          title="Nenhum produto selecionado"
          description={
            <>
              Na aba{" "}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: pixelToRem(14),
                }}
              >
                &quot;Podutos disponíveis&quot;
              </span>{" "}
              na coluna{" "}
              <span style={{ fontWeight: 500, fontSize: pixelToRem(14) }}>
                &quot;Comparar&quot;
              </span>{" "}
              selecione até <br />3 produtos para realizar o comparativo.
            </>
          }
          buttonTitle="Selecione"
          onClick={() => {
            setCurrentTab({
              status: 1,
              name: "Produtos disponíveis",
              isDisabled: false,
            });
          }}
        />
      ) : (
        <>
          {/* CARREGAMENTO */}
          {ansProducts?.length < 1 && personalizedProducts?.length < 1 && <></>}
          <Box w="max-content">
            <Box ref={componentRef}>
              <Box
                className="print cabecalho"
                backgroundImage={theme.images.logo}
              ></Box>

              <Flex className="print rodape">
                {dateFormat(new Date())} -{" "}
                {new Date().getHours() < 10 ? "0" : ""}
                {new Date().getHours()}:
                {new Date().getMinutes() < 10 ? "0" : ""}
                {new Date().getMinutes()}
              </Flex>

              <Flex className="marginPrint" padding="35px 35px 0 35px">
                {/* PRODUTOS ANS */}
                <ComparatorTable
                  data={ansProducts}
                  isFetching={isFetching}
                  handleRemoveProduct={handleRemoveProduct}
                  handleGetProduts={handleGetProduts}
                />

                {/* PRODUTOS PERSONALIZADOS */}
                <ComparatorTable
                  data={personalizedProducts}
                  isFetching={isFetching}
                  handleRemoveProduct={handleRemoveProduct}
                  handleGetProduts={handleGetProduts}
                />
              </Flex>

              <ComparatorDetails
                ansProducts={ansProducts}
                personalizedProducts={personalizedProducts}
              />
            </Box>

            <Flex padding="0 35px">
              <ComparatorColumnAdhesionContent products={ansProducts} />
              <ComparatorColumnAdhesionContent
                products={personalizedProducts}
              />
            </Flex>
            <Flex justifyContent="flex-end" padding="20px 35px 35px 35px">
              <Button
                borderRadius="4px"
                onClick={handlePrint}
                isLoading={loadingPrint}
                w="110px"
                h="37px"
              >
                Baixar PDF
              </Button>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Comparator;
