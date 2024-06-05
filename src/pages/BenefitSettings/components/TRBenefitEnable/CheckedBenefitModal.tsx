// Types
import { ICheckedBenefitModal } from "./types";

// Styles
import AlertModal from "../../../../components/AlertModal";
import { handleEnableBenefit } from "../../../../hooks/useBenefits";

const CheckedBenefitModal = ({
  showModal,
  setShowModal,
  checkedStatus,
  setCheckedStatus,
  companyContractId,
}: ICheckedBenefitModal) => {
  const { isLoading, enableBenefit } = handleEnableBenefit();

  return (
    <AlertModal
      title={checkedStatus ? "Ativar produto" : "Desativar produto"}
      showModal={showModal}
      setShowModal={setShowModal}
      isLoading={isLoading}
      size="xl"
      request={() =>
        enableBenefit({
          companyContractId,
          checkedStatus,
          setShowModal,
          setCheckedStatus,
        })
      }
      question={`O produto ${
        !checkedStatus ? "não será mais" : "será"
      } disponibilizado
    para adesão, deseja confirmar?`}
    />
  );
};

export default CheckedBenefitModal;
