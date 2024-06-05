// Styles
import { SectionWrap, Title, Section, Article } from "./styled"

// Types
import { IPageWithoutMenu } from "./types"

const PageWithoutMenu = ({ title, article }: IPageWithoutMenu) => (
  <SectionWrap>
    <Title>{title}</Title>

    <Section as="section">
      <Article as="article">{article}</Article>
    </Section>
  </SectionWrap>
)

export default PageWithoutMenu
