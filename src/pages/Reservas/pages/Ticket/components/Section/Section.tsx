// Pages
import TicketPrint from "../../pages/TicketPrint"

// Interfaces
import { ISection } from "../../../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
    <>
        {menu === 1 && <TicketPrint />}
    </>
)

export default Section
