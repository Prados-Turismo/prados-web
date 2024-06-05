import { Section, Aside, Article } from "./styled";
import { IPageWithMenu } from "./types";

const PageWithMenu = ({ aside, section }: IPageWithMenu) => (
  <Section as="section">
    {aside && <Aside as="aside">{aside}</Aside>}
    <Article as="article">{section}</Article>
  </Section>
);

export default PageWithMenu;
