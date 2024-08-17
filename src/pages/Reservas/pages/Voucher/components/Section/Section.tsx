// Pages
import VoucherView from "../../pages/VoucherView"

// Interfaces
import { ISection } from "../../../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
    <>
        {menu === 1 && <VoucherView />}
    </>
)

export default Section
