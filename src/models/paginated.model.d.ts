export interface IPaginated<T> {
  rows: T[]
  total: number
  count: number
}
