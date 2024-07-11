// Pages
import QuartosList from "../../pages/QuartosList"

// Interfaces
import { ISection } from "../../../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <QuartosList />}
  </>
)

export default Section
