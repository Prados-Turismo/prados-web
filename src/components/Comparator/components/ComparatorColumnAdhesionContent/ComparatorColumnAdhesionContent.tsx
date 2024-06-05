import { IDataProductContract } from "../../../../models/product.model";
import ComparatorColumnAdhesionButton from "../ComparatorColumnAdhesionButton";
import { ComparatorColumnAdhesionBox } from "../ComparatorColumnAdhesionButton/styled";

const ComparatorColumnAdhesionContent = ({
  products,
}: {
  products: IDataProductContract[];
}) => {
  return (
    <>
      {products?.length > 0 && (
        <>
          <ComparatorColumnAdhesionBox w="195px" minW="195px" />
          {products?.map((item) => (
            <ComparatorColumnAdhesionButton key={item?.id} item={item} />
          ))}
        </>
      )}
    </>
  );
};

export default ComparatorColumnAdhesionContent;
