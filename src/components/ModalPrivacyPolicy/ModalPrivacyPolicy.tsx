import { Box, Button, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";
import { useEffect, useState } from "react";
import { PoliciyPrivacy } from "./PolicyPrivacy";
import useTermsAndPolicy from "../../hooks/useTermsAndPolicy";
import { IUser } from "../../models/user.model";
import { apiPermission } from "../../services/api";
import { useGlobal } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ModalPrivacyPolicy = () => {
  const [checked, setChecked] = useState(false);
  const [openPrivacyPolicy, setPrivacyPolicy] = useState(false);
  const { user, setUser, role } = useGlobal();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const getUserData = async () => {
    setShowContent(false);
    await apiPermission
      .get<IUser>("user/me")
      .then((res) => {
        setUser(res?.data);
        if (role) {
          navigate("/");
        } else if (user?.termsOfPrivacy) {
          navigate("/selecione-perfil");
        }
      })
      .finally(() => setShowContent(true));
  };

  const handleClose = () => {
    getUserData();
  };

  const { acceptTermOfPrivacy } = useTermsAndPolicy();
  const { isLoading, mutate } = acceptTermOfPrivacy(
    user?.id as string,
    handleClose,
  );

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user?.id) return null;

  return (
    <>
      {showContent && (
        <Box maxW="800px" margin="auto auto" marginTop="40px">
          <Stack
            p="24px"
            direction="row"
            justifyContent="space-between"
            borderBottom="1px solid #E5E5E5"
          >
            <Text fontSize={pixelToRem(14)} lineHeight="14px" fontWeight={500}>
              Política de Privacidade
            </Text>
          </Stack>
          <Stack p="32px 24px">
            <Text fontSize={pixelToRem(14)} lineHeight="21px" mb="20px">
              Na Fiibo, enfatizamos a transparência e a confiança com nossos
              usuários, destacando a importância da privacidade. Nossa Política
              de Privacidade é um compromisso claro de proteger as informações
              pessoais dos usuários, detalhando como coletamos, armazenamos e
              utilizamos dados com segurança. Incentivamos a leitura atenta da
              política para estabelecer uma relação de confiança, garantindo
              controle sobre as informações pessoais.
            </Text>
            <Text fontSize={pixelToRem(14)} lineHeight="21px">
              Na Fiibo, comprometemo-nos a oferecer transparência e a proteger a
              privacidade, e a leitura cuidadosa da Política de Privacidade
              reflete esse compromisso.
            </Text>
          </Stack>
          <Stack p="0 24px">
            <Flex gap="12px" alignItems="center" mb="50px">
              <Checkbox
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
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <Text fontSize={pixelToRem(14)} color="#707070">
                Eu aceito a{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setPrivacyPolicy(true)}
                >
                  Política de Privacidade
                </span>{" "}
                da Fiibo
              </Text>
            </Flex>
            <Button
              w={134}
              height={37}
              isDisabled={!checked}
              alignSelf="flex-end"
              mb="20px"
              isLoading={isLoading}
              onClick={() => mutate()}
            >
              Continuar
            </Button>
          </Stack>
        </Box>
      )}
      <PoliciyPrivacy
        openModal={openPrivacyPolicy}
        setOpenModal={setPrivacyPolicy}
      />
    </>
  );
};

export default ModalPrivacyPolicy;
