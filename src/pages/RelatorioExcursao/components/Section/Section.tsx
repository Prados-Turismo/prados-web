// Pages
import RelatorioExcursaoList from "../../pages/RelatorioExcursaoList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"
import { IRelatorioExcursaoList } from "../../pages/types"

interface ISectionProps extends ISection, IRelatorioExcursaoList {}

const Section = ({ menu, ...relatorioCategoriasProps }: ISectionProps) => (
  <>
    {menu === 1 && <RelatorioExcursaoList {...relatorioCategoriasProps} />}
  </>
)

export default Section
