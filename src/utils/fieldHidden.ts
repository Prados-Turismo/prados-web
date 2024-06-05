export const cpfHidden = (cpf: string) => cpf?.replace(/^.{8}/, "***.***.")
