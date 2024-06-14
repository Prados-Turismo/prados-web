// Pages
import Products from "../../pages/ProductsList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <Products />}
  </>
)

export default Section
