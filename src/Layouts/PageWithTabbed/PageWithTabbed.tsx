// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { SectionWrap, Title, Section, Aside, Article } from "./styled";
import { useNavigate } from "react-router-dom";
import { IPageWithTabbed } from "./types";
import SimpleModal from "../../components/SimpleModal";
import ProductsModal from "./ProductsModal";
import { BsQuestionCircle } from "react-icons/bs";
import { theme } from "../../theme";

const PageWithTabbed = ({
  title,
  aside,
  article,
  secondaryTitle,
  BackButton,
}: IPageWithTabbed) => {
  const navigate = useNavigate();
  const [modalIsOppened, setModalIsOppened] = useState(false);
  return (
    <SectionWrap>
      <SimpleModal
        isOpen={modalIsOppened}
        handleModal={setModalIsOppened}
        size="2xl"
        minHeight="530px"
      >
        <ProductsModal handleModal={setModalIsOppened} />
      </SimpleModal>
      {BackButton ? (
        <Stack direction="row" alignItems="flex-end">
          <button onClick={() => navigate(-1)}>
            <Box
              borderWidth="1px"
              borderColor="brand.500"
              width="80px"
              height="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              rounded="2xl"
            >
              <p>Voltar</p>
            </Box>
          </button>
          <Title>{title}</Title>
          <button
            onClick={() => setModalIsOppened(true)}
            style={{
              marginBottom: 8,
            }}
          >
            <BsQuestionCircle color={theme?.colors?.brand[500]} size={20} />
          </button>
          {secondaryTitle}
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Title>{title}</Title>
          {secondaryTitle}
        </Stack>
      )}

      <Section as="section" position="relative">
        <Aside as="aside">{aside}</Aside>
        <Article as="article">{article}</Article>
      </Section>
    </SectionWrap>
  );
};

export default PageWithTabbed;
