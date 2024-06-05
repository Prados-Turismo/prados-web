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

const MenuDropDown = ({
  onBoardingCompleted,
}: {
  onBoardingCompleted?: boolean;
}) => {
  const {
    user,
    roles,
    company,
    permissions,
    changeProfile,
    signOut,
    isIssuer,
    isBroker,
    companyStatus,
    isUseTerm,
    companies,
    isCompany,
    isPartner,
  } = useGlobal();

  const nameAvatar = () => {
    const name = company ? company.name : user!.username;
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  const isApproved =
    companyStatus?.status === "approved" || isBroker || isIssuer;

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
              {!company && companies.length > 1 && (
                <MenuItem>
                  <Link to="/selecione-empresa">Selecionar empresa</Link>
                </MenuItem>
              )}
              {company && !isUseTerm && (
                <MenuItem>
                  <Link to="/">
                    {!user?.termsOfPrivacy
                      ? "Política de privacidade"
                      : "Termos de uso"}
                  </Link>
                </MenuItem>
              )}
              {!isApproved && company && isUseTerm && onBoardingCompleted && (
                <MenuItem>
                  <Link to="/completar-cadastro">Completar Cadastro</Link>
                </MenuItem>
              )}
              {(isBroker || isCompany) &&
                user &&
                user?.termsOfPrivacy &&
                company &&
                isUseTerm &&
                onBoardingCompleted && (
                  <MenuItem>
                    {permissions.companyData ? (
                      <Link to="/dados-empresa">Dados da Empresa</Link>
                    ) : (
                      <Box color="gray.300" onClick={permissionsText}>
                        Dados da Empresa
                      </Box>
                    )}
                  </MenuItem>
                )}
              {onBoardingCompleted && (
                <MenuItem>
                  <Link to="/senha">Alterar Senha</Link>
                </MenuItem>
              )}
              {!isIssuer &&
                user &&
                user?.termsOfPrivacy &&
                company &&
                isUseTerm &&
                onBoardingCompleted && (
                  <>
                    <MenuItem>
                      {permissions?.productSettings ? (
                        <Link to="/parametrizacao-de-produtos">
                          Parametrização de Produtos
                        </Link>
                      ) : (
                        <Box color="gray.300" onClick={permissionsText}>
                          Parametrização de Produtos
                        </Box>
                      )}
                    </MenuItem>

                    {permissions?.healthVoucherManagement && (
                      <MenuItem>
                        <Link to="/gestao-promocao-saude">
                          Gestão Promoção à Saúde
                        </Link>
                      </MenuItem>
                    )}
                  </>
                )}
              {permissions.healthVoucherManagement &&
                company &&
                isUseTerm &&
                onBoardingCompleted && (
                  <MenuItem>
                    <Link to="/gestao-promocao-saude">
                      Gestão Promoção à Saúde
                    </Link>
                  </MenuItem>
                )}
              {permissions.userManagement &&
                company &&
                isUseTerm &&
                onBoardingCompleted && (
                  <MenuItem>
                    <Link to="/gestao-de-usuarios">Gestão de Usuários</Link>
                  </MenuItem>
                )}
              {Boolean(isBroker || isCompany || isPartner) && (
                <MenuItem
                  onClick={() =>
                    window.open(
                      isBroker
                        ? "https://calendly.com/comercialfiibo"
                        : "https://calendly.com/implantacoesfiibo",
                      "_blank",
                    )
                  }
                >
                  <Link to="">Agendar Apresentação</Link>
                </MenuItem>
              )}

              {roles.length > 1 && (
                <MenuItem>
                  <Link
                    to={"/selecione-perfil"}
                    onClick={() => {
                      changeProfile();
                      localStorage.removeItem("@comparatorSelected");
                    }}
                  >
                    Alterar perfil
                  </Link>
                </MenuItem>
              )}
              <MenuItem>
                <Box onClick={() => signOut({ hasLoginRedirect: true })}>
                  Sair
                </Box>
              </MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default MenuDropDown;
