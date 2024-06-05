// Pages
import Invoice from "../../pages/Invoice"
import Movimentations from "../../pages/Movimentations"
import AnalyticReport from "../../pages/AnalyticReport"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <Invoice />}
    {menu === 2 && <Movimentations />}
    {menu === 3 && <AnalyticReport />}
  </>
)

export default Section
