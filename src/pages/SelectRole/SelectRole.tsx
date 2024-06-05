import { Box, useTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TbBuildingSkyscraper, TbUser } from "react-icons/tb";

import Dashboard from "../../Layouts/Dashboard";
import CardAccess, { Cards } from "../../components/CardAccess";
import Menu from "../../components/Menu";

import { useGlobal } from "../../contexts/UserContext";
import { setDataCookie } from "../../cookies";
import { capitalize } from "../../utils/capitalize";

import {
  AvatarWrap,
  ContentWrap,
  Hi,
  Phrase,
  Section,
  UserName,
} from "./styled";

import Loading from "../../components/Loading";
import { Role } from "../../models/role.model";

const SelectProfile = () => {
  const theme = useTheme();
  const { user, roles, permissions, setRole } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${theme.content.project} - Selecione o perfil`;
  }, [theme]);

  useEffect(() => {
    if (user && !user?.termsOfPrivacy) {
      navigate("/politica-privacidade");
    } else {
      const permissionEnabled = Object.values(permissions).some(
        (permission) => permission,
      );
      if (permissionEnabled) navigate("/");
    }
  }, [permissions, navigate, user]);

  const cards = roles.map((role) => {
    const profile = role.name;
    let icon;
    let title = "";
    let text = "";

    if (role.name === "EMPRESA") {
      icon = <TbBuildingSkyscraper size={20} />;
      title = "Perfil empresa";
      text = "Acesse e gerencie sua empresa";
    }

    if (role.name === "PARCEIRO") {
      icon = <TbBuildingSkyscraper size={20} />;
      title = "Perfil prestador de serviço";
      text = "Acesse e gerencie sua empresa";
    }

    if (role.name === "CORRETOR") {
      icon = <TbUser size={20} />;
      title = "Perfil corretor";
      text = "Acesse e colabore com uma empresa";
    }

    if (role.name === "EMISSOR") {
      icon = <TbUser size={20} />;
      title = "Perfil emissor";
      text = "Acesse e colabore como emissor";
    }

    return {
      icon,
      title,
      text,
      profile,
      visible: true,
      isDisabled: false,
    };
  });

  const handle = (identify: keyof typeof Role) => {
    const profile = roles.find((role) => role.name === identify) || null;

    setDataCookie({
      key: "@fiibo.role",
      value: JSON.stringify(profile),
    });

    setRole(profile);
    navigate("/selecione-empresa");
  };

  return (
    <>
      <Dashboard menu={<Menu />}>
        {!user?.termsOfPrivacy && (
          <Box margin="160px auto 0">
            <Loading />
          </Box>
        )}

        {user?.termsOfPrivacy && (
          <Section>
            <AvatarWrap backgroundImage={theme.images.iara} />

            <ContentWrap>
              <Hi>Olá,</Hi>
              <UserName>{capitalize(user!.username)}</UserName>
              <Phrase>Selecione qual perfil deseja acessar.</Phrase>

              <Cards>
                {cards
                  .filter((card) => card.visible)
                  .map((card) => (
                    <CardAccess
                      key={card.title}
                      icon={card.icon}
                      title={card.title}
                      text={card.text}
                      isDisabled={card.isDisabled}
                      onClick={() => handle(card.profile as keyof typeof Role)}
                    />
                  ))}
              </Cards>
            </ContentWrap>
          </Section>
        )}
      </Dashboard>
    </>
  );
};

export default SelectProfile;
