export const isUrlValid = (value: string) => {
  // Regex para validar se o valor é uma URL válida
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  return urlPattern.test(value)
}
