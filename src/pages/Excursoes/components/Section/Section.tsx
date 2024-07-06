// Pages
import PacotesList from "../../pages/ExcursaoList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <PacotesList />}
  </>
)

export default Section
