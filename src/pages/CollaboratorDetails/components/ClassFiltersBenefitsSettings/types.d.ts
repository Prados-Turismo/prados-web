export interface IClassFiltersBenefitsSettings {
  productClasses: {
    product: boolean;
    productClass: string;
  }[],
  setClasseSelected: React.Dispatch<React.SetStateAction<string>>
}
