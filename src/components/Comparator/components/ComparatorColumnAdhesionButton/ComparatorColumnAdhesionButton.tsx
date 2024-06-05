import ProductAdhesionButton from "../../../ProductAdhseionButton/ProductAdhesionButton";
import { IComparatorColumnAdhesionButton } from "./types";
import { ComparatorColumnAdhesionBox } from "./styled";

const ComparatorColumnAdhesionButton = ({
  item,
}: IComparatorColumnAdhesionButton) => {
  return (
    <ComparatorColumnAdhesionBox>
      <ProductAdhesionButton item={item} tooltip="" withTitle={true} />
    </ComparatorColumnAdhesionBox>
  );
};

export default ComparatorColumnAdhesionButton;
