import { IFamilyBenefitsGroup } from "../../../../models/collaborator.model";
import { IDataProductContract } from "../../../../models/product.model";
import { IFamilyContractData } from "../../../../models/productAdhesion.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdhesionDocuments {
  product: IDataProductContract | IFamilyBenefitsGroup;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  checkedAgrupados: IFamilyContractData[];
  setIsLoadingAdhesion: React.Dispatch<React.SetStateAction<boolean>>;
  setDataLimiteAssinatura: React.Dispatch<React.SetStateAction<string | null>>;
}
