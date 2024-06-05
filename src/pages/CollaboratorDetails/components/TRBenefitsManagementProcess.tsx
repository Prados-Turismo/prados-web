import { useState } from "react";
import BenefitDetailsModal from "../../../components/BenefitDetailsModal";

import Mark from "../../../components/Mark";
import { TD, TR } from "../../../components/Table";

import { dateFormat, numberFormat } from "../../../utils";
import ButtonCancelProcess from "./ButtonCancelProcess";
import { RiPencilFill } from "react-icons/ri";
import ButtonIcon from "../../../components/ButtonIcon/ButtonIcon";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import { IFamilyBenefitsGroup } from "../../../models/collaborator.model";
import {
  BENEFICIARY_CONTRACT_STATUS,
  PRODUCT_CLASS,
} from "../../../utils/enumFormat";

import ProviderImage from "../../../components/ProviderImage";
import ResubmissionDocModal from "../../../components/ResubmissionDocModal";
import { capitalize } from "../../../utils/capitalize";

interface ITRBenefitsManagementProcess {
  item: IFamilyBenefitsGroup;
}

const TRBenefitsManagementProcess = ({
  item,
}: ITRBenefitsManagementProcess) => {
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showResubmissionDoc, setShowResubmisisionDoc] =
    useState<boolean>(false);
  const documentEdit = item?.status === "awaitingRegularizationDataDocuments";

  return (
    <>
      <TR height="max-content" minHeight="50px">
        <TD flex="0 0 50px">
          <Mark color="process" />
        </TD>
        <TD maxW="200px">
          <TooltipSubstring
            name={PRODUCT_CLASS[item?.productClass]}
            length={18}
          />
        </TD>
        <TD
          display="flex"
          alignItems="center"
          justifyContent="center"
          maxW="100px"
        >
          <ProviderImage
            providerName={item?.providerName}
            imgToken={item?.providerLogo}
          />
        </TD>
        <TD
          textAlign="center"
          className="benefitTD"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => setShowDetailsModal(true)}
          minW="220px"
        >
          <TooltipSubstring
            name={capitalize(item?.productCommercialName)}
            length={30}
          />
        </TD>
        <TD textAlign="center" maxW="150px">
          {numberFormat(item?.value || 0)}
        </TD>
        <TD textAlign="center" maxW="150px">
          {dateFormat(new Date(item?.createdAt))}
        </TD>
        <TD
          flex="0 0 200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight={documentEdit ? "bold" : "unset"}
          maxW="200px"
        >
          <TooltipSubstring
            name={BENEFICIARY_CONTRACT_STATUS[item?.status]}
            length={18}
          />

          {documentEdit && (
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
        <TD display="flex" justifyContent="center" maxW="50px">
          <ButtonCancelProcess
            isAuth={[
              "adhesionAnalysis",
              "awaitingRegularizationDataDocuments",
              "waitingSignature",
              "pendingProposalGenerationSubmission",
            ].includes(item?.status)}
            adherenceProposalId={item?.adherenceProposalId}
          />
        </TD>
      </TR>

      {showResubmissionDoc && (
        <ResubmissionDocModal
          adherenceProposalId={item?.adherenceProposalId}
          setShowModal={setShowResubmisisionDoc}
          showModal={showResubmissionDoc}
        />
      )}

      {showDetailsModal && (
        <BenefitDetailsModal
          product={item}
          showModal={showDetailsModal}
          setShowModal={setShowDetailsModal}
        />
      )}
    </>
  );
};

export default TRBenefitsManagementProcess;
