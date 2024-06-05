import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import Padlock from "./components/Padlock/Padlock";
import { apiPermissionNoAuth } from "../../services/api";
import { useToastStandalone } from "../../hooks/useToastStandalone";
import { useGlobal } from "../../contexts/UserContext";
import * as S from "./styled";

interface IRequestPasswordChange {
  isOpen: boolean;
  userEmail: string;
}

const RequestPasswordChange = ({
  isOpen,
  userEmail,
}: IRequestPasswordChange) => {
  const [isLoading, setLoading] = useState(false);
  const { setUserAccess } = useGlobal();

  const resetPassword = async () => {
    setLoading(true);
    await apiPermissionNoAuth
      .post("/auth/resetPassword", { email: userEmail, origin: "PORTAL" })
      .then(() => {
        useToastStandalone({
          description:
            "Uma mensagem com os dados da alteração de senha foi enviada para o seu e-mail",
          status: "success",
        });
      })
      .catch((error) => {
        useToastStandalone({
          description: error?.response?.data?.message[0],
          status: "error",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setUserAccess({ firstAccess: false })}
      size="2xl"
      isCentered
    >
      <ModalContent padding="10px 20px">
        <S.PadlockContainer>
          <Padlock />
        </S.PadlockContainer>
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <S.Title>Alteração de senha necessária!</S.Title>
          <S.Description mb="25px !important" letterSpacing="0.8px">
            Estamos atualizando nossa plataforma para melhorar sua experiência e
            segurança.
          </S.Description>
          <S.Description>
            Por favor, redefina sua senha tocando no botão abaixo.
          </S.Description>
          <S.Description>
            Será enviado um e-mail para: <br />
            <strong>{userEmail}</strong>
          </S.Description>
          <S.Description mt="0px !important">
            Com as instruções para a Alteração.
          </S.Description>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={resetPassword} isLoading={isLoading}>
            Solicitar alteração de senha
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestPasswordChange;
