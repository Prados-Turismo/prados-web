import { Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import SimpleModal from "../../../../components/SimpleModal";
import { pixelToRem } from "../../../../utils";

const columnOptions = [
  {
    value: "valorProduto",
    label: "Valor do produto",
  },
  {
    value: "valorEmpresa",
    label: "Valor pago pela empresa",
  },
  {
    value: "valorBeneficiario",
    label: "Valor pago pelo beneficiário",
  },
  {
    value: "dataContratacao",
    label: "Data de contratação",
  },
  {
    value: "numeroCarteirinha",
    label: "Nº da Carteirinha",
  },
];

interface ITableSettingsModal {
  showModal: boolean;
  setShowModal: (e: boolean) => void;
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableSettingsModal = ({
  showModal,
  setShowModal,
  selectedColumns,
  setSelectedColumns,
}: ITableSettingsModal) => {
  return (
    <SimpleModal
      title="Configurações"
      isOpen={showModal}
      handleModal={() => {
        setShowModal(false);
      }}
      minHeight="160px"
      size="2xl"
    >
      <Flex flexDirection="column" padding="25px">
        <Text fontWeight="bold" fontSize={pixelToRem(17)} marginBottom="20px">
          Personalize sua visualização das informações
        </Text>
        <Flex gap="20px" flexWrap="wrap">
          {columnOptions?.map((item) => (
            <Checkbox
              key={item?.value}
              size="md"
              minW="250px"
              isChecked={selectedColumns.includes(item?.value)}
              _checked={{
                "span:first-of-type": {
                  background: "brand.500",
                  borderColor: "brand.500",
                },
              }}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  setSelectedColumns([...selectedColumns, item?.value]); // Adicione à lista
                } else {
                  setSelectedColumns(
                    selectedColumns.filter(
                      (col: string) => col !== item?.value,
                    ),
                  ); // Remova da lista
                }
              }}
            >
              {item?.label}
            </Checkbox>
          ))}
        </Flex>

        <Flex justifyContent="flex-end" marginTop="25px" gap="15px">
          <Button
            borderRadius="4px"
            variant="outline"
            onClick={() => {
              setShowModal(false);
              setSelectedColumns([]);
            }}
          >
            Cancelar
          </Button>
          <Button
            borderRadius="4px"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Confirmar
          </Button>
        </Flex>
      </Flex>
    </SimpleModal>
  );
};

export default TableSettingsModal;
