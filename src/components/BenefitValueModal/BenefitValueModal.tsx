import SimpleModal from "../SimpleModal";
import { ModalContent } from "./styled";
import { IBenefitModal } from "./types";
import { Flex } from "@chakra-ui/layout";
import PriceTable from "../PriceTable";
import BenefitDetailsHeader from "../BenefitDetailsHeader";

const BenefitValueModal = ({
  benefit,
  showModal,
  setShowModal,
  page,
  relationship,
  parametrizerItemValue,
  percentageValue,
}: IBenefitModal) => {
  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      size="5xl"
      minHeight="160px"
      title={
        benefit?.product?.regulated ? "Tabela de Preço" : "Valor do Produto"
      }
    >
      <ModalContent>
        <BenefitDetailsHeader data={benefit?.product} />

        <PriceTable
          borderTop="1px solid #E5E5E5"
          benefit={benefit}
          relationship={relationship}
          page={page}
          parametrizerItemValue={parametrizerItemValue}
          percentageValue={percentageValue || ""}
        />

        <Flex h="30px"></Flex>
      </ModalContent>
    </SimpleModal>
  );
};

export default BenefitValueModal;
