// Pages
import RelatorioFornecedorList from "../../pages/RelatorioFornecedorList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"
import { IRelatorioFornecedorList } from "../../pages/types"

interface ISectionProps extends ISection, IRelatorioFornecedorList {}

const Section = ({ menu, ...relatorioCategoriasProps }: ISectionProps) => (
  <>
    {menu === 1 && <RelatorioFornecedorList {...relatorioCategoriasProps} />}
  </>
)

export default Section
