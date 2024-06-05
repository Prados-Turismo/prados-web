import { RiMoneyDollarBoxFill } from "react-icons/ri"
import { SlGraph } from "react-icons/sl"

import ButtonSidebar from "../../../../components/ButtonSidebar"
import { AsideTop, Aside } from "./styled"

import { ISidebar } from "../../../../models/sidebar.model"
import ButtonSidebarWrap from "../../../../components/ButtonSidebarWrap"

const SideBar = ({ status, onStatus }: ISidebar) => {
  const menuFirst = [
    {
      icon: <RiMoneyDollarBoxFill />,
      title: "Faturas",
      textMenu: "Faturas"
    },
    {
      icon: <SlGraph />,
      title: "Movimentações",
      textMenu: "Movimentações"
    }
    // {
    //   icon: <BsFileEarmarkBarGraphFill />,
    //   title: "Relatório Analítico",
    //   textMenu: "Relatório Analítico"
    // }
  ]

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <ButtonSidebarWrap>
          {menuFirst.map((item, key) => (
            <ButtonSidebar
              key={key}
              icon={item.icon}
              selected={status.menu === key + 1}
              onClick={() => {
                onStatus({
                  title: item.title,
                  menu: key + 1
                })
              }}
            >
              {item.textMenu}
            </ButtonSidebar>
          ))}
        </ButtonSidebarWrap>
      </Aside>
    </>
  )
}

export default SideBar
