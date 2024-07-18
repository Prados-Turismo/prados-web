// Pages
import TransacaoList from "../../pages/TransacoesList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <TransacaoList />}
  </>
)

export default Section
