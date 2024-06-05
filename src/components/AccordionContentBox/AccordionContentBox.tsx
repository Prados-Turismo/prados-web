// Styles
import { Content, Title, ContentBox } from "./styled";
import { IAccordionContentBox } from "./types";

const AccordionContentBox = ({ children, title }: IAccordionContentBox) => {
  return (
    <Content>
      {title && (
        <Title margin="10px 0 20px" fontWeight={600}>
          {title}
        </Title>
      )}

      <ContentBox>{children}</ContentBox>
    </Content>
  );
};

export default AccordionContentBox;
