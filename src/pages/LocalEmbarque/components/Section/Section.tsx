// Pages
import LocalEmbarqueList from "../../pages/LocalEmbarqueList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <LocalEmbarqueList />}
  </>
)

export default Section
