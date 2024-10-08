// Pages
import ProductsList from "../../pages/ProductsList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <ProductsList />}
  </>
)

export default Section
