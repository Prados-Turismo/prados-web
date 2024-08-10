import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Menu, MenuButton, Tooltip, useMediaQuery } from "@chakra-ui/react";

// Icons
import { TfiHeadphoneAlt } from "react-icons/tfi";

// Types
import { ILinksMenu } from "./types";

import {
  Links,
  MenuItem,
  MenuList,
  Text,
  ButtonStyled
} from "./styled";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";


const LinksMenu = ({ onClose }: ILinksMenu) => {
  const [activeLink] = useState(window.location.href.split("/")[3]);
  const [break1280] = useMediaQuery("(max-width: 1279px)");

  return (
    <Links>
      <Menu>
        {({ isOpen }) => (
          <Box style={{ zIndex: "3" }}>
            <MenuButton
              isActive={isOpen}
              name="perfilMenuDropDown"
              as={ButtonStyled}
              rightIcon={
                isOpen ? (
                  <MdKeyboardArrowUp size={18} />
                ) : (
                  <MdKeyboardArrowDown size={18} />
                )
              }
            >
              <Text>Reservas</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/reservas">Listar Reservas</Link>
              </MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>
      <Menu>
        {({ isOpen }) => (
          <Box style={{ zIndex: "3" }}>
            <MenuButton
              isActive={isOpen}
              name="perfilMenuDropDown"
              as={ButtonStyled}
              rightIcon={
                isOpen ? (
                  <MdKeyboardArrowUp size={18} />
                ) : (
                  <MdKeyboardArrowDown size={18} />
                )
              }
            >
              <Text>Cadastro</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/pacotes">Pacotes</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/excursoes">Excursões</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/produtos2">Produtos</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/tipo-quarto">Tipos de Quarto</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/categoria-transacao">Categoria Transação</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/subcategoria-transacao">Subcategoria Transação</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/conta-bancaria">Conta Bancaria</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/forma-pagamento">Forma Pagamento</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/cliente">Cliente</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/fornecedor">Fornecedor</Link>
              </MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>
      <Menu>
        {({ isOpen }) => (
          <Box style={{ zIndex: "3" }}>
            <MenuButton
              isActive={isOpen}
              name="perfilMenuDropDown"
              as={ButtonStyled}
              rightIcon={
                isOpen ? (
                  <MdKeyboardArrowUp size={18} />
                ) : (
                  <MdKeyboardArrowDown size={18} />
                )
              }
            >
              <Text>Financeiro</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/transacoes">Transações</Link>
              </MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>

      <Box display="flex" width="100%" flex="1">
        {/* break900 && company && <Notification /> */}
      </Box>

      {break1280 ? (
        <Link
          to="/central-de-ajuda"
          onClick={onClose}
          className={activeLink === "central-de-ajuda" ? "active-link" : ""}
        >
          Central de Ajuda
        </Link>
      ) : (
        <Tooltip label="Central de Ajuda" background="brand.500" hasArrow>
          <Link to="/central-de-ajuda" className="link-hover-disabled">
            <Button
              variant="unstyled"
              margin={break1280 ? "unset" : "auto 0"}
              display="flex"
              justifyContent="center"
              _hover={{ opacity: "0.7" }}
            >
              <TfiHeadphoneAlt color="#909090" size={22} />
            </Button>
          </Link>
        </Tooltip>
      )}
      {break1280 && (
        <Link
          to="/notificacoes"
          onClick={onClose}
          className={activeLink === "notificacoes" ? "active-link" : ""}
        >
          Notificações
        </Link>
      )}
      {/* {!break1280 && <Bell />} */}
    </Links>
  );
};

export default LinksMenu;
