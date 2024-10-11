import { Link } from "react-router-dom";

import { Box, Menu, MenuButton } from "@chakra-ui/react";

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
                <Link to="/produtos2">Produtos</Link>
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
              <MenuItem>
                <Link to="/usuarios">Usuários</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/ranking-clientes">Ranking Clientes</Link>
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
              <Text>Controle de Excursões</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/local-embarque">Local de Embarque</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/tipo-quarto">Tipos de Quarto</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/destinos">Destinos</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/excursoes">Excursões</Link>
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
              <MenuItem>
                <Link to="/vendas">Vendas</Link>
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
              <Text>Relatórios</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/relatorios/clientes">Clientes</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/relatorios/auditoria">Auditoria</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/relatorios/categorias">Categorias</Link>
              </MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>

      <Link to="/configuracoes">Configurações</Link>

    </Links>
  );
};

export default LinksMenu;
