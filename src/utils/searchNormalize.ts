export const searchNormalize = (element: string, search: string) => {
  return element
    ?.toUpperCase()
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(search.toUpperCase())
}
