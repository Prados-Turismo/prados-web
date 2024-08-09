// Pages
import CategoriaTransacaoList from "../../pages/ReservasList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <CategoriaTransacaoList />}
  </>
)

export default Section
