export interface IIdentificationType {
  identificationType: string
  setIdentificationType: React.Dispatch<React.SetStateAction<string>>
  handleNextStep: () => void
}
