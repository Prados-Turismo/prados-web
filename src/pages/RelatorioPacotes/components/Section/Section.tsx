// Pages
import RelatorioPacoteList from "../../pages/RelatorioPacoteList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"
import { IRelatorioPacoteList } from "../../pages/types"

interface ISectionProps extends ISection, IRelatorioPacoteList {}

const Section = ({ menu, ...relatorioCategoriasProps }: ISectionProps) => (
  <>
    {menu === 1 && <RelatorioPacoteList {...relatorioCategoriasProps} />}
  </>
)

export default Section
