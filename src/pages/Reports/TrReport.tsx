import ButtonIcon from "../../components/ButtonIcon";
import { TD, TR } from "../../components/Table";
import { IDataReport } from "../../models/report.model";
import { cpfHidden, cpfMask, dateFormat } from "../../utils";
import { RiPencilFill } from "react-icons/ri";
import { useState } from "react";
import TooltipSubstring from "../../components/TooltipSubstring/TooltipSubstring";
import { currencyBRLFormat } from "../../utils/currencyBRLFormat";
import {
  BENEFICIARY_CONTRACT_STATUS,
  BENEFICIARY_KINSHIP_COMPLETE,
} from "../../utils/enumFormat";
import ResubmissionDocModal from "../../components/ResubmissionDocModal";
import { capitalize } from "../../utils/capitalize";

interface ITrReport {
  item: IDataReport;
  status: string;
  selectedColumns: string[];
}

const TrReport = ({ item, status, selectedColumns }: ITrReport) => {
  const [showResubmissionDoc, setShowResubmisisionDoc] =
    useState<boolean>(false);
  return (
    <>
      <TR>
        <TD>
          <TooltipSubstring
            name={capitalize(item?.beneficiaryName)}
            length={14}
          />
        </TD>
        <TD>{cpfHidden(cpfMask(item?.cpf))}</TD>
        <TD>{BENEFICIARY_KINSHIP_COMPLETE[item?.beneficiaryKinshp]}</TD>
        <TD>{item?.parentCPF ? cpfHidden(cpfMask(item?.parentCPF)) : "-"}</TD>
        <TD>
          <TooltipSubstring name={item?.sector} length={12} />
        </TD>
        <TD>
          <TooltipSubstring name={item?.position} length={12} />
        </TD>
        <TD>{dateFormat(new Date(item?.effectiveStartDate))}</TD>
        <TD>
          <TooltipSubstring name={item?.providerName} length={12} />
        </TD>
        <TD>
          <TooltipSubstring
            name={capitalize(item?.productCommercialName)}
            length={12}
          />
        </TD>
        <TD>
          <TooltipSubstring
            name={BENEFICIARY_CONTRACT_STATUS[item?.status]}
            length={10}
          />

          {item?.status.includes("awaitingRegularizationDataDocuments") && (
            <ButtonIcon tooltip="Pendências">
              <RiPencilFill
                onClick={() => {
                  setShowResubmisisionDoc(true);
                }}
                size={20}
              />
            </ButtonIcon>
          )}
        </TD>
        {status === "C" && (
          <TD>{dateFormat(new Date(item?.effectiveFinalyDate))}</TD>
        )}
        {selectedColumns.includes("valorProduto") && (
          <TD>{currencyBRLFormat(item?.value)}</TD>
        )}
        {selectedColumns.includes("valorEmpresa") && (
          <TD>{currencyBRLFormat(item?.companyValue)}</TD>
        )}
        {selectedColumns.includes("valorBeneficiario") && (
          <TD>{currencyBRLFormat(item?.beneficiaryValue)}</TD>
        )}
        {selectedColumns.includes("dataContratacao") && (
          <TD>{dateFormat(new Date(item?.admissionDate))}</TD>
        )}
        {selectedColumns.includes("numeroCarteirinha") && (
          <TD>{item?.cardNumber || "-"}</TD>
        )}
      </TR>

      {showResubmissionDoc && (
        <ResubmissionDocModal
          adherenceProposalId={item?.adherenceProposalId}
          setShowModal={setShowResubmisisionDoc}
          showModal={showResubmissionDoc}
        />
      )}
    </>
  );
};

export default TrReport;
