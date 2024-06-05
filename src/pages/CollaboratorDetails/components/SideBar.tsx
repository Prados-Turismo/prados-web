/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiUserCheck, FiUsers } from "react-icons/fi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useParams } from "react-router-dom";

import ButtonSidebar from "../../../components/ButtonSidebar";
import ButtonSidebarWrap from "../../../components/ButtonSidebarWrap";
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";

interface ISideBar {
  status: number;
  onStatus: (arg: number) => void;
}

const SideBar = ({ status, onStatus }: ISideBar) => {
  const { company, isPre } = useGlobal();
  const { id } = useParams();

  const { getBeneficiary } = useCollaborator();

  const { data } = getBeneficiary({
    companyId: company!.externalCompanyId,
    beneficiaryId: id || "",
  });

  const activeMenu = !isPre;

  const menuFirst = [
    {
      icon: <FiUserCheck />,
      textMenu: "Dados Pessoais",
      active: true,
    },
    {
      icon: <FiUsers />,
      textMenu: "Dados dos Dependentes",
      active: activeMenu,
    },
    {
      icon: <HiOutlineDocumentSearch />,
      textMenu: "Gerenciamento de Produtos",
      active: activeMenu,
    },
  ];

  return (
    <ButtonSidebarWrap>
      {menuFirst
        .filter((item) => item.active)
        .map((item, key) => (
          <ButtonSidebar
            key={key}
            icon={item.icon}
            selected={status === key + 1}
            onClick={() => {
              onStatus(key + 1);
            }}
          >
            {item.textMenu}
          </ButtonSidebar>
        ))}
    </ButtonSidebarWrap>
  );
};

export default SideBar;
