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
  const { company, user } = useGlobal();

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
          to="/reservas"
        >
          <Logo backgroundImage={theme.images.logo}>
            {theme.content.project}
          </Logo>
        </Link>

        {user && (
          <MenuMain>
            <LinksMenu onClose={() => null} />
          </MenuMain>
        )}
      </MenuWithLogo>
    </>
  );
};

export default Menu;
