// Pages
import CollaboratorRegistered from "../../pages/CollaboratorRegistered"
import CollaboratorActive from "../../pages/CollaboratorActive"
import CollaboratorLinkPending from "../../pages/CollaboratorLinkPending"
import CollaboratorDeactivated from "../../pages/CollaboratorDeactivated"
import CollaboratorPartnersActive from "../../pages/CollaboratorPartnersActive"
import CollaboratorPartnersActivePending from "../../pages/CollaboratorPartnersActivePending"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <CollaboratorRegistered />}
    {menu === 2 && <CollaboratorActive />}
    {menu === 3 && <CollaboratorLinkPending />}
    {menu === 4 && <CollaboratorDeactivated />}
    {menu === 5 && <CollaboratorPartnersActive />}
    {menu === 6 && <CollaboratorPartnersActivePending />}
  </>
)

export default Section
