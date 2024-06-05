// Components and Utils
import ButtonSidebar from "../../../../../../components/ButtonSidebar";
import ButtonSidebarWrap from "../../../../../../components/ButtonSidebarWrap";
import { ISidebar } from "../../../../../../models/sidebar.model";

// Icons
import { FiUsers } from "react-icons/fi";

// Styles
import { Aside, AsideTop } from "./styled";

const SideBar = ({ status, onStatus }: ISidebar) => {
  const menuFirst = [
    {
      icon: <FiUsers />,
      title: "Prestadores de Serviços",
      textMenu: "Dados do prestador de serviço",
    },
  ];

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <ButtonSidebarWrap title="">
          {menuFirst.map((item, key) => (
            <ButtonSidebar
              key={key}
              icon={item.icon}
              selected={status.menu === key + 1}
              onClick={() => {
                onStatus({
                  title: item.title,
                  menu: key + 1,
                });
              }}
            >
              {item.textMenu}
            </ButtonSidebar>
          ))}
        </ButtonSidebarWrap>
      </Aside>
    </>
  );
};

export default SideBar
