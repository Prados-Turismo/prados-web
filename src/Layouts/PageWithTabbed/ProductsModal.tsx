import { Box, Button, Text, useTheme } from "@chakra-ui/react";
import React from "react";
import { IProductsModal } from "./types";

const ProductsModal: React.FC<IProductsModal> = ({ handleModal }) => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      justifyContent="center"
      alignItems="center"
      display="flex"
      paddingLeft="40px"
      paddingRight="40px"
    >
      <Box width="100" alignItems="center">
        <img
          width={150}
          src={theme.images.iaraProduct}
          style={{ display: "block", margin: "0 auto" }}
        />
        <Text
          marginBottom="20px"
          marginTop="23px"
          fontSize="xl"
          fontWeight="bold"
        >
          Experimente nossa ferramenta de cotação!
        </Text>
        <Text fontSize="lg" color="blackAlpha.500">
          Não encontrou o que precisa? Agora você pode buscar outros {"\n"}{" "}
          produtos na plataforma.
        </Text>
        <Button
          onClick={() => handleModal(false)}
          position="absolute"
          bottom="10"
          right="30"
        >
          Solicite agora
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsModal;
