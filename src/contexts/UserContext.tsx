/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { useTheme } from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";

import Favicon from "../components/Favicon";

import {
  getCompanies,
  getCompany,
  getRole,
  getRoles,
  getUser,
  removeAllCookies,
  setDataCookie,
  getPermissions,
  getUseTerm,
} from "../cookies";

import { useToastStandalone } from "../hooks/useToastStandalone";
import { apiPermission, apiPermissionNoAuth } from "../services/api";
import { queryClient } from "../services/query";

import { Warning } from "../errors";
import useAuth from "../hooks/useAuth";
import useError from "../hooks/useError";

import { ICompanyAssociatedStatus } from "../models/companies-associated";
import { ICompanyInfo } from "../models/company.model";
import { IPermissionsData } from "../models/permissions";
import { IRole } from "../models/role.model";
import { IUser, IUserCognitoData, IUserCompany } from "../models/user.model";
import { INotificationsData } from "../models/notifications";
import { notificationNavigate } from "../components/BellNotification/BellNotification";

interface ISignInCredentials {
  username: string;
  password: string;
}

interface IUserAccess {
  userEmail?: string;
  firstAccess: boolean;
}

const defaultPermissions = {
  collaborator: false,
  product: false,
  partner: false,
  financialArea: false,
  companyData: false,
  userManagement: false,
  healthVoucherManagement: false,
  reports: false,
  adhesion: false,
  productSettings: false,
  notifications: true,
};

interface IGlobalContext {
  role: IRole | null;
  setRole: (role: IRole | null) => void;

  roles: IRole[] | [];
  setRoles: (roles: IRole[] | []) => void;

  company: ICompanyInfo | null;
  setCompany: Dispatch<SetStateAction<ICompanyInfo | null>>;

  companies: IUserCompany[] | [];
  setCompanies: (companies: IUserCompany[] | []) => void;

  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  signIn(args: ISignInCredentials): Promise<void>;
  signOut({ hasLoginRedirect }: { hasLoginRedirect: boolean }): void;

  userAccess: IUserAccess;
  setUserAccess: Dispatch<SetStateAction<IUserAccess>>;

  permissions: typeof defaultPermissions;
  setPermissions: Dispatch<SetStateAction<typeof defaultPermissions>>;

  isBroker: boolean;
  isPre: boolean;
  isIssuer: boolean;
  isPartner: boolean;
  isCompany: boolean;
  changeProfile: () => void;
  changeCompany: (userCompany: { value: string }) => void;

  companyStatus: ICompanyAssociatedStatus | undefined;
  setCompanyStatus: Dispatch<
    SetStateAction<ICompanyAssociatedStatus | undefined>
  >;
  isUseTerm: boolean;
  setIsUseTerm: Dispatch<SetStateAction<boolean>>;
  notificationNavigateData: INotificationsData | null;
  setnotificationNavigateData: Dispatch<
    SetStateAction<INotificationsData | null>
  >;
  comparatorCount: number;
  setComparatorCount: Dispatch<SetStateAction<number>>;
}

interface IGlobalProvider {
  children: ReactNode;
}

const GlobalContext = createContext({} as IGlobalContext);

const GlobalProvider = ({ children }: IGlobalProvider) => {
  const navigate = useNavigate();
  const { refreshToken } = useAuth();
  const { errorHandler } = useError();

  const theme = useTheme();
  const favicon = theme.images.favicon;

  const [user, setUser] = useState<IUser | null>(getUser());
  const [role, setRole] = useState<IRole | null>(getRole());
  const [roles, setRoles] = useState<IRole[] | []>(getRoles());
  const [company, setCompany] = useState<ICompanyInfo | null>(getCompany());
  const [companies, setCompanies] = useState<IUserCompany[] | []>(
    getCompanies(),
  );
  const [isUseTerm, setIsUseTerm] = useState<boolean>(
    getUseTerm() ? true : false,
  );

  const [notificationNavigateData, setnotificationNavigateData] =
    useState<INotificationsData | null>(null);

  const [comparatorCount, setComparatorCount] = useState<number>(
    localStorage.getItem("@comparatorSelected")
      ? JSON.parse(localStorage.getItem("@comparatorSelected") || "")?.length
      : 0,
  );

  const [companyStatus, setCompanyStatus] = useState<
    ICompanyAssociatedStatus | undefined
  >(undefined);

  const [permissions, setPermissions] = useState<typeof defaultPermissions>(
    getPermissions() || defaultPermissions,
  );

  const [userAccess, setUserAccess] = useState<IUserAccess>({
    userEmail: "",
    firstAccess: false,
  });

  useEffect(() => {
    if (user && role && company) {
      (async () => {
        const { data } = await apiPermission.get<IPermissionsData[]>(
          `/user/${user.id}/company/${company.id}/profile/${role.id}/permissions`,
        );

        const result = data.map((e: IPermissionsData) => e.domain);

        const permissionsData = {
          collaborator: result.includes("COLABORADORES"),
          product: result.includes("PRODUTOS"),
          partner: result.includes("PJ`S"),
          financialArea: result.includes("ÁREA FINANCEIRA"),
          companyData: result.includes("DADOS DA EMPRESA"),
          userManagement: result.includes("GESTÃO DE USUÁRIOS"),
          healthVoucherManagement: result.includes("GESTÃO PROMOÇÃO A SAÚDE"),
          reports: result.includes("MOVIMENTAÇÕES"),
          adhesion: result.includes("ADESÃO"),
          productSettings: result.includes("CONFIGURAÇÕES DE PRODUTOS"),
          notifications: true,
        };

        setPermissions(permissionsData);
        setDataCookie({
          key: "@fiibo.permissions",
          value: JSON.stringify(permissionsData),
        });
        if (notificationNavigateData) {
          notificationNavigate(notificationNavigateData, navigate);
          setnotificationNavigateData(null);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, role, company]);

  const finishSession = ({
    hasLoginRedirect,
  }: {
    hasLoginRedirect: boolean;
  }) => {
    queryClient.removeQueries();
    localStorage.removeItem("@comparatorSelected");
    removeAllCookies();
    setUser(null);
    setRole(null);
    setRoles([]);
    setCompany(null);
    setCompanies([]);
    setnotificationNavigateData(null);
    setPermissions(defaultPermissions);

    if (hasLoginRedirect) {
      navigate("/login");
    }
  };

  const changeProfile = () => {
    queryClient.removeQueries();

    setRole(null);
    destroyCookie(null, "@fiibo.role");

    setCompany(null);
    destroyCookie(null, "@fiibo.company");

    setIsUseTerm(false);
    destroyCookie(null, "@fiibo.term");

    setCompanies([]);
    destroyCookie(null, "@fiibo.companies");

    setPermissions(defaultPermissions);
    destroyCookie(null, "@fiibo.permissions");
  };

  const changeCompany = (userCompany: { value: string }) => {
    queryClient.removeQueries();

    const companySelected = companies.find(
      (companyData) =>
        companyData.company.externalCompanyId === userCompany.value,
    );

    setPermissions(defaultPermissions);
    setCompany(companySelected!.company);

    setDataCookie({
      key: "@fiibo.company",
      value: JSON.stringify(companySelected!.company),
    });
  };

  const signOut = ({
    hasLoginRedirect,
  }: {
    hasLoginRedirect: boolean;
  }): void => {
    finishSession({ hasLoginRedirect });
    if (user) {
      useToastStandalone({ title: "Você deslogou!", status: "info" });
    }
  };

  const signIn = async ({
    username,
    password,
  }: ISignInCredentials): Promise<void> => {
    try {
      const cognitoResponse = await apiPermissionNoAuth.post<{
        tokenType: string;
        accessToken: string;
        refreshToken: string;
        user: IUserCognitoData;
        firstAccess?: boolean;
      }>("/auth/login", {
        username,
        password,
      });

      if (cognitoResponse.data.firstAccess)
        return setUserAccess({
          userEmail: username,
          firstAccess: true,
        });

      setDataCookie({
        key: "@fiibo.token",
        value: cognitoResponse.data.accessToken,
      });

      setDataCookie({
        key: "@fiibo.refreshToken",
        value: cognitoResponse.data.refreshToken,
      });

      const { data } = await apiPermission.get<IUser>("user/me");

      const isCanAccess = !data.profiles.every(
        (role) => role.name === "ADMIN" || role.name === "BENEFICIARIO",
      );

      if (isCanAccess) {
        const roles = data.profiles.filter(
          (role) => role.name !== "ADMIN" && role.name !== "BENEFICIARIO",
        );

        setDataCookie({
          key: "@fiibo.user",
          value: JSON.stringify(data),
        });

        setDataCookie({
          key: "@fiibo.roles",
          value: JSON.stringify(roles),
        });

        setUser(data);
        setRoles(roles);

        if (roles.length === 1) {
          setDataCookie({
            key: "@fiibo.role",
            value: JSON.stringify(roles[0]),
          });

          setRole(roles[0]);

          navigate("/selecione-empresa");
        } else {
          navigate("/selecione-perfil");
        }
      }

      if (!isCanAccess) {
        finishSession({ hasLoginRedirect: true });

        useToastStandalone({
          title: "O(a) usuário(a) não tem permissão para acessar o portal",
          status: "warning",
          duration: 3000,
        });
      }
    } catch (error: any) {
      if (error?.code === "ERR_NETWORK") {
        return useToastStandalone({
          title: "Sistema indisponível no momento!",
          status: "error",
        });
      }
      if (error.response.status >= 400) {
        useToastStandalone({
          title: "Erro na autenticação",
          description:
            error?.response?.data?.message[0] ||
            "Usuário ou senha incorreto. Verifique seus dados e tente novamente.",
          status: "error",
        });
      }
    }
  };

  queryClient.setDefaultOptions({
    queries: {
      onError: async (error: any) => {
        if (error instanceof Warning && error.code === 401) {
          try {
            queryClient.resetQueries();

            await refreshToken();
            setUser(getUser());
          } catch (error: any) {
            if (error.response.status === 401) {
              finishSession({ hasLoginRedirect: true });
              useToastStandalone({
                title: "Token expirado!",
                description: "Seu token expirou, faça login novamente",
                status: "info",
                duration: 10000,
              });
            }
          }
        } else {
          errorHandler(error);
        }
      },
      cacheTime: 600000, // 10 minutes
      staleTime: 480000, // 8 minutes
      retryDelay: 500, // 1/2 second
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError: errorHandler,
    },
  });

  const isBroker = Boolean(role?.name === "CORRETOR");
  const isPre = Boolean(role?.name === "PRE");
  const isIssuer = Boolean(role?.name === "EMISSOR");
  const isPartner = Boolean(role?.name === "PARCEIRO");
  const isCompany = Boolean(role?.name === "EMPRESA");

  return (
    <GlobalContext.Provider
      value={{
        role,
        setRole,
        roles,
        setRoles,
        company,
        setCompany,
        companies,
        setCompanies,
        permissions,
        setPermissions,
        user,
        setUser,
        signIn,
        signOut,
        userAccess,
        setUserAccess,
        isBroker,
        isPre,
        isIssuer,
        isPartner,
        isCompany,
        changeProfile,
        changeCompany,
        companyStatus,
        setCompanyStatus,
        isUseTerm,
        setIsUseTerm,
        notificationNavigateData,
        setnotificationNavigateData,
        comparatorCount,
        setComparatorCount,
      }}
    >
      <Favicon favicon={favicon} />
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobal };
