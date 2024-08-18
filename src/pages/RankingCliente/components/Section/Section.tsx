// Pages
import RankingClienteList from "../../pages/RankingClienteList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <RankingClienteList />}
  </>
)

export default Section
