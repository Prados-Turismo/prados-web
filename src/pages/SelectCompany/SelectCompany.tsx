import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme, Button, Box } from "@chakra-ui/react";

import Dashboard from "../../Layouts/Dashboard";
import Menu from "../../components/Menu";
import { Scroll, Table, THead, TBody, TR, TD } from "../../components/Table";

import { useGlobal } from "../../contexts/UserContext";
import { apiPermission } from "../../services/api";
import { setDataCookie } from "../../cookies";
import { capitalize } from "../../utils/capitalize";
import { cnpjMask } from "../../utils";

import {
  Section,
  AvatarWrap,
  ContentWrap,
  ListCompaniesWrap,
  Hi,
  UserName,
  Phrase,
} from "./styled";

import { IUserCompany } from "../../models/user.model";
import Loading from "../../components/Loading";
import AlertNoDataFound from "../../components/AlertNoDataFound";

const SelectProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, role, companies, permissions, setCompany, setCompanies } =
    useGlobal();

  useEffect(() => {
    document.title = `${theme.content.project} - Selecione a empresa`;
  }, [theme]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await apiPermission.get<IUserCompany[]>(
        `/user/${user?.id}/profile/${role?.id}/company`,
      );

      if (data.length === 1) {
        setDataCookie({
          key: "@fiibo.company",
          value: JSON.stringify(data[0].company),
        });

        setCompany(data[0].company);
        if (user && !user?.termsOfPrivacy) {
          navigate("/politica-privacidade");
        } else {
          navigate("/");
        }
        setIsLoading(false);
      } else {
        setDataCookie({
          key: "@fiibo.companies",
          value: JSON.stringify(data),
        });

        setCompanies(data);
        setIsLoading(false);
        if (user && !user?.termsOfPrivacy) {
          navigate("/politica-privacidade");
        }
      }
    })();
  }, [user, role, setCompany, setCompanies, navigate]);

  useEffect(() => {
    const permissionEnabled = Object.values(permissions).some(
      (permission) => permission,
    );

    if (permissionEnabled) navigate("/");
  }, [permissions, navigate]);

  const handle = (identify: IUserCompany) => {
    setDataCookie({
      key: "@fiibo.company",
      value: JSON.stringify(identify.company),
    });

    setCompany(identify.company);
    navigate("/");
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
            {isLoading ? (
              <Box margin="auto auto">
                <Loading />
              </Box>
            ) : (
              <>
                <AvatarWrap backgroundImage={theme.images.iara} />
                <ContentWrap>
                  <Hi>Olá,</Hi>
                  <UserName>{capitalize(user!.username)}</UserName>
                  <Phrase>Selecione qual empresa deseja acessar.</Phrase>

                  <ListCompaniesWrap>
                    {companies?.length > 0 ? (
                      <Scroll h="400px">
                        <Table>
                          <THead minWidth="max-content">
                            <TD textAlign="left" style={{ flex: "0 0 40%" }}>
                              <strong style={{ fontSize: "14px" }}>
                                Empresa
                              </strong>
                            </TD>
                            <TD textAlign="left">
                              <strong style={{ fontSize: "14px" }}>CNPJ</strong>
                            </TD>
                            <TD>&nbsp;</TD>
                          </THead>

                          <TBody>
                            {companies.map((company) => (
                              <TR key={company.id} minWidth="max-content">
                                <TD
                                  textAlign="left"
                                  style={{ flex: "0 0 40%" }}
                                >
                                  {company.company.name}
                                </TD>
                                <TD textAlign="left">
                                  {cnpjMask(company.company.cnpj)}
                                </TD>
                                <TD textAlign="right" padding="5px 0">
                                  <Button
                                    onClick={() => {
                                      handle(company);
                                    }}
                                    variant="contrast"
                                    borderRadius="32px"
                                  >
                                    Acessar
                                  </Button>
                                </TD>
                              </TR>
                            ))}
                          </TBody>
                        </Table>
                      </Scroll>
                    ) : (
                      <AlertNoDataFound title="Não há empresa para selecionar" />
                    )}
                  </ListCompaniesWrap>
                </ContentWrap>
              </>
            )}
          </Section>
        )}
      </Dashboard>
    </>
  );
};

export default SelectProfile;
