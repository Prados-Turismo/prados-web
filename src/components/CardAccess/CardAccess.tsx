import { Button } from "@chakra-ui/react";
import { CardWrap, Icon, Title, Text } from "./styled";
import { ICard } from "./types";

const Card = ({ icon, title, text, isDisabled, onClick }: ICard) => (
  <CardWrap>
    <Icon as="span">{icon}</Icon>
    <Title>{title}</Title>
    <Text>{text}</Text>

    {onClick && (
      <Button
        onClick={onClick}
        opacity={isDisabled ? "0.4" : "unset"}
        cursor={isDisabled ? "default" : "pointer"}
      >
        Acessar
      </Button>
    )}
  </CardWrap>
);

export default Card;
