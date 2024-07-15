// Pages
import OnibusList from "../../pages/OnibusList"

// Interfaces
import { ISection } from "../../../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <OnibusList />}
  </>
)

export default Section
