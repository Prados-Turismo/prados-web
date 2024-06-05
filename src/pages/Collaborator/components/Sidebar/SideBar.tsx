import { FaUser, FaUserCheck, FaUserMinus, FaUserPlus } from "react-icons/fa";

import ButtonSidebar from "../../../../components/ButtonSidebar";
import ButtonSidebarWrap from "../../../../components/ButtonSidebarWrap";
import { Aside, AsideTop } from "./styled";

import { useDisclosure } from "@chakra-ui/react";
import CompleteRegistrationModal from "../../../../components/CompleteRegistrationModal";
import { useGlobal } from "../../../../contexts/UserContext";
import { ISidebar } from "../../../../models/sidebar.model";

const SideBar = ({ status, onStatus }: ISidebar) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isPre, isBroker, isPartner } = useGlobal();
  const menuFirst = [
    {
      id: 1,
      icon: <FaUser size={15} />,
      title: "Pessoas",
      textMenu: "Cadastrados",
      active: true,
      tooltipText:
        "Todos os titulares cadastrados na plataforma, com ou sem cadastro concluído.",
    },
    {
      id: 2,
      icon: <FaUserCheck size={18} />,
      title: "Pessoas",
      textMenu: "Ativos",
      active: true,
      tooltipText: "Titulares que possuem pelo menos 1 produto ativo.",
    },
    {
      id: 3,
      icon: <FaUserPlus size={18} />,
      title: "Pessoas",
      textMenu: "Vínculo pendente",
      active: true,
      tooltipText:
        "Titulares que se cadastraram diretamente pelo app e precisam de aprovação de vínculo.",
    },
    {
      id: 4,
      icon: <FaUserMinus size={18} />,
      title: "Pessoas",
      textMenu: "Inativos",
      active: true,
      tooltipText: "Informações dos titulares inativos na plataforma.",
    },
  ];

  const menuSecond = [
    {
      id: 5,
      icon: <FaUserCheck size={18} />,
      title: "Pessoas",
      textMenu: "Ativos",
      active: true,
      tooltipText: "Titulares dos prestadores de serviço que estão ativos.",
    },
    {
      id: 6,
      icon: <FaUserPlus size={18} />,
      title: "Pessoas",
      textMenu: "Ativação pendente",
      active: !isBroker,
      tooltipText: "Titulares que estão com alguma pendencia.",
    },
  ];

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <ButtonSidebarWrap title="Titulares">
          {menuFirst
            .filter((item) => item.active)
            .map((item, key) => (
              <ButtonSidebar
                key={key}
                icon={item.icon}
                selected={status.menu === key + 1}
                onClick={() => {
                  if (isPre && (item.id === 3 || item.id === 4)) {
                    onOpen();
                  } else {
                    onStatus({
                      title: item.title,
                      menu: key + 1,
                    });
                  }
                }}
                tooltipText={item?.tooltipText}
              >
                {item.textMenu}
              </ButtonSidebar>
            ))}
        </ButtonSidebarWrap>

        {!isPartner && (
          <ButtonSidebarWrap title="Prestadores de Serviços">
            {menuSecond
              .filter((item) => item.active)
              .map((item, key) => (
                <ButtonSidebar
                  key={key}
                  icon={item.icon}
                  selected={status.menu === key + 5}
                  onClick={() => {
                    onStatus({
                      title: item.title,
                      menu: key + 5,
                    });
                  }}
                  tooltipText={item?.tooltipText}
                >
                  {item.textMenu}
                </ButtonSidebar>
              ))}
          </ButtonSidebarWrap>
        )}
      </Aside>

      {isOpen && (
        <CompleteRegistrationModal isOpen={isOpen} handleModals={onClose} />
      )}
    </>
  );
};

export default SideBar;
