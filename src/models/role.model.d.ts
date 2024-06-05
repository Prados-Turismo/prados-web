export const Role = {
  ADMIN: "ADMIN",
  EMPRESA: "EMPRESA",
  BENEFICIARIO: "BENEFICIARIO",
  PRE: "PRE",
  PARCEIRO: "PARCEIRO",
  CORRETOR: "CORRETOR",
  BI: "BI",
  INTEGRACAO: "INTEGRACAO",
  EMISSOR: "EMISSOR"
}

export interface IRole {
  id: string
  name: keyof typeof Role
}
