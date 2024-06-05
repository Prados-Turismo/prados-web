export interface IDocument {
  id?: string
  key: string
  contentType?: string | null
  active?: boolean
  isPrivate: boolean
  createdAt?: string
  url?: string
}
