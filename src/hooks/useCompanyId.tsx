import { useGlobal } from "../contexts/UserContext"

export function useCompanyId() {
  const { company } = useGlobal()

  return company!.externalCompanyId
}
