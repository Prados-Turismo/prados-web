import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import {
  PopoverContentDescription,
  PopoverContentWrapper,
  PopoverContentTitle,
  StyledTitleWrapper,
  Title,
} from "./styled";
import HelpPopOver from "../../../../HelpPopOver";

interface Props {
  title: string;
  content: JSX.Element;
}

const ContractDataAccordion: React.FC<Props> = ({ title, content }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <StyledTitleWrapper>
                  <Title>
                    {title}
                    <HelpPopOver
                      content={
                        <PopoverContentWrapper>
                          <PopoverContentTitle>Ajuda</PopoverContentTitle>
                          <PopoverContentDescription>
                            Envie seus contratos individualmente ou agrupados
                            por fornecedor.
                          </PopoverContentDescription>
                          <PopoverContentDescription>
                            Formatos: PDF, ZIP ou RAR.
                          </PopoverContentDescription>
                        </PopoverContentWrapper>
                      }
                    />
                  </Title>
                  {isExpanded ? (
                    <MdKeyboardArrowUp size={20} />
                  ) : (
                    <MdKeyboardArrowDown size={20} />
                  )}
                </StyledTitleWrapper>
              </AccordionButton>
            </h2>
            <AccordionPanel>{content}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default ContractDataAccordion;
