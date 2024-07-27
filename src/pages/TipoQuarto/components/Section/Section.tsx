// Pages
import TipoQuartoList from "../../pages/TipoQuartoList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <TipoQuartoList />}
  </>
)

export default Section
