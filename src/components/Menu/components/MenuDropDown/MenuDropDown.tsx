import { Box, Menu, MenuButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Icons
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// Utils
import { permissionsText } from "../../../../utils/permissionsText";

// Contexts
import { useGlobal } from "../../../../contexts/UserContext";

// Styled Components
import {
  Button,
  CircleBox,
  MenuItem,
  MenuList,
  Text,
  UserImage,
} from "./styled";

const MenuDropDown = () => {
  const {
    user,
    signOut,
  } = useGlobal();

  const nameAvatar = () => {
    const name = user!.username;
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <Box style={{ zIndex: "3" }}>
            <MenuButton
              isActive={isOpen}
              name="perfilMenuDropDown"
              as={Button}
              rightIcon={
                isOpen ? (
                  <MdKeyboardArrowUp size={18} />
                ) : (
                  <MdKeyboardArrowDown size={18} />
                )
              }
            >
              <Text>{nameAvatar()}</Text>

              <CircleBox>
                <UserImage />
              </CircleBox>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Box onClick={() => signOut({ hasLoginRedirect: true })}>
                  Sair
                </Box>
              </MenuItem>
              <MenuItem>
                <Link to="/senha">Alterar Senha</Link>
              </MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default MenuDropDown;
