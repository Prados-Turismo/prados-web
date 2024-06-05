import ButtonSidebar from "../../../../components/ButtonSidebar"
import ButtonSidebarWrap from "../../../../components/ButtonSidebarWrap"
import { Aside, AsideTop } from "./styled"

import { useEffect, useState } from "react"
import {
  AiFillDollarCircle,
  AiFillFile,
  AiOutlineCloudUpload
} from "react-icons/ai"
import { BiTransfer } from "react-icons/bi"
import { BsCurrencyDollar, BsGrid1X2Fill } from "react-icons/bs"
import { MdOutlineInsertChart } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri"
import ButtonSidebarMulti from "../../../../components/ButtonSidebarMulti"
import ButtonSidebarMultiWrap from "../../../../components/ButtonSidebarMultiWrap"
import { ISideBarMulti } from "../../../../models/sidebar.model";

const SideBar = ({ status, onStatus }: ISideBarMulti) => {
  const [openedMenus, setOpenedMenus] = useState<number[]>([])
  const handleToggleMenu = (menu: number) => {
    setOpenedMenus((state) =>
      state.includes(menu)
        ? state.filter((openedMenu) => openedMenu !== menu)
        : [...state, menu]
    )
  }
  const menuItems = [
    {
      icon: <AiFillFile />,
      title: "Gestão de empresas",
      textMenu: "Gestão de empresas",
      itens: [
        { title: "Empresas", icon: <RiBuilding2Line /> },
        { title: "Importação de empresas", icon: <AiOutlineCloudUpload /> },
        // { title: "Importação de pessoas", icon: <AiOutlineCloudUpload /> },
      ],
    },
    {
      icon: <AiFillDollarCircle />,
      title: "Histórico de movimentações",
      textMenu: "Gestão de saldo",
      itens: [
        { title: "Incluir saldo", icon: <BsCurrencyDollar /> },
        {
          title: "Transferir saldo",
          icon: <BsCurrencyDollar />,
        },
        { title: "Histórico de movimentações", icon: <BiTransfer /> },
      ],
    },
    {
      icon: <MdOutlineInsertChart />,
      title: "Relatórios de movimentações",
      textMenu: "Relatório",
      itens: [
        { title: "Saldo por empresa", icon: <MdOutlineInsertChart /> },
        { title: "Uso por empresa", icon: <MdOutlineInsertChart /> },
      ],
    },
  ];

  useEffect(() => {
    const pathIssuer = parseInt(window.location.href.split("?")[1]) || null

    if (pathIssuer) {
      handleToggleMenu(pathIssuer)
      onStatus({
        title: menuItems[pathIssuer - 1].title,
        menu: {
          main: pathIssuer,
          subMenu: 1
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <ButtonSidebarWrap title="Gestão Promoção à Saúde">
          <ButtonSidebar
            hideArrowIcon
            icon={<BsGrid1X2Fill />}
            selected={status.menu.main === 0}
            onClick={() => {
              onStatus({
                title: "Painel",
                menu: {
                  main: 0
                }
              })
            }}
          >
            Painel
          </ButtonSidebar>
          {menuItems.map((item, key) => (
            <div
              key={key}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <ButtonSidebar
                multi
                icon={item.icon}
                selected={openedMenus.includes(key + 1)}
                onClick={() => {
                  handleToggleMenu(key + 1)
                }}
              >
                {item.textMenu}
              </ButtonSidebar>
              {openedMenus.includes(key + 1) && item.itens.length > 0 && (
                <ButtonSidebarMultiWrap>
                  {item.itens.map((item, subMenuKey) => (
                    <ButtonSidebarMulti
                      key={subMenuKey}
                      selected={
                        status.menu.subMenu === subMenuKey + 1 &&
                        status.menu.main === key + 1
                      }
                      icon={item.icon}
                      onClick={() => {
                        onStatus({
                          title: item.title,
                          menu: {
                            main: key + 1,
                            subMenu: subMenuKey + 1
                          }
                        })
                      }}
                    >
                      {item.title}
                    </ButtonSidebarMulti>
                  ))}
                </ButtonSidebarMultiWrap>
              )}
            </div>
          ))}
        </ButtonSidebarWrap>
      </Aside>
    </>
  )
}

export default SideBar
