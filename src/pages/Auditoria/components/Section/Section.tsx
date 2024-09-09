// Pages
import AuditoriaList from "../../pages/AuditoriaList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <AuditoriaList />}
  </>
)

export default Section
