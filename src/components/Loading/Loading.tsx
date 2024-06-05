import { useTheme } from "@chakra-ui/react";
import LoadingTextRandom from "../LoadingTextRandom";
import { LoadingWrap } from "./styled";

interface ILoading {
  productPage?: boolean;
}

const Loading = ({ productPage }: ILoading) => {
  const theme = useTheme();
  const path = window.location.href.split("/")[3];

  return (
    <>
      <LoadingWrap
        padding={path === "pessoas" ? "40px 0 60px" : "unset"}
        margin="10px 0"
      >
        <div className="loadingLoader" />
        <div className="loadingBox">
          <img src={theme.images.logoLogin} alt={theme.content.project} />
          <p>Carregando...</p>
        </div>
      </LoadingWrap>
      {productPage && (
        <LoadingTextRandom
          texts={[
            "Buscando fornecedores incríveis!",
            "Estamos verificando os produtos disponíveis para você.",
            "Preparando uma experiência incrível de saúde e bem-estar.",
          ]}
        />
      )}
    </>
  );
};

export default Loading;
