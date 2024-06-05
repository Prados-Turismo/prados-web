export const cpfMask = (cpf: string): string =>
  cpf
    .replace(/[^0-9]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");

export const cnpjMask = (cnpj: string): string =>
  cnpj
    .replace(/[^0-9]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");

export const cnpjIso = (cnpj: string | number) => {
  const targetCPF = String(cnpj);

  return targetCPF
    .replace(".", "")
    .replace(".", "")
    .replace("/", "")
    .replace("-", "");
};

export const censoredcpfMask = (cnpj: string): string => {
  const digits = cnpj.replace(/[^0-9]/g, "").replace(/\D/g, "");

  const thirdPart = digits.substring(6, 9);
  const lastPart = digits.substring(9);

  return `***.***.${thirdPart}-${lastPart}`;
};

export const phoneMask = (phone: string): string => {
  // Remova todos os caracteres não numéricos
  const numericPhone = phone.replace(/\D/g, "");

  // Verifica se o telefone é celular ou fixo
  if (numericPhone.length === 11) {
    // Formato para celular: (XX) 9XXXX-XXXX
    return numericPhone.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      "($1) $2 $3-$4",
    );
  } else if (numericPhone.length === 10) {
    // Formato para telefone fixo: (XX) XXXX-XXXX
    return numericPhone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    // Se não for possível determinar o formato, retornar o número original
    return phone;
  }
};

export const cellphoneValidation = (phone: string) => {
  // Remove todos os caracteres não numéricos
  const numericPhone = phone.replace(/\D/g, "");

  // Expressão regular para validar números de telefone celular com DDD
  const regexTelefone = /^([1-9]{2})9\d{4}\d{4}$/;

  // Verifica se o telefone corresponde à expressão regular
  return regexTelefone.test(numericPhone);
};

export const cellphoneMask = (phone: string): string => {
  // Remova todos os caracteres não numéricos
  const numericPhone = phone?.replace(/\D/g, "");

  // Formato para celular com DDD: (XX) 9XXXX-XXXX
  if (numericPhone.length <= 1) {
    // Se tiver apenas o DDD
    return `${numericPhone}`;
  } else if (numericPhone.length <= 2) {
    // Se tiver apenas o DDD
    return `(${numericPhone}`;
  } else if (numericPhone.length <= 7) {
    // Se tiver o DDD e os primeiros 7 dígitos
    return `(${numericPhone.substring(0, 2)}) ${numericPhone.substring(2)}`;
  } else {
    // Se tiver o DDD, os primeiros 7 dígitos e os últimos 4 dígitos
    return `(${numericPhone.substring(0, 2)}) ${numericPhone.substring(
      2,
      7,
    )}-${numericPhone.substring(7)}`;
  }
};

export const phoneIso = (phone: string) => {
  let p = String(phone);
  p = p.replace(/\D/g, "");
  return p;
};

export const dateMask = (date: string): string =>
  date
    .replace(/[^0-9]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");

export const cepMask = (phone: string): string =>
  phone
    .replace(/[^0-9]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");

export const onlyNumberMask = (text: string): string => {
  return text?.replace(/[^0-9]/g, "")?.replace(/\D/g, "");
};
