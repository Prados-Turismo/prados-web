import { useState } from "react";

// Components and Utils
import BenefitDetailsModal from "../../../../components/BenefitDetailsModal";
import BenefitNetworkModal from "../../../../components/BenefitNetworkModal";
import BenefitValueModal from "../../../../components/BenefitValueModal";
import ButtonIcon from "../../../../components/ButtonIcon";
import { TD, TR } from "../../../../components/Table";
import { numberFormat } from "../../../../utils";
import BenefitHistoric from "./BenefitHistoric";
import BenefitParameterizer from "./BenefitParameterizer";

// ICON
import { MdInsertDriveFile, MdSettings } from "react-icons/md";

// Types
import { useDisclosure } from "@chakra-ui/react";
import CompleteRegistrationModal from "../../../../components/CompleteRegistrationModal";
import { FavoriteProduct } from "../../../../components/FavoriteProduct";
import ProviderImage from "../../../../components/ProviderImage";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";
import { useGlobal } from "../../../../contexts/UserContext";
import { capitalize } from "../../../../utils/capitalize";
import { ITRBenefitSettings } from "./types";

const TRBenefitSettings = ({
  item,
  isFavorite,
  userId,
  isFetching,
}: ITRBenefitSettings) => {
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showValueModal, setShowValueModal] = useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [showParameterizer, setShowParameterizer] = useState<boolean>(false);
  const [showHIstoric, setShowHistoric] = useState<boolean>(false);
  const { isPre } = useGlobal();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TR className="parameterizerTR" height="max-content" minHeight="50px">
        <TD
          style={{
            display: "flex",
            flex: "0 0 6%",
            alignItems: "center",
          }}
        >
          <FavoriteProduct
            product={item}
            available={item?.available}
            id={item?.id}
            userId={userId}
            provideFavoriteOption={isFavorite}
            itIsFavorite={item?.favoritedCompanyContract?.length > 0}
            isFetching={isFetching}
          />
        </TD>

        <TD style={{ textAlign: "center" }} maxW="200px">
          <ProviderImage
            providerName={
              item?.product?.companyProvider?.company?.corporateName
            }
            imgToken={item?.product?.companyProvider?.logo}
          />
        </TD>
        <TD
          style={{ textAlign: "center", fontWeight: "bold" }}
          className="benefitTD"
          onClick={() => setShowDetailsModal(true)}
        >
          <TooltipSubstring
            name={capitalize(item?.product?.reducedName)}
            length={70}
          />
        </TD>
        {/* {["all", "health", "odontology"].includes(menu) &&
          (item?.product?.accreditedNetwork && item?.product?.regulated ? (
            <TD
              style={{ textAlign: "center", fontWeight: "bold" }}
              className="benefitTD"
              onClick={() => setShowNetworkModal(true)}
              maxW="90px"
            >
              Ver Rede
            </TD>
          ) : (
            <TD style={{ textAlign: "center" }} maxW="90px">
              -
            </TD>
          ))} */}
        <TD
          style={{ textAlign: "center", fontWeight: "bold" }}
          className="benefitTD"
          onClick={() => setShowValueModal(true)}
          maxW="200px"
        >
          {item?.precification?.[0]?.holder?.length === 1 ? "" : "A partir de "}
          {numberFormat(item?.precification?.[0]?.holder[0]?.finalValue)}
        </TD>
        {/* {isBroker && (
          <ComissioningInfo
          comissioningInfo={{
            name: item?.nomeReduzidoProduto,
            info: item?.infoComissionamento
          }}
          />
        )} */}
        <TD maxW="80px">
          <ButtonIcon style={{ margin: "0 auto" }}>
            <MdSettings
              onClick={() => {
                if (isPre) {
                  onOpen();
                } else {
                  setShowHistoric(false);
                  setShowParameterizer((item) => !item);
                }
              }}
              color="text.fourth"
            />
          </ButtonIcon>
        </TD>
        <TD maxW="80px">
          <ButtonIcon style={{ margin: "0 auto" }}>
            <MdInsertDriveFile
              onClick={() => {
                if (isPre) {
                  onOpen();
                } else {
                  setShowParameterizer(false);
                  setShowHistoric((item) => !item);
                }
              }}
              color="text.fourth"
            />
          </ButtonIcon>
        </TD>
      </TR>

      {isPre && isOpen && (
        <CompleteRegistrationModal isOpen={isOpen} handleModals={onClose} />
      )}

      {showParameterizer && <BenefitParameterizer benefit={item} />}

      {showHIstoric && <BenefitHistoric benefit={item} />}

      {showDetailsModal && (
        <BenefitDetailsModal
          product={item}
          showModal={showDetailsModal}
          setShowModal={setShowDetailsModal}
        />
      )}

      {showNetworkModal && (
        <BenefitNetworkModal
          benefit={item}
          showModal={showNetworkModal}
          setShowModal={setShowNetworkModal}
        />
      )}

      {showValueModal && (
        <BenefitValueModal
          benefit={item}
          showModal={showValueModal}
          setShowModal={setShowValueModal}
          relationship="holder"
          page="product"
        />
      )}
    </>
  );
};

export default TRBenefitSettings;
