export interface IFieldSearch {
  reset?: boolean
  placeholder?: string
  handleSearch: (content: string) => void
  dinamic?: boolean
}
