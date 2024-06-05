import { Box, Flex } from "@chakra-ui/react";
import SimpleModal from "../SimpleModal";
import { dateHourFormat } from "../../utils/fieldFormat";
import { pixelToRem } from "../../utils";
import { INotificationsData } from "../../models/notifications";

const NotificationModalMessage = ({
  showModal,
  setShowModal,
  item,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: INotificationsData;
}) => {
  return (
    <SimpleModal
      title="Mensagem da notificação"
      isOpen={showModal}
      handleModal={setShowModal}
      size="3xl"
    >
      <Box
        fontFamily="Poppins, Roboto, Sans-serif"
        padding="32px"
        fontSize={pixelToRem(14)}
        w="100%"
      >
        {item?.message}
        <Flex
          w="100%"
          justifyContent="flex-end"
          paddingTop="32px"
          fontWeight={500}
          fontSize={pixelToRem(14)}
        >
          {dateHourFormat(new Date(item?.createdAt))}
        </Flex>
      </Box>
    </SimpleModal>
  );
};

export default NotificationModalMessage;
