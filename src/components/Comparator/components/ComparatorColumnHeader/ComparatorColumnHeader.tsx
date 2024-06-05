import { Box, Flex } from "@chakra-ui/react";
import ProviderImage from "../../../ProviderImage";
import { FavoriteProduct } from "../../../FavoriteProduct";
import TooltipSubstring from "../../../TooltipSubstring/TooltipSubstring";
import { useGlobal } from "../../../../contexts/UserContext";
import { ComparatorHeaderContent } from "./styled";
import { IComparatorColumnHeader } from "./types";
import { MdClose } from "react-icons/md";

const ComparatorColumnHeader = ({
  item,
  isFetching,
  handleRemoveProduct,
  handleGetProduts,
}: IComparatorColumnHeader) => {
  const { isBroker, isCompany, isPartner, user, setComparatorCount } =
    useGlobal();

  const provideFavoriteOption = isBroker || isPartner || isCompany;

  return (
    <ComparatorHeaderContent>
      <Flex
        position="absolute"
        right="10px"
        top="0"
        cursor="pointer"
        _hover={{ opacity: "0.8" }}
        onClick={() => handleRemoveProduct(item?.id)}
        className="print-disabled"
      >
        <MdClose
          color="#909090"
          size={20}
          onClick={() => {
            setComparatorCount((e) => e - 1);
          }}
        />
      </Flex>

      <Box minH="35px">
        <ProviderImage
          key={item?.id}
          providerName={item?.product?.companyProvider?.company?.corporateName}
          imgToken={item?.product?.companyProvider?.logo}
        />
      </Box>

      <Flex
        w="100%"
        justifyContent="center"
        color="#707070"
        padding="10px"
        gap="5px"
      >
        <FavoriteProduct
          product={item}
          available={item?.available}
          id={item?.id}
          userId={user?.id}
          provideFavoriteOption={provideFavoriteOption}
          itIsFavorite={item?.favoritedCompanyContract?.length > 0}
          isFetching={isFetching}
          handleGetProduts={handleGetProduts}
        />

        <Box className="title">
          <TooltipSubstring name={item?.product?.commercialName} length={50} />
        </Box>

        <Box w="17px" className="print-disabled"></Box>
      </Flex>
    </ComparatorHeaderContent>
  );
};

export default ComparatorColumnHeader;
