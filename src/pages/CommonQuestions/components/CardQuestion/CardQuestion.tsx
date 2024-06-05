import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { pixelToRem } from "../../../../utils";

interface ICardQuestionProps {
  title: string;
  description: string;
}

const CardQuestion = ({ title, description }: ICardQuestionProps) => {
  return (
    <Accordion allowToggle>
      <AccordionItem
        minHeight="70px"
        display="flex"
        justifyContent="space-between"
        flexDir="column"
        border="1px solid"
        borderColor="brand.500"
      >
        <Text width="100%">
          <AccordionButton padding="0 32px" height="70px" color="text.second">
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight={600}
              letterSpacing="0.2px"
            >
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Text>
        <AccordionPanel padding="4px 32px 32px">
          <Text
            fontWeight={400}
            fontSize={pixelToRem(14)}
            lineHeight="21px"
            color="#707070"
            display="flex"
            flexDir="column"
            gap="10px"
            sx={{
              position: "relative",
              transition: "all 1s ease-in-out",
              "&::after": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "2em",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CardQuestion;
