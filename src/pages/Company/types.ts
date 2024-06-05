export interface Position {
  id: string
  title: string
  sectorId: string
}
export interface Sector {
  id: string
  title: string
  hidden?: boolean
  positions: Map<string, Position>
}
