// Pages
import RelatorioCategoriasList from "../../pages/RelatorioCategoriasList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"
import { IRelatorioCategoriasList } from "../../pages/types"

interface ISectionProps extends ISection, IRelatorioCategoriasList {}

const Section = ({ menu, ...relatorioCategoriasProps }: ISectionProps) => (
  <>
    {menu === 1 && <RelatorioCategoriasList {...relatorioCategoriasProps} />}
  </>
)

export default Section
