export const emailInvalid = "Adicione um e-mail válido"
export const cnpjInvalid = "Adicione um CNPJ válido"
export const cpfInvalid = "Adicione um CPF válido"
export const phoneInvalid = "Adicione um número de contato com DDD"

export const fieldRequired = (field: string): string =>
  `O campo ${field} é obrigatório`

export const minContent = (min: number): string =>
  `deve conter no mínimo ${min} caracteres`

export const maxContent = (max: number): string =>
  `deve conter no máximo ${max} caracteres`

export const positiveNumber = (): string =>
  `deve conter somente valores positivos`
