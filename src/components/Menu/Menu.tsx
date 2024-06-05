import {
  useTheme,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

// Icons
import { MdOutlineMenu } from "react-icons/md";

// Components
import MenuDropDown from "./components/MenuDropDown";
import MenuCompanies from "./components/MenuCompanies";
import LinksMenu from "./components/LinksMenu";

// Contexts
import { useGlobal } from "../../contexts/UserContext";

// Styles
import {
  MenuWithLogo,
  Logo,
  MenuMain,
  MenuMainMobile,
  ButtonOpenMenuMobile,
  LogoMobile,
  DrawerHeaderMain,
  DrawerBodyMain,
  DrawerFooterMain,
} from "./styled";

const Menu = ({
  onBoardingCompleted = true,
}: {
  onBoardingCompleted?: boolean;
}) => {
  const theme = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { company, companies, changeCompany, user, isUseTerm } = useGlobal();

  return (
    <>
      <MenuWithLogo>
        {onBoardingCompleted && (
          <MenuMainMobile>
            <ButtonOpenMenuMobile onClick={onOpen}>
              <MdOutlineMenu size={20} />
            </ButtonOpenMenuMobile>

            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeaderMain>
                  <Link to="/">
                    <LogoMobile backgroundImage={theme.images.logo}>
                      {theme.content.project}
                    </LogoMobile>
                  </Link>
                </DrawerHeaderMain>

                <DrawerBodyMain>
                  <LinksMenu onClose={onClose} />
                </DrawerBodyMain>

                <DrawerFooterMain></DrawerFooterMain>
              </DrawerContent>
            </Drawer>
          </MenuMainMobile>
        )}

        <Link
          to={
            !user?.termsOfPrivacy
              ? "/politica-privacidade"
              : !company
              ? "/selecione-empresa"
              : "/"
          }
        >
          <Logo backgroundImage={theme.images.logo}>
            {theme.content.project}
          </Logo>
        </Link>

        {user &&
          user?.termsOfPrivacy &&
          company &&
          isUseTerm &&
          onBoardingCompleted && (
            <MenuMain>
              <LinksMenu onClose={() => null} />
            </MenuMain>
          )}

        {!!company && companies.length > 1 && (
          <MenuCompanies
            company={company}
            companies={companies}
            onChange={changeCompany}
          />
        )}
      </MenuWithLogo>

      <MenuDropDown onBoardingCompleted={onBoardingCompleted} />
    </>
  );
};

export default Menu;
