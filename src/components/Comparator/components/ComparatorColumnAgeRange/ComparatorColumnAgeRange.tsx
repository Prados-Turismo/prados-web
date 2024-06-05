import { Box, Flex } from "@chakra-ui/react";
import { IComparatorColumnAgeRange } from "./types";
import { numberFormat, pixelToRem } from "../../../../utils";
import { IDataValues } from "../../../../models/product.model";

const ItemComponente = ({
  item,
  el,
  index,
  isHeader,
}: {
  item: IDataValues[];
  el: IDataValues;
  index: number;
  isHeader: boolean;
}) => {
  return (
    <Box textAlign={"center"} fontSize={pixelToRem(14)}>
      {isHeader
        ? item?.length === 1
          ? "Faixa única"
          : item?.length - 1 === index
          ? `Acima de ${item[index - 1]?.range?.split(" a ")[1]} anos`
          : `${el?.range} anos`
        : numberFormat(el?.finalValue)}
    </Box>
  );
};

const ComparatorColumnAgeRange = ({
  item,
  title,
  isHeader,
  uniqueValue,
}: IComparatorColumnAgeRange) => {
  return (
    <Flex flexDir="column" marginTop="10px" gap="7px" h="100%">
      <Box
        textAlign="center"
        fontSize={pixelToRem(14)}
        fontWeight={500}
        marginBottom="5px"
      >
        {title}
      </Box>
      {uniqueValue &&
        Array.from({ length: 10 }, () => item[0]).map((el, index) => (
          <ItemComponente
            key={el?.range}
            item={item}
            index={index}
            el={el}
            isHeader={isHeader}
          />
        ))}
      {!uniqueValue &&
        item?.map((el, index) => (
          <ItemComponente
            key={el?.range}
            item={item}
            index={index}
            el={el}
            isHeader={isHeader}
          />
        ))}
    </Flex>
  );
};

export default ComparatorColumnAgeRange;
