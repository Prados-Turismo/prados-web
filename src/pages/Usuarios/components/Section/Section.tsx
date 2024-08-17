// Pages
import UsuariosList from "../../pages/UsuariosList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <UsuariosList />}
  </>
)

export default Section
