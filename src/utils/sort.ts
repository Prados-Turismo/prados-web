import { IProdutos } from "../models/benefits.model"

export const sortStatus = function (a: IProdutos, b: IProdutos) {
  if (
    a.contratos_empresa.flDispBeneficiario <
    b.contratos_empresa.flDispBeneficiario
  ) {
    return 1
  }
  if (
    a.contratos_empresa.flDispBeneficiario >
    b.contratos_empresa.flDispBeneficiario
  ) {
    return -1
  }
  return 0
}

export const sortParceiro = function (a: IProdutos, b: IProdutos) {
  if (a.nomeParceiro > b.nomeParceiro) {
    return 1
  }
  if (a.nomeParceiro < b.nomeParceiro) {
    return -1
  }
  return 0
}

export const sortDomain = function (a: any, b: any) {
  if (
    a.domain > b.domain ||
    a.domain === "GESTÃO PROMOÇÃO A SAÚDE" ||
    a.domain === "CONFIGURAÇÕES DE PRODUTOS"
  ) {
    return 1
  }
  if (a.domain < b.domain) {
    return -1
  }
  return 0
}
