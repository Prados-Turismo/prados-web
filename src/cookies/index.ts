/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRole } from "../models/role.model";
import { IUser } from "./../models/user.model";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export const getWelcome = (): string | null => {
  const cookies = parseCookies();

  return cookies["@fiibo.welcome"] || null;
};

export const getToken = (): string | null => {
  const cookies = parseCookies();

  return cookies["@fiibo.token"] || null;
};

export const getRefreshToken = (): string | null => {
  const cookies = parseCookies();

  return cookies["@fiibo.refreshToken"] || null;
};

export const getUser = (): IUser | null => {
  const cookies = parseCookies();
  const useData = cookies["@fiibo.user"];

  return useData ? JSON.parse(useData) : null;
};

export const getRole = (): IRole | null => {
  const cookies = parseCookies();
  const roleData = cookies["@fiibo.role"];

  return roleData ? JSON.parse(roleData) : null;
};

export const getRoles = (): IRole[] | [] => {
  const cookies = parseCookies();
  const rolesData = cookies["@fiibo.roles"];

  return rolesData ? JSON.parse(rolesData) : [];
};

export const getCompany = (): any | null => {
  const cookies = parseCookies();
  const companyData = cookies["@fiibo.company"];

  return companyData ? JSON.parse(companyData) : null;
};

export const getCompanies = (): any | null => {
  const cookies = parseCookies();
  const companyData = cookies["@fiibo.companies"];

  return companyData ? JSON.parse(companyData) : [];
};

export const getPermissions = (): any | null => {
  const cookies = parseCookies();
  const permissionsData = cookies["@fiibo.permissions"];

  return permissionsData ? JSON.parse(permissionsData) : [];
};

export const getUseTerm = (): any | null => {
  const cookies = parseCookies();
  const termData = cookies["@fiibo.term"];

  return termData ? JSON.parse(termData) : [];
};

export const setDataCookie = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  setCookie(null, key, value, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
};

export const removeAllCookies = (): void => {
  destroyCookie(null, "@fiibo.welcome");
  destroyCookie(null, "@fiibo.token");
  destroyCookie(null, "@fiibo.refreshToken");
  destroyCookie(null, "@fiibo.user");
  destroyCookie(null, "@fiibo.role");
  destroyCookie(null, "@fiibo.roles");
  destroyCookie(null, "@fiibo.company");
  destroyCookie(null, "@fiibo.companies");
  destroyCookie(null, "@fiibo.permissions");
  destroyCookie(null, "@fiibo.term");
};
