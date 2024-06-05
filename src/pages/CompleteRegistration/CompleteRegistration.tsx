import Dashboard from "../../Layouts/Dashboard";
import PageWithoutMenu from "../../Layouts/PageWithoutMenu";
import Menu from "../../components/Menu";
import { useGlobal } from "../../contexts/UserContext";
import CompleteRegistrationContent from "./CompleteRegistrationContent";

const CompleteRegistration = () => {
  const { companyStatus } = useGlobal();

  const stepDefault = [
    "waitingLegalSubscriber",
    "waitingLegalApproval",
    "waitingInternalSubscriber",
  ].includes(companyStatus?.status || "")
    ? 2
    : 1;

  return (
    <Dashboard menu={<Menu />}>
      <PageWithoutMenu
        title="Completar cadastro"
        article={<CompleteRegistrationContent stepDefault={stepDefault} />}
      />
    </Dashboard>
  );
};

export default CompleteRegistration;
