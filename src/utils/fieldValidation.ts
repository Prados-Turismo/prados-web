export const cnpjValidation = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, "") // Remove non-numeric characters from the CNPJ

  // CNPJ must have 14 digits
  if (cnpj.length !== 14) {
    return false
  }

  // Check for repeated digits
  if (/^(\d)\1+$/.test(cnpj)) {
    return false
  }

  const size = cnpj.length - 2
  const numbers = cnpj.substring(0, size)
  const digits = cnpj.substring(size)

  const sum1 =
    Number(numbers.charAt(0)) * 5 +
    Number(numbers.charAt(1)) * 4 +
    Number(numbers.charAt(2)) * 3 +
    Number(numbers.charAt(3)) * 2 +
    Number(numbers.charAt(4)) * 9 +
    Number(numbers.charAt(5)) * 8 +
    Number(numbers.charAt(6)) * 7 +
    Number(numbers.charAt(7)) * 6 +
    Number(numbers.charAt(8)) * 5 +
    Number(numbers.charAt(9)) * 4 +
    Number(numbers.charAt(10)) * 3 +
    Number(numbers.charAt(11)) * 2

  const result1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11)
  if (result1 !== Number(digits.charAt(0))) {
    return false
  }

  const sum2 =
    Number(numbers.charAt(0)) * 6 +
    Number(numbers.charAt(1)) * 5 +
    Number(numbers.charAt(2)) * 4 +
    Number(numbers.charAt(3)) * 3 +
    Number(numbers.charAt(4)) * 2 +
    Number(numbers.charAt(5)) * 9 +
    Number(numbers.charAt(6)) * 8 +
    Number(numbers.charAt(7)) * 7 +
    Number(numbers.charAt(8)) * 6 +
    Number(numbers.charAt(9)) * 5 +
    Number(numbers.charAt(10)) * 4 +
    Number(numbers.charAt(11)) * 3 +
    Number(digits.charAt(0)) * 2

  const result2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11)
  if (result2 !== Number(digits.charAt(1))) {
    return false
  }

  return true
}

export const cpfValidation = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "") // Remove caracteres não numéricos

  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1+$/.test(cpf)) {
    return false
  }

  // Calcula o primeiro dígito verificador
  let soma = 0
  // eslint-disable-next-line no-loops/no-loops
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  let digitoVerificador = resto === 10 || resto === 11 ? 0 : resto

  // Verifica se o primeiro dígito verificador é válido
  if (digitoVerificador !== parseInt(cpf.charAt(9))) {
    return false
  }

  // Calcula o segundo dígito verificador
  soma = 0
  // eslint-disable-next-line no-loops/no-loops
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  digitoVerificador = resto === 10 || resto === 11 ? 0 : resto

  // Verifica se o segundo dígito verificador é válido
  if (digitoVerificador !== parseInt(cpf.charAt(10))) {
    return false
  }

  return true // CPF válido
}

export const emailValidation = (email: string) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (regex.test(email) === false) {
    return true
  } else {
    return false
  }
}
