/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";
import SideBarTabbed from "../components/SideBarTabbed";
import BenefitsManagementActive from "./BenefitsManagementActive";
import BenefitsManagementAvailable from "./BenefitsManagementAvailable";
import BenefitsManagementHistoric from "./BenefitsManagementHistoric";
import BenefitsManagementProcess from "./BenefitsManagementProcess";

const BenefitsManagement = ({ setStatusSideBar }: any) => {
  const { company } = useGlobal();
  const { id } = useParams();
  const [status, setStatus] = useState<number>(1);
  const { getBeneficiary } = useCollaborator();

  const { data } = getBeneficiary({
    companyId: company!.externalCompanyId,
    beneficiaryId: id || "",
  });

  return (
    <>
      <SideBarTabbed status={status} onStatus={setStatus} />

      {status === 1 && (
        <BenefitsManagementAvailable
          holder={data}
          setStatus={setStatusSideBar}
        />
      )}
      {status === 2 && <BenefitsManagementProcess holder={data} />}
      {status === 3 && <BenefitsManagementActive holder={data} />}
      {status === 4 && <BenefitsManagementHistoric holder={data} />}
    </>
  );
};

export default BenefitsManagement;
