import { IComparatorColumnTitle } from "./types";
import { ComparatorColumnTitleContent } from "./styled";
import { ComparatorHeaderContent } from "../ComparatorColumnHeader/styled";
import ComparatorColumnAgeRange from "../ComparatorColumnAgeRange";

const ComparatorColumnTitle = ({ item }: IComparatorColumnTitle) => {
  return (
    <ComparatorColumnTitleContent>
      <ComparatorHeaderContent w="195px" />
      <ComparatorColumnAgeRange
        title="Faixa - Etária"
        item={item?.precification[0]?.holder}
        isHeader={true}
      />
    </ComparatorColumnTitleContent>
  );
};

export default ComparatorColumnTitle;
