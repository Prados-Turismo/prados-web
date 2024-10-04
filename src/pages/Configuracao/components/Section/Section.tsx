// Pages
import ConfiguracaoList from "../../pages/ConfiguracaoList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <ConfiguracaoList />}
  </>
)

export default Section
