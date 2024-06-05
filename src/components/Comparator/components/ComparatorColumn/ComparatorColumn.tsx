import { ComparatorColumnContent } from "./styled";
import ComparatorColumnHeader from "../ComparatorColumnHeader";
import { IComparatorColumn } from "./types";
import ComparatorColumnAgeRange from "../ComparatorColumnAgeRange";

const ComparatorColumn = ({
  item,
  isFetching,
  handleRemoveProduct,
  handleGetProduts,
  hasAnsProduct,
}: IComparatorColumn) => {
  return (
    <ComparatorColumnContent>
      {/* Logo e nome do produto */}
      <ComparatorColumnHeader
        item={item}
        isFetching={isFetching}
        handleRemoveProduct={handleRemoveProduct}
        handleGetProduts={handleGetProduts}
      />

      {/* Faixas e valores */}
      <ComparatorColumnAgeRange
        title="Valor"
        item={item?.precification[0]?.holder}
        isHeader={false}
        uniqueValue={
          item?.precification[0]?.holder[0]?.range === "0 a 999" &&
          hasAnsProduct
            ? item?.precification[0]?.holder[0]?.finalValue
            : null
        }
      />
    </ComparatorColumnContent>
  );
};

export default ComparatorColumn;
