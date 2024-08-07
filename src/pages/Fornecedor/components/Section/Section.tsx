// Pages
import ClienteList from "../../pages/FornecedorList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <ClienteList />}
  </>
)

export default Section
