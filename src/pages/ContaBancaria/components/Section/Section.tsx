// Pages
import CategoriaTransacaoList from "../../pages/ContaBancariaList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <CategoriaTransacaoList />}
  </>
)

export default Section
