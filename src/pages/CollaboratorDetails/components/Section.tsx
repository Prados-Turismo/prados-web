/* eslint-disable @typescript-eslint/no-explicit-any */
// Pages
import PersonalData from "../pages/PersonalData";
import DependentData from "../pages/DependentData";
import BenefitsManagement from "../pages/BenefitsManagement";

const Section = ({ menu, setStatusSideBar }: any) => (
  <>
    {menu === 1 && <PersonalData />}
    {menu === 2 && <DependentData />}
    {menu === 3 && <BenefitsManagement setStatusSideBar={setStatusSideBar} />}
  </>
);

export default Section;
