import { IDataProductContract } from "../../../../../../models/product.model";
import { capitalize } from "../../../../../../utils/capitalize";
import {
  CARE_SEGMENTATION_FROM_TO,
  HIRING_TYPE_FROM_TO,
} from "../../../../../../utils/enumFormat";
import TooltipSubstring from "../../../../../TooltipSubstring/TooltipSubstring";
import { ComparatorColumnDetailsBody } from "./styled";

const DetailsBody = ({ data }: { data: IDataProductContract[] }) => {
  return (
    <>
      {data?.length > 0 &&
        data?.map((item) => (
          <ComparatorColumnDetailsBody key={item?.id}>
            <span>
              <TooltipSubstring
                name={capitalize(item?.product?.reducedName)}
                length={35}
              />
            </span>
            {["health", "odontology"]?.includes(
              data[0]?.product?.productClass,
            ) && (
              <>
                <span>{item?.product?.codRegistryANS}</span>
                <span>{HIRING_TYPE_FROM_TO[item?.product?.hiringType]}</span>
                <span>
                  {item?.product?.accommodation === "business"
                    ? "Apartamento"
                    : "Enfermaria"}
                </span>
                <span>
                  <TooltipSubstring
                    name={
                      CARE_SEGMENTATION_FROM_TO[
                        item?.product?.outpatientSegmentation
                      ]
                    }
                    length={35}
                  />
                </span>
                <span>
                  {item?.product?.coparticipation
                    ? "Com coparticipação"
                    : "Sem coparticipação"}
                </span>
              </>
            )}
            {!["insurance", "health", "odontology"]?.includes(
              data[0]?.product?.productClass,
            ) && <span>{item?.product?.codRegistrySUSEP || "-"}</span>}
          </ComparatorColumnDetailsBody>
        ))}
    </>
  );
};

export default DetailsBody;
