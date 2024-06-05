import { useState } from "react";
import BenefitDetailsModal from "../../../components/BenefitDetailsModal";
import ComissioningInfo from "../../../components/ComissioningInfo";
import ProviderImage from "../../../components/ProviderImage";
import { TD, TR } from "../../../components/Table";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import { useGlobal } from "../../../contexts/UserContext";
import { IDataProductContract } from "../../../models/product.model";
import { numberFormat } from "../../../utils";
import { capitalize } from "../../../utils/capitalize";
import { PRODUCT_CLASS } from "../../../utils/enumFormat";
import ButtonAdhesion from "./ButtonAdhesion";

interface ITRBenefitsManagementAvailable {
  item: IDataProductContract;
  isNotCompleteRecord: boolean;
  setStatus: React.Dispatch<React.SetStateAction<number>> | undefined;
}

const TRBenefitsManagementAvailable = ({
  item,
  isNotCompleteRecord,
  setStatus,
}: ITRBenefitsManagementAvailable) => {
  const { isBroker } = useGlobal();
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  return (
    <>
      <TR height="max-content" minHeight="50px">
        <TD maxW="200px">
          <TooltipSubstring
            name={PRODUCT_CLASS[item?.product?.productClass]}
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
            providerName={
              item?.product?.companyProvider?.company?.corporateName
            }
            imgToken={item?.product?.companyProvider?.logo}
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
            name={capitalize(item?.product?.reducedName)}
            length={30}
          />
        </TD>
        <TD textAlign="center" maxW="150px">
          {numberFormat(item?.value)}
        </TD>
        <TD textAlign="center" maxW="150px">
          {numberFormat(item?.valueCompany)}
          {/* {item?.parametrizer?.filter((el) => el?.relationship === "holder")[0]
            ?.percentageValue === "V"
            ? numberFormat(
                item?.parametrizer?.filter(
                  (el) => el?.relationship === "holder",
                )[0]?.value || 0,
              )
            : numberFormat(
                item?.value *
                  ((item?.parametrizer?.filter(
                    (el) => el?.relationship === "holder",
                  )[0]?.value || 0) /
                    100),
              )} */}
        </TD>
        <TD textAlign="center" maxW="150px">
          {numberFormat(item?.valueBeneficiary)}
          {/* {item?.parametrizer?.filter((el) => el?.relationship === "holder")[0]
            ?.percentageValue === "V"
            ? numberFormat(
                item?.value -
                  item?.parametrizer?.filter(
                    (el) => el?.relationship === "holder",
                  )[0]?.value || 0,
              )
            : numberFormat(
                item?.value -
                  item?.value *
                    ((item?.parametrizer?.filter(
                      (el) => el?.relationship === "holder",
                    )[0]?.value || 0) /
                      100),
              )} */}
        </TD>
        {isBroker && (
          <ComissioningInfo
          // comissioningInfo={{
          //   name: item?.nomeReduzidoProduto,
          //   info: item?.infoComissionamento,
          // }}
          />
        )}
        {item?.available ? (
          <ButtonAdhesion
            tooltipText="Aderir produto"
            product={item}
            isNotCompleteRecord={isNotCompleteRecord}
            setStatus={setStatus}
          />
        ) : (
          <TD maxW="80px"></TD>
        )}
      </TR>
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

export default TRBenefitsManagementAvailable;
