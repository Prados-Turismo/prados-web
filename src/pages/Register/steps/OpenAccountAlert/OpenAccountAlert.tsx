import { useNavigate } from "react-router-dom";
import { Button, FormBox, SubTitle, Title } from "../../styled";
import { Flex } from "@chakra-ui/react";
import { theme } from "../../../../theme";

const OpenAccountAlert = () => {
  const navigate = useNavigate();

  return (
    <>
      <FormBox>
        <Flex justifyContent="center" margin="35px 10px 20px ">
          <Flex
            justifyContent="center"
            alignItems="center"
            w="150px"
            h="150px"
            background="brand.500"
            borderRadius="100%"
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_555)">
                <mask
                  id="mask0_1_555"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                >
                  <path d="M100 0H0V100H100V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_1_555)">
                  <path
                    d="M87.5 41.6667V81.25C87.5 84.7019 84.7019 87.5 81.25 87.5H18.75C15.2982 87.5 12.5 84.7019 12.5 81.25V18.75C12.5 15.2982 15.2982 12.5 18.75 12.5H62.5"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33.3335 41.6666L54.1668 58.3333L85.4168 14.5833"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_1_555">
                  <rect width="100" height="100" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Flex>
        </Flex>
        <Title marginBottom="20px">
          Sua conta empresarial
          <br />
          gratuita foi aberta
        </Title>
        <SubTitle marginBottom="unset">
          Agora, você faz parte do universo magenta de Saúde e Bem-estar. Faça o
          seu login e descubra todas as soluções que a {theme.content.project}{" "}
          pode oferecer ao seu negócio
        </SubTitle>

        <Button marginTop="40px" onClick={() => navigate("/login")}>
          Fazer Login
        </Button>
      </FormBox>
    </>
  );
};

export default OpenAccountAlert;
