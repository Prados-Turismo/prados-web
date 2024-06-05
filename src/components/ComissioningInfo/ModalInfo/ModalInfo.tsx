import {
  Alert,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { IModalInfo } from "./types";
import purify from "dompurify";
import Showdown from "showdown";

import * as S from "./styled";

const ModalInfo = ({ isOpen, setOpen, comissioningInfo }: IModalInfo) => {
  const converter = new Showdown.Converter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(!isOpen)}
      size="2xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px solid #E5E5E5">
          <Text>{comissioningInfo?.name}-</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={6} mb={146}>
          {/* {comissioningInfo?.info ? (
            <div
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(
                  converter.makeHtml(comissioningInfo?.info),
                ),
              }}
            />
          ) : (
            <S.GenericText textAlign="center">
              Comissionamento não cadastrado!
            </S.GenericText>
          )} */}
          <Alert status="info" w="max-content" margin="0 0 0 15px">
            <AlertIcon />
            Em Desenvolvimento!
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalInfo;
