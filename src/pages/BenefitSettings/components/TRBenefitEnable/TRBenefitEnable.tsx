import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { RiDownloadLine } from "react-icons/ri";
import BenefitDetailsModal from "../../../../components/BenefitDetailsModal";
import BenefitNetworkModal from "../../../../components/BenefitNetworkModal";
import BenefitValueModal from "../../../../components/BenefitValueModal";
import CompleteRegistrationModal from "../../../../components/CompleteRegistrationModal";
import ProviderImage from "../../../../components/ProviderImage";
import { TD, TR } from "../../../../components/Table";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";
import { useGlobal } from "../../../../contexts/UserContext";
import useUpload from "../../../../hooks/useUpload";
import { numberFormat } from "../../../../utils";
import { capitalize } from "../../../../utils/capitalize";
import CheckedBenefitModal from "./CheckedBenefitModal";
import { Checkbox } from "./styled";
import { ITRBenefitEnable } from "./types";

const TRBenefitEnable = ({ item, menu }: ITRBenefitEnable) => {
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showValueModal, setShowValueModal] = useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [showCheckedBenefitModal, setShowCheckedBenefitModal] =
    useState<boolean>(false);
  const [checkedStatus, setCheckedStatus] = useState(item?.available);
  const { downloadAndOpenFile } = useUpload();
  const { callDoc, isLoading } = downloadAndOpenFile();
  const { isPre } = useGlobal();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TR height="max-content" minHeight="50px">
        <TD style={{ textAlign: "center" }} maxW="100px">
          <Checkbox
            defaultChecked={checkedStatus}
            isChecked={item?.available}
            onChange={(e: { target: { checked: boolean } }) => {
              if (isPre) {
                onOpen();
              } else {
                setShowCheckedBenefitModal(true);
                setCheckedStatus(e.target.checked);
              }
            }}
          ></Checkbox>
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
        <TD style={{ textAlign: "center" }} maxW="100px">
          {checkedStatus ? "Ativo" : "Inativo"}
        </TD>
        <TD style={{ textAlign: "center" }} maxW="80px">
          <Button
            isLoading={isLoading}
            variant="outline"
            border="none"
            style={{ margin: "0 auto" }}
            // tooltip="Em desenvolvimento!"
          >
            <RiDownloadLine
              color="text.fourth"
              onClick={() => {
                callDoc(
                  item?.product?.regulated
                    ? item?.contractToken
                    : item?.product?.datasheet,
                );
              }}
            />
          </Button>
        </TD>
      </TR>

      {isPre && isOpen && (
        <CompleteRegistrationModal isOpen={isOpen} handleModals={onClose} />
      )}

      {showCheckedBenefitModal && (
        <CheckedBenefitModal
          showModal={showCheckedBenefitModal}
          setShowModal={setShowCheckedBenefitModal}
          checkedStatus={checkedStatus}
          setCheckedStatus={setCheckedStatus}
          companyContractId={item?.id}
        />
      )}

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

export default TRBenefitEnable;
