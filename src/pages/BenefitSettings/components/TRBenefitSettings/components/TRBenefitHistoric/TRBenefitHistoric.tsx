import { TD, TR } from "../../../../../../components/Table";
import TooltipSubstring from "../../../../../../components/TooltipSubstring/TooltipSubstring";
import { dateFormat, numberFormat } from "../../../../../../utils";
import { capitalize } from "../../../../../../utils/capitalize";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../../../../../utils/enumFormat";
import { ITRBenefitHistoric } from "./types";

const TRBenefitHistoric = ({ item }: ITRBenefitHistoric) => {
  return (
    <TR
      style={{
        textAlign: "center",
        height: "max-content",
      }}
    >
      <TD>{item?.relationship === "holder" ? "Titular" : "Dependente"}</TD>
      <TD>{item?.createdAt ? dateFormat(new Date(item?.createdAt)) : "-"}</TD>
      <TD>
        <TooltipSubstring
          name={capitalize(item?.beneficiary?.person?.name) || "Todos"}
          length={14}
        />
      </TD>
      <TD>{BENEFICIARY_KINSHIP_COMPLETE[item?.relationship] || "Todos"}</TD>
      <TD>{item?.sector?.name || "Todos"}</TD>
      <TD>{item?.position?.name || "Todos"}</TD>
      <TD>{item?.percentageValue === "P" ? "Percentual" : "Valor"}</TD>
      <TD>{item?.percentageValue === "V" ? "Valor" : "Percentual"}</TD>
      <TD>
        {item?.percentageValue === "V"
          ? numberFormat(item?.value)
          : `% ${item?.value}`}
      </TD>
      <TD>
        <TooltipSubstring name={item?.updatedBy} length={10} />
      </TD>
      <TD>{item?.active ? "Ativo" : "Inativo"}</TD>
    </TR>
  );
};

export default TRBenefitHistoric;
