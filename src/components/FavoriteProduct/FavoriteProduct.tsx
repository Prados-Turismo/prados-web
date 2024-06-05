import { CircularProgress } from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import useBenefits from "../../hooks/useBenefits";
import { IFavoriteProduct } from "../../models/benefits.model";
import BenefitRadioStatus from "../BenefitRadioStatus";
import { IDataProductContract } from "../../models/product.model";

interface IProps {
  provideFavoriteOption?: boolean;
  id?: string;
  userId?: string;
  available?: boolean;
  itIsFavorite?: boolean;
  isFetching: boolean;
  product: IDataProductContract;
  handleGetProduts?: () => void;
}

const FavoriteProduct = ({
  provideFavoriteOption,
  id,
  userId,
  available,
  itIsFavorite,
  isFetching,
  product,
  handleGetProduts,
}: IProps) => {
  const { favoriteProduct } = useBenefits();
  const { mutate, isLoading } = favoriteProduct({ handleGetProduts });

  const favoriteAction = async (data: IFavoriteProduct & { id: string }) => {
    const { id, ...otherValues } = data;
    mutate(otherValues);
  };

  return (
    <>
      {provideFavoriteOption ? (
        <>
          {isLoading ? (
            <CircularProgress color="brand.500" size={5} isIndeterminate />
          ) : (
            <>
              {itIsFavorite ? (
                <FaHeart
                  className="print-disabled"
                  color="red"
                  cursor="pointer"
                  size={17}
                  onClick={() => {
                    if (!isFetching) {
                      favoriteAction({
                        companyContractId: id,
                        product: product,
                        id: id as string,
                        isFavorite: itIsFavorite ? false : true,
                        userId: userId || "",
                      });
                    }
                  }}
                />
              ) : (
                <CiHeart
                  className="print-disabled"
                  cursor="pointer"
                  size={22}
                  onClick={() => {
                    if (!isFetching) {
                      favoriteAction({
                        companyContractId: id,
                        product: product,
                        id: id as string,
                        isFavorite: itIsFavorite ? false : true,
                        userId: userId || "",
                      });
                    }
                  }}
                />
              )}
            </>
          )}
        </>
      ) : (
        <BenefitRadioStatus flDispBeneficiario={Boolean(available)} />
      )}
    </>
  );
};

export default FavoriteProduct;
