// Pages
import PassageirosList from "../../Passageiros/pages/PassageirosList"

// Interfaces
import { ISection } from "../../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
    <>
        {menu === 1 && <PassageirosList />}
    </>
)

export default Section
