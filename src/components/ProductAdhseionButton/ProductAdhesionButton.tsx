import { permissionsText } from "../../utils/permissionsText";
import ButtonIcon from "../ButtonIcon";
import { AiOutlineLike } from "react-icons/ai";
import { IProductAdhesionButton } from "./types";
import { useGlobal } from "../../contexts/UserContext";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import CompleteRegistrationModal from "../CompleteRegistrationModal";
import ProductAdhesion from "../ProductAdhesion";
import { pixelToRem } from "../../utils";

const ProductAdhesionButton = ({
  item,
  tooltip = "Aderir produto",
  withTitle = false,
}: IProductAdhesionButton) => {
  const { permissions, companyStatus } = useGlobal();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isApproved = companyStatus?.status === "approved";

  return (
    <>
      {item?.available &&
        (permissions?.adhesion ? (
          <>
            {withTitle ? (
              <Button
                variant="outline"
                borderColor="#E5E5E5"
                borderRadius="4px"
                w="100px"
                h="30px"
                color="#505050"
                display="flex"
                gap="7px"
                fontWeight={500}
                alignItems="center"
                _hover={{
                  borderColor: "brand.500",
                  color: "brand.500",
                  backgroundColor: "brand.50",
                }}
                onClick={() => {
                  onOpen();
                }}
              >
                <AiOutlineLike
                  size={20}
                  name="adhesion"
                  id={`adhesion_${item?.product?.reducedName
                    .toLocaleLowerCase()
                    .replaceAll("-", "")
                    .replaceAll(" ", "_")
                    .replaceAll("__", "_")}`}
                />
                <Box fontSize={pixelToRem(15)}>Aderir</Box>
              </Button>
            ) : (
              <ButtonIcon tooltip={tooltip}>
                <AiOutlineLike
                  size={20}
                  onClick={() => {
                    onOpen();
                  }}
                  name="adhesion"
                  id={`adhesion_${item?.product?.reducedName
                    .toLocaleLowerCase()
                    .replaceAll("-", "")
                    .replaceAll(" ", "_")
                    .replaceAll("__", "_")}`}
                />
              </ButtonIcon>
            )}
          </>
        ) : (
          !withTitle && (
            <AiOutlineLike
              size={20}
              cursor="default"
              color="#bcc5ce"
              onClick={permissionsText}
            />
          )
        ))}

      {isOpen &&
        (!isApproved && item?.product?.regulated ? (
          <CompleteRegistrationModal isOpen={isOpen} handleModals={onClose} />
        ) : (
          <ProductAdhesion
            isOpen={isOpen}
            onClose={onClose}
            product={item}
            page="beneficios"
          />
        ))}
    </>
  );
};

export default ProductAdhesionButton;
