import { useToastStandalone } from "../hooks/useToastStandalone"

export const permissionsText = () => {
  return useToastStandalone({
    title:
      "Desculpe, mas você não possui autorização para acessar essa funcionalidade.",
    description: "Entre em contato com o administrador da sua empresa.",
    status: "info"
  })
}
