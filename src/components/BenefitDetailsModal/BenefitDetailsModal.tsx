// Components and Util
import SimpleModal from "../SimpleModal";
import purify from "dompurify";
import showdown from "showdown";

// Styles
import { ModalContent } from "./styled";

// Types
import { IBenefitModal } from "./types";
import { Box, Flex, Text } from "@chakra-ui/react";
import useBenefits from "../../hooks/useBenefits";
import Loading from "../Loading";
import { capitalize } from "../../utils/capitalize";

import BenefitDetailsHeader from "../BenefitDetailsHeader";
import { dateFormat } from "../../utils";

const BenefitDetailsModal = ({
  product,
  showModal,
  setShowModal,
}: IBenefitModal) => {
  const { getBenefitDetails } = useBenefits();
  const { data, isLoading } = getBenefitDetails(product?.productId);
  const converter = new showdown.Converter();

  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      size="5xl"
      minHeight="160px"
      title={
        data
          ? `${capitalize(data?.commercialName)} - ${data?.companyProvider
              ?.company?.corporateName}`
          : ""
      }
    >
      <ModalContent>
        {isLoading ? (
          <Box margin="50px 0">
            <Loading />
          </Box>
        ) : (
          <>
            <BenefitDetailsHeader data={data} />

            {((product?.initContractDate && product?.finishContractDate) ||
              (product?.companyContact?.initContractDate &&
                product?.companyContact?.finishContractDate)) && (
              <>
                <hr />
                <Flex padding="24px 0 24px 24px" gap="5px">
                  <Text fontWeight="bold">Período de vigência: </Text>
                  <Text>
                    {dateFormat(
                      new Date(
                        product?.initContractDate ||
                          (product?.companyContact?.initContractDate as string),
                      ),
                    )}{" "}
                    até{" "}
                    {dateFormat(
                      new Date(
                        product?.finishContractDate ||
                          (product?.companyContact
                            ?.finishContractDate as string),
                      ),
                    )}
                  </Text>
                </Flex>
              </>
            )}

            {data?.regulated && data?.accreditedNetwork && (
              <>
                <hr />
                <Text
                  padding="24px 0 0 24px"
                  fontWeight="bold"
                  marginBottom="-24px"
                >
                  Rede de atendimento:
                </Text>
                <div className="details">
                  <div
                    className="linkMarkdown"
                    onClick={() => {
                      const anchors =
                        document.querySelectorAll(".linkMarkdown p a");

                      anchors.forEach((a) => {
                        a.setAttribute("target", "__blank");
                        a.setAttribute("rel", "noopener noreferrer");
                      });
                    }}
                    dangerouslySetInnerHTML={{
                      __html: purify.sanitize(
                        converter.makeHtml(data?.accreditedNetwork),
                      ),
                    }}
                  />
                </div>
              </>
            )}

            {data?.details && (
              <>
                <hr />
                <Text
                  padding="24px 0 0 24px"
                  fontWeight="bold"
                  marginBottom="-24px"
                >
                  Descrição:
                </Text>
                <div className="details">
                  <div
                    className="linkMarkdown"
                    onClick={() => {
                      const anchors =
                        document.querySelectorAll(".linkMarkdown p a");

                      anchors.forEach((a) => {
                        a.setAttribute("target", "__blank");
                        a.setAttribute("rel", "noopener noreferrer");
                      });
                    }}
                    dangerouslySetInnerHTML={{
                      __html: purify.sanitize(
                        converter.makeHtml(data?.details),
                      ),
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </ModalContent>
    </SimpleModal>
  );
};

export default BenefitDetailsModal;
