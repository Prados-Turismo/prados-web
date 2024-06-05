import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { permissionsText } from "../../utils/permissionsText";
import { CardWrap, Icon, Title, Text } from "./styled";
import { ICard } from "./types";

const Card = ({
  icon,
  title,
  text,
  link,
  isDisabled,
  idButton,
  isUrl,
  alertText,
}: ICard) => {
  const navigate = useNavigate();

  const handle = (link: string) => {
    if (isUrl) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  return (
    <CardWrap>
      <Flex justifyContent="space-between" alignItems="center">
        <Icon as="span">{icon}</Icon>
        {alertText && (
          <Text
            maxW="max-content"
            background="brand.50"
            padding="2px 7px"
            color="brand.500"
            cursor="default"
            borderRadius="100px"
            fontSize="0.9rem"
          >
            {alertText}
          </Text>
        )}
      </Flex>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <Button
        id={idButton}
        onClick={() => (isDisabled ? permissionsText() : handle(link))}
        opacity={isDisabled ? "0.4" : "unset"}
        cursor={isDisabled ? "default" : "pointer"}
      >
        Acessar
      </Button>
    </CardWrap>
  );
};

export default Card;
