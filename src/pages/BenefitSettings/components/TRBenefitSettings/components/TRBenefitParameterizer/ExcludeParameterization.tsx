import {
  CircularProgress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import AlertModal from "../../../../../../components/AlertModal";
import ButtonIcon from "../../../../../../components/ButtonIcon";
import TooltipSubstring from "../../../../../../components/TooltipSubstring/TooltipSubstring";
import useBenefits from "../../../../../../hooks/useBenefits";
import { capitalize } from "../../../../../../utils/capitalize";
import {
  BENEFICIARY_KINSHIP_COMPLETE,
  BENEFICIARY_TYPE,
} from "../../../../../../utils/enumFormat";
import { IParameterization } from "./types";

const ExcludeParameterization = ({ item, benefit }: IParameterization) => {
  const [showExcludeModal, setShowExcludeModal] = useState(false);
  const { handleDeleteParameterization } = useBenefits();
  const { isLoading, mutate } = handleDeleteParameterization();

  return (
    <>
      <ButtonIcon tooltip="Excluir parâmetro">
        {isLoading ? (
          <CircularProgress
            color={"brand.500"}
            size={5}
            isIndeterminate
          ></CircularProgress>
        ) : (
          <MdOutlineDelete
            onClick={() => {
              setShowExcludeModal(true);
            }}
            size={20}
          />
        )}
      </ButtonIcon>

      {showExcludeModal && (
        <AlertModal
          showModal={showExcludeModal}
          setShowModal={setShowExcludeModal}
          title="Excluir parâmetro"
          isLoading={isLoading}
          request={() => mutate({ id: item?.id })}
          question={""}
          size="4xl"
        >
          <Text textAlign="left" fontWeight={600} marginBottom="10px">
            {benefit?.product?.companyProvider?.company?.corporateName} +{" "}
            {capitalize(benefit?.product?.reducedName)}
          </Text>

          <Table>
            <Thead>
              <Tr>
                <Th>Tipo</Th>
                <Th>Beneficiário</Th>
                {item?.relationship !== "holder" && <Th>Parentesco</Th>}
                <Th>Categoria</Th>
                <Th>Subcategoria</Th>
              </Tr>
            </Thead>
            <Tbody border="1px solid #edf2f7">
              <Tr>
                <Td>{BENEFICIARY_TYPE[item?.relationshipType]}</Td>
                <Td>
                  <TooltipSubstring
                    name={
                      capitalize(item?.beneficiary?.person?.name) || "Todos"
                    }
                    length={14}
                  />
                </Td>
                {item?.relationship !== "holder" && (
                  <Td>{BENEFICIARY_KINSHIP_COMPLETE[item?.relationship]}</Td>
                )}
                <Td>{item?.sector?.name || "Todos"}</Td>
                <Td>{item?.position?.name || "Todos"}</Td>
              </Tr>
            </Tbody>
          </Table>

          <Text textAlign="justify" marginTop="20px" fontWeight={600}>
            Essa ação resultará na exclusão do parâmetro existente, o que levará
            a um ajuste automático do parâmetro para todos os beneficiários que
            atualmente possuem essa configuração, de acordo com as diretrizes
            estabelecidas para os parâmetros.
          </Text>
        </AlertModal>
      )}
    </>
  );
};

export default ExcludeParameterization;
