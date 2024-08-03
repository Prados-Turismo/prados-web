// Pages
import ClienteList from "../../pages/ClienteList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <ClienteList />}
  </>
)

export default Section
