import {
  ComparatorColumnDetailsContent,
  ComparatorColumnDetailsTitle,
} from "./styled";
import { IComparatorDetails } from "./types";
import DetailsBody from "./components/DetailsBody";
import DescriptionBody from "./components/DescriptionBody";
import NetworkBody from "./components/NetworkBody";

const ComparatorDetails = ({
  ansProducts,
  personalizedProducts,
}: IComparatorDetails) => {
  return (
    <>
      <ComparatorColumnDetailsContent className="print-overflow-disabled">
        <ComparatorColumnDetailsTitle>
          <span>Nome registrado:</span>
          {["health", "odontology"]?.includes(
            ansProducts[0]?.product?.productClass ||
              personalizedProducts[0]?.product?.productClass,
          ) && (
            <>
              <span>RPS (Código do Plano):</span>
              <span>Tipo de Contratação:</span>
              <span>Acomodação:</span>
              <span>Segmentação Assistencial:</span>
              <span>Coparticipação:</span>
            </>
          )}
          {!["insurance", "health", "odontology"]?.includes(
            ansProducts[0]?.product?.productClass ||
              personalizedProducts[0]?.product?.productClass,
          ) && <span>Código SUSEP:</span>}
        </ComparatorColumnDetailsTitle>

        <DetailsBody data={ansProducts} />

        {ansProducts?.length > 0 && personalizedProducts?.length > 0 && (
          <ComparatorColumnDetailsTitle />
        )}

        <DetailsBody data={personalizedProducts} />
      </ComparatorColumnDetailsContent>

      {["health", "odontology"]?.includes(
        ansProducts[0]?.product?.productClass ||
          personalizedProducts[0]?.product?.productClass,
      ) && (
        <ComparatorColumnDetailsContent className="print-overflow-disabled">
          <ComparatorColumnDetailsTitle>
            <span>Rede de atendimento:</span>
          </ComparatorColumnDetailsTitle>

          <NetworkBody data={ansProducts} />

          {ansProducts?.length > 0 && personalizedProducts?.length > 0 && (
            <ComparatorColumnDetailsTitle />
          )}

          <NetworkBody data={personalizedProducts} />
        </ComparatorColumnDetailsContent>
      )}

      <ComparatorColumnDetailsContent className="print-overflow-disabled">
        <ComparatorColumnDetailsTitle>
          <span>Descrição:</span>
        </ComparatorColumnDetailsTitle>

        <DescriptionBody data={ansProducts} />

        {ansProducts?.length > 0 && personalizedProducts?.length > 0 && (
          <ComparatorColumnDetailsTitle />
        )}

        <DescriptionBody data={personalizedProducts} />
      </ComparatorColumnDetailsContent>
    </>
  );
};

export default ComparatorDetails;
