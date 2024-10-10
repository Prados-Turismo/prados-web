// Pages
import RelatorioCategoriasList from "../../pages/RelatorioCategoriasList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <RelatorioCategoriasList />}
  </>
)

export default Section
