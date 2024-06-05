// Components and Util
import SimpleModal from "../SimpleModal";
import purify from "dompurify";
import showdown from "showdown";

// Styles
import { ModalContent } from "./styled";

// Types
import { IBenefitNetworkModal } from "./types";
import { capitalize } from "../../utils/capitalize";

const BenefitNetworkModal = ({
  benefit,
  showModal,
  setShowModal,
}: IBenefitNetworkModal) => {
  const converter = new showdown.Converter();

  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      size="2xl"
      minHeight="160px"
      title={`${capitalize(benefit?.product?.reducedName)} - ${benefit?.product
        ?.companyProvider?.company?.corporateName}`}
    >
      <ModalContent>
        <div className="details">
          <div
            className="linkMarkdown"
            onClick={() => {
              const anchors = document.querySelectorAll(".linkMarkdown p a");

              anchors.forEach((a) => {
                a.setAttribute("target", "__blank");
                a.setAttribute("rel", "noopener noreferrer");
              });
            }}
            dangerouslySetInnerHTML={{
              __html: purify.sanitize(
                converter.makeHtml(benefit?.product?.accreditedNetwork),
              ),
            }}
          />
        </div>
      </ModalContent>
    </SimpleModal>
  );
};

export default BenefitNetworkModal;
