import { BiShoppingBag } from "react-icons/bi";

import ButtonSidebar from "../../../../components/ButtonSidebar";
import ButtonSidebarWrap from "../../../../components/ButtonSidebarWrap";
import { Aside, AsideTop } from "./styled";

import { ISidebar } from "../../../../models/sidebar.model";

const SideBar = ({ status, onStatus }: ISidebar) => {
  const menuFirst = [
    {
      icon: <BiShoppingBag />,
      title: "Prestadores de Serviços",
      textMenu: "Ativos",
    },
    // {
    //   icon: <BiShoppingBag />,
    //   title: "Prestadores de serviço",
    //   textMenu: "Ativação pendente"
    // }
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

export default SideBar;
