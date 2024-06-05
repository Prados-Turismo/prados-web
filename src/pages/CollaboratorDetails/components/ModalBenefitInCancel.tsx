import { Box, Text } from "@chakra-ui/react";
import { dateFormat } from "../../../utils";
import { ICancelRequestData } from "../../../models/collaborator.model";

const ModalBenefitInCancel = ({
  cancelRequest,
}: {
  cancelRequest: ICancelRequestData;
}) => {
  return (
    <Box display="flex" flexDirection="column" gap="15px" padding="25px">
      <Box>
        <Text>
          {cancelRequest?.status === "programmed" ? (
            <b>Esse produto está com o cancelamento programado!</b>
          ) : (
            <b>Esse produto está com o cancelamento em análise!</b>
          )}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="7px">
        <Text>
          <b>Protocolo:</b> {cancelRequest?.protocol}
        </Text>
        <Text>
          <b>Data da solicitação:</b>{" "}
          {dateFormat(new Date(cancelRequest?.createdAt))}
        </Text>
        <Text>
          <b>Solicitado por:</b> {cancelRequest?.createdBy}
        </Text>
        {cancelRequest?.status === "programmed" && (
          <Text>
            <b>Data programada para o cancelamento:</b>{" "}
            {dateFormat(new Date(cancelRequest?.effectiveFinalyDate))}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ModalBenefitInCancel;
