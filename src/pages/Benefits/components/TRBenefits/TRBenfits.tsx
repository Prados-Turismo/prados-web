import { useState } from "react";
import BenefitDetailsModal from "../../../../components/BenefitDetailsModal";
import BenefitValueModal from "../../../../components/BenefitValueModal";
import ButtonIcon from "../../../../components/ButtonIcon";
import { TD, TR } from "../../../../components/Table";
import { numberFormat } from "../../../../utils";
import { TbCalculator } from "react-icons/tb";
import { FavoriteProduct } from "../../../../components/FavoriteProduct";
import ProviderImage from "../../../../components/ProviderImage";
import SimulatorValueModal from "../../../../components/SimulatorValue/SimulatorValueModal";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";
import { capitalize } from "../../../../utils/capitalize";
import { ITRBenefits } from "./types";
import ProductAdhesionButton from "../../../../components/ProductAdhseionButton/ProductAdhesionButton";
import { Checkbox } from "../../../BenefitSettings/components/TRBenefitEnable/styled";

const TRBenefits = ({
  item,
  userId,
  provideFavoriteOption,
  selectProduct,
  selectedProducts,
  isFetching,
}: ITRBenefits) => {
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showValueModal, setShowValueModal] = useState<boolean>(false);
  const [showSimulatorModal, setShowSimulatorModal] = useState<boolean>(false);

  return (
    <>
      <TR>
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
            provideFavoriteOption={provideFavoriteOption}
            itIsFavorite={item?.favoritedCompanyContract?.length > 0}
            isFetching={isFetching}
          />
        </TD>
        <TD maxW="200px">
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
        <TD
          style={{ textAlign: "center", fontWeight: "bold" }}
          className="benefitTD"
          onClick={() => setShowValueModal(true)}
          maxW="200px"
        >
          {item?.precification?.[0]?.holder.length === 1 ? "" : "A partir de "}
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
        <TD
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="benefitTD"
          maxW="80px"
        >
          <ButtonIcon tooltip="Realizar simulação">
            <TbCalculator
              size={20}
              onClick={() => {
                setShowSimulatorModal(true);
              }}
            />
          </ButtonIcon>
        </TD>
        <TD
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="benefitTD"
          maxW="80px"
        >
          <Checkbox
            borderColor="#909090"
            isChecked={selectedProducts?.some(({ id }) => id === item.id)}
            _checked={{
              ".chakra-checkbox__control": {
                bgColor: "brand.500",
                borderColor: "brand.500",
                boxShadow: "none",
              },
              ".chakra-checkbox__control:hover": {
                bgColor: "brand.500",
                borderColor: "brand.500",
                boxShadow: "none",
              },
            }}
            onChange={() => selectProduct(item)}
          />
        </TD>
        <TD
          style={{
            flex: "0 0 5%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProductAdhesionButton item={item} />
        </TD>
      </TR>

      {showDetailsModal && (
        <BenefitDetailsModal
          product={item}
          showModal={showDetailsModal}
          setShowModal={setShowDetailsModal}
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

      {showSimulatorModal && (
        <SimulatorValueModal
          benefit={item}
          showModal={showSimulatorModal}
          setShowModal={setShowSimulatorModal}
        />
      )}
    </>
  );
};

export default TRBenefits;
