// Pages
import RelatorioVendasList from "../../pages/RelatorioVendasList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"
import { IRelatorioVendasList } from "../../pages/types"

interface ISectionProps extends ISection, IRelatorioVendasList {}

const Section = ({ menu, ...relatorioCategoriasProps }: ISectionProps) => (
  <>
    {menu === 1 && <RelatorioVendasList {...relatorioCategoriasProps} />}
  </>
)

export default Section
