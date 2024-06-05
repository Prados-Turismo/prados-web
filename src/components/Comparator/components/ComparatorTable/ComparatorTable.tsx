import { IDataProductContract } from "../../../../models/product.model";
import ComparatorColumn from "../ComparatorColumn";
import ComparatorColumnTitle from "../ComparatorColumnTitle";

const ComparatorTable = ({
  data,
  isFetching,
  handleRemoveProduct,
  handleGetProduts,
}: {
  data: IDataProductContract[];
  isFetching: boolean;
  handleRemoveProduct: (id: string) => void;
  handleGetProduts: () => void;
}) => {
  return (
    <>
      {data?.length > 0 && (
        <>
          <ComparatorColumnTitle item={data[0]} />
          {data?.map((product) => (
            <ComparatorColumn
              key={product?.id}
              item={product}
              isFetching={isFetching}
              handleRemoveProduct={handleRemoveProduct}
              handleGetProduts={handleGetProduts}
              hasAnsProduct={
                data?.filter(
                  (el) => el?.precification[0]?.holder?.length === 10,
                )?.length > 0
                  ? true
                  : false
              }
            />
          ))}
        </>
      )}
    </>
  );
};

export default ComparatorTable;
