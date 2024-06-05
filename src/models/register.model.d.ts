export interface IFormRegister {
  id: string;
  email: string;
  name: string;
  bornDate: string;
  phone: string;
  cnpj: string;
  policyPrivate: boolean;
  useTerm: boolean;
  cpf: string;
  hubSlug: string;
  type: "leader" | "affiliated" | "partnership";
  razaoSocial?: string;
  otherProduct?: string;
}
