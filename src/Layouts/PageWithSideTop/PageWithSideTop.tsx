import { Wrap, Section, Aside, Article } from "./styled"
import { IPageWithSideTop } from "./types"

const PageWithSideTop = ({ top, aside, section }: IPageWithSideTop) => (
  <Wrap as="section">
    {top}

    <Section as="section">
      <Aside as="aside">{aside}</Aside>
      <Article as="article">{section}</Article>
    </Section>
  </Wrap>
)

export default PageWithSideTop
