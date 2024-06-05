import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { IFamilyContractData } from "../../models/productAdhesion.model";
import { keys } from "../../services/query";
import { dateFormat } from "../../utils";
import { capitalize } from "../../utils/capitalize";
import SuccessConfirmImage from "../SuccessConfirmImage/SuccessConfirmImage";
import RegisterDependent from "./components/RegisterDependent";
import AdhesionContent from "./steps/AdhesionContent";
import AdhesionDocuments from "./steps/AdhesionDocuments";
import SelectCollaborator from "./steps/SelectCollaborator";
import "./styles.css";
import { IProductAdhesion } from "./types";

const ProductAdhesion = ({
  isOpen,
  onClose,
  product,
  page,
}: IProductAdhesion) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [checkedAgrupados, setcheckedAgrupados] = useState<
    IFamilyContractData[]
  >([]);
  const [index, setIndex] = useState<number>(page === "colaboradores" ? 1 : 0);
  const [isLoadingAdhesion, setIsLoadingAdhesion] = useState(false);
  const [dataLimiteAssinatura, setDataLimiteAssinatura] = useState<
    string | null
  >(null);

  const [holderId, setHolderId] = useState(
    page === "colaboradores" ? id?.toString() : "",
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isLoadingAdhesion) {
          onClose();
          setIndex(0);
          setcheckedAgrupados([]);
          if (index === 3) {
            queryClient.invalidateQueries([
              keys.collaborator,
              "family",
              "benefits",
            ]);
          }
        }
      }}
      scrollBehavior={index === 0 ? "outside" : "inside"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        maxWidth="820px"
        width="100%"
        margin="0 10px"
        padding={index === 4 ? "10px 15px 90px" : "10px"}
        minHeight="300px"
        className="adesao-modal-content"
      >
        <ModalHeader fontSize="1.2rem" textAlign="center">
          {index <= 2 &&
            index !== 4 &&
            `${
              product?.product?.companyProvider?.company?.corporateName ||
              product?.providerName
            } - ${
              capitalize(product?.product?.reducedName) ||
              capitalize(product?.productCommercialName)
            }`}
          {index === 4 && "Cadastrar Dependente"}
        </ModalHeader>
        {!isLoadingAdhesion && <ModalCloseButton />}
        <ModalBody>
          {index === 0 && (
            <SelectCollaborator setHolderId={setHolderId} setIndex={setIndex} />
          )}

          {index > 0 && (
            <Flex
              flexDir="column"
              width="100%"
              className="animeLeft adesao-modal-flex"
            >
              {index === 1 && holderId && (
                <>
                  <AdhesionContent
                    contractId={product?.contractId}
                    beneficiaryId={holderId}
                    setIndex={setIndex}
                    setHolderId={setHolderId}
                    page={page}
                    setcheckedAgrupados={setcheckedAgrupados}
                    checkedAgrupados={checkedAgrupados}
                    product={product}
                    setIsLoadingAdhesion={setIsLoadingAdhesion}
                    setDataLimiteAssinatura={setDataLimiteAssinatura}
                  />
                </>
              )}

              {index === 2 && holderId && (
                <AdhesionDocuments
                  setIndex={setIndex}
                  checkedAgrupados={checkedAgrupados}
                  setIsLoadingAdhesion={setIsLoadingAdhesion}
                  setDataLimiteAssinatura={setDataLimiteAssinatura}
                  product={product}
                />
              )}

              {index === 3 && (
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  padding="0 0 20px"
                  gap="15px"
                >
                  <SuccessConfirmImage />
                  <Text fontSize="18px" textAlign="center" maxW="530px">
                    Agora é com a gente. Por segurança, precisamos verificar
                    algumas informações antes de liberar o produto.
                  </Text>

                  <Text fontSize="18px" fontWeight={500} maxW="570px">
                    <b>Em até 48 horas úteis, </b>enviaremos por e-mail a
                    confirmação de adesão.
                  </Text>

                  <Text fontSize="18px" fontWeight={500} maxW="570px">
                    <b>Atenção:</b>{" "}
                    {dataLimiteAssinatura &&
                      `É importante assinar o contrato dentro do prazo para que a adesão não seja cancelada. `}
                    se algum dado/documento estiver divergente, o nosso time de
                    cadastro entrará em contato comunicando a necessidade da
                    correção.
                  </Text>

                  {dataLimiteAssinatura && (
                    <Text fontSize="19px" textAlign="center">
                      O prazo para assinatura do contrato é até{" "}
                      <b>{dateFormat(new Date(dataLimiteAssinatura))}</b>.
                    </Text>
                  )}
                  <Button
                    w="100px"
                    mx="auto"
                    mt={6}
                    size="md"
                    isDisabled={isLoadingAdhesion}
                    onClick={() => {
                      if (!isLoadingAdhesion) {
                        onClose();
                        setIndex(0);
                        setcheckedAgrupados([]);
                        queryClient.invalidateQueries([
                          keys.collaborator,
                          "family",
                          "benefits",
                        ]);
                      }
                    }}
                  >
                    Ok
                  </Button>
                </Box>
              )}

              {index === 4 && (
                <>
                  <Button
                    position="absolute"
                    zIndex={3}
                    bottom="25px"
                    mr={4}
                    onClick={() => setIndex(1)}
                    size="md"
                    variant="outline"
                  >
                    Voltar
                  </Button>
                  {holderId && (
                    <Box className="animeRigth" padding="0 40px">
                      <RegisterDependent
                        holderId={holderId}
                        setIndex={setIndex}
                      />
                    </Box>
                  )}
                </>
              )}
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductAdhesion;
