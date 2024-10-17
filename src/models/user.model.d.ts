import { ICompanyInfo } from "./company.model";
import { IRole } from "./role.model";

export interface IUserCognitoData {
  id: string;
  username: string;
  email: string;
  firstAccess: boolean;
  phone: string;
  person: number;
  active: boolean;
  termsOfUse: boolean;
  termsOfUseAt: Date;
  termsOfPrivacy: boolean;
  termsOfPrivacyAt: Date;
  createdAt: Date;
  updatedAt: Date;
  dataAceiteTermoUsoDados: Date;
  holes: IRole;
}

export interface IUser {
  id: string
  nome: string
  username: string
  password: string
  dataCadastro: Date
  usuarioCadastro: string | null
  tipo: number
  email: string
  ativo: boolean
  comissao: number | null
  meta: number | null
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  jwt: string;
  refreshToken: string;
  user: IUser;
}

export interface IUserCompany {
  id: string;
  active: boolean;
  profileId: string;
  companyId: string;
  userId: string;
  company: ICompanyInfo;
}

export interface IForgetArgs {
  email: string;
}

export interface IResetArgs {
  password: string;
}

export interface IResetTokenArgs {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface IValidateCodeArgs {
  username: string;
  codigo: string;
}

export interface IValidateNewUserCallArgs {
  code: string;
  email: string;
  password: string;
  confirmationPassword: string;
}

export interface IForgetResponse {
  isLoading: boolean;
  call: (args: IForgetArgs) => void;
}

export interface IResetResponse {
  isLoading: boolean;
  call: (args: IResetArgs) => void;
}

export interface IResetTokenResponse {
  isLoading: boolean;
  call: (args: IResetTokenArgs) => void;
}

export interface IValidateCodeResponse {
  isLoading: boolean;
  call: (args: IValidateCodeArgs) => void;
}

export interface IValidateNewUserResponse {
  isLoading: boolean;
  call: (args: IValidateNewUserCallArgs) => void;
}

export interface IUseUser {
  forgetPassword: () => IForgetResponse;
  resetPassword: () => IResetResponse;
  resetCode: () => IResetTokenResponse;
  validateCode: () => IValidateCodeResponse;
  validateNewUser: (handleNextStep: () => void) => IValidateNewUserResponse;
}
