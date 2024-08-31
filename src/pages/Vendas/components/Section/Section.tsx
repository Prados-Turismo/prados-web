// Pages
import VendasList from "../../pages/VendasList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <VendasList />}
  </>
)

export default Section
