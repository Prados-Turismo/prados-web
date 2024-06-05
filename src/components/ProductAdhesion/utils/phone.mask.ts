export const phoneMask = (phone: string) => {
  let p = String(phone)

  p = p.replace(/\D/g, "")
  p = p.replace(/^(\d{2})(\d)/g, "($1) $2")
  p = p.replace(/(\d)(\d{4})$/, "$1-$2")

  return p
}

export const cellPhoneMask = (phone: string) => {
  // Expressão regular para validar números de telefone celular com DDD
  const regexTelefone = /^\([1-9]{2}\) 9[6-9]{1}[0-9]{3}-[0-9]{4}$/

  // Remove espaços em branco e caracteres especiais do telefone
  const telefoneLimpo = phone.replace(/[\s()-]/g, "")

  // Verifica se o telefone corresponde à expressão regular
  return regexTelefone.test(telefoneLimpo)
}

export const phoneMaskWith0800 = (phone: string) => {
  // Remove tudo que não for dígito
  const telefone = phone.replace(/\D/g, "")

  // Verifica o tamanho do número
  if (telefone.length === 10 || telefone.length === 11) {
    // Celular com DDD
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
  } else if (telefone.length === 12) {
    // Número no formato (XX) XXX XXX XXXX
    return telefone.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "($1) $2 $3 $4")
  } else {
    // Número inválido
    return telefone
  }
}

export const phoneIso = (number: string) => {
  let p = String(number)
  p = p.replace(/\D/g, "")
  return p
}
