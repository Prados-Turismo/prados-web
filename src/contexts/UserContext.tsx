/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useTheme } from "@chakra-ui/react";
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
import { apiPrados } from "../services/api";
import { queryClient } from "../services/query";

import { Warning } from "../errors";
import useError from "../hooks/useError";

import { ICompanyAssociatedStatus } from "../models/companies-associated";
import { ICompanyInfo } from "../models/company.model";
import { IRole } from "../models/role.model";
import { IUser, IUserCompany } from "../models/user.model";
import { INotificationsData } from "../models/notifications";

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
  isAdmin: boolean;
  isVendedor: boolean;
  isFuncionario: boolean;

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

  const finishSession = ({
    hasLoginRedirect,
  }: {
    hasLoginRedirect: boolean;
  }) => {
    queryClient.removeQueries();
    removeAllCookies();
    setUser(null);

    if (hasLoginRedirect) {
      navigate("/login");
    }
  };

  const changeProfile = () => {
  };

  const changeCompany = () => {
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
      const loginResponse = await apiPrados.post<{
        userId: string
        token: string
      }>("/usuarios/auth", {
        username,
        password,
      });

      setDataCookie({
        key: "@prados.token",
        value: loginResponse.data.token
      });

      const userResponse = await apiPrados.get<IUser>(`usuarios/find/${loginResponse.data.userId}`);

      setUser(userResponse.data);

      setDataCookie({
        key: "@prados.user",
        value: JSON.stringify(userResponse.data),
      });

      navigate("/reservas");

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
          queryClient.resetQueries();

          finishSession({ hasLoginRedirect: true });

          useToastStandalone({
            title: "Token expirado!",
            description: "Seu token expirou, faça login novamente",
            status: "info",
            duration: 10000,
          });
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

  const isAdmin = Boolean(user?.tipo === 1);
  const isVendedor = Boolean(user?.tipo === 2);
  const isFuncionario = Boolean(user?.tipo === 3);

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
        isAdmin,
        isVendedor,
        isFuncionario,
      }}
    >
      <Favicon favicon={favicon} />
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobal };
