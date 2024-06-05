import { useEffect, useMemo, useState } from "react";
import { TD } from "../../../../../../components/Table";
import { genericSort, numberFormat } from "../../../../../../utils";
import BenefitValueModal from "../../../../../../components/BenefitValueModal";
import { ITRBenefitParameterizer } from "./types";
import ExcludeParameterization from "./ExcludeParameterization";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../../../../../utils/enumFormat";
import TooltipSubstring from "../../../../../../components/TooltipSubstring/TooltipSubstring";
import { Flex } from "@chakra-ui/layout";
import ButtonIcon from "../../../../../../components/ButtonIcon";
import { RiPencilFill, RiCloseFill, RiCheckFill } from "react-icons/ri";
import ModalBenefitTable from "../../../../../CollaboratorDetails/components/ModalBenefitTable";
import AlertModal from "../../../../../../components/AlertModal";
import useBenefits from "../../../../../../hooks/useBenefits";
import { CircularProgress } from "@chakra-ui/progress";
import RadioGroupPercentualOrValue from "../../../../../../components/RadioGroupPercentualOrValue";
import SliderPercentual from "../../../../../../components/SliderPercentual";
import NumericInput from "../../../../../../components/NumericInput";
import { capitalize } from "../../../../../../utils/capitalize";

const TRBenefitParameterizer = ({ item, benefit }: ITRBenefitParameterizer) => {
  const { handleEditParameterization } = useBenefits();
  const { isLoading, mutate } = handleEditParameterization({ isEdit: true });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showValueModal, setShowValueModal] = useState<boolean>(false);

  const benefitValue = benefit?.precification[0]?.[item?.relationshipType].sort(
    (a, b) =>
      genericSort(a, b, {
        property: "range",
      }),
  )[0]?.finalValue;

  const defaultValuesForm = {
    percentualOuValor: item?.percentageValue,
    percentualDescontoPadrao: item.value,
    valorDescontoPadrao: item?.value,
    percentage: item?.value,
  };

  const [editable, setEditable] = useState<boolean>(false);
  const [form, setForm] = useState(defaultValuesForm);

  const handleValueChange = (newValue: number) => {
    const percentual = parseFloat(((newValue / benefitValue) * 100).toFixed(2));

    setForm((prev) => ({
      ...prev,
      valorDescontoPadrao: newValue,
      percentage: percentual,
    }));
  };

  const valuePaymentCompany = useMemo(() => {
    return form.percentualOuValor === "P"
      ? benefitValue * ((form?.percentage || 0) / 100)
      : form.valorDescontoPadrao;
  }, [form.percentage]);

  useEffect(() => {
    if (editable) {
      setForm({
        ...form,
        valorDescontoPadrao: 0,
        percentualDescontoPadrao: 0,
        percentage: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form?.percentualOuValor]);

  return (
    <>
      <TD>{item?.relationship === "holder" ? "Titular" : "Dependente"}</TD>
      <TD>
        <TooltipSubstring
          name={capitalize(item?.beneficiary?.person?.name) || "Todos"}
          length={14}
        />
      </TD>
      <TD>{BENEFICIARY_KINSHIP_COMPLETE[item?.relationship] || "Todos"}</TD>
      <TD>{item?.sector?.name || "Todos"}</TD>
      <TD>{item?.position?.name || "Todos"}</TD>
      <TD className="benefitTD" onClick={() => setShowValueModal(true)}>
        {benefit?.precification?.[0]?.[
          item?.relationship === "holder" ? "holder" : "dependent"
        ].length === 1
          ? ""
          : "A partir de "}
        {numberFormat(benefitValue)}
      </TD>
      <TD>
        {editable ? (
          <RadioGroupPercentualOrValue
            editEnable={editable}
            form={form}
            setForm={setForm}
          />
        ) : item?.percentageValue === "V" ? (
          "Valor"
        ) : (
          "Percentual"
        )}
      </TD>
      <TD>
        {editable ? (
          form?.percentualOuValor === "P" ? (
            <SliderPercentual
              editEnable={editable && form.percentualOuValor === "P"}
              form={form}
              setForm={setForm}
              value={form?.percentage}
            />
          ) : (
            <NumericInput
              value={valuePaymentCompany}
              onChange={handleValueChange}
              valueLimit={benefitValue}
            />
          )
        ) : item?.percentageValue === "V" ? (
          numberFormat(valuePaymentCompany)
        ) : (
          `% ${form?.percentage}`
        )}
      </TD>

      {!(!item?.sector && !item?.position && !item?.beneficiary) &&
      benefit?.available ? (
        <TD
          style={{ flex: "0 0 4%" }}
          onClick={() => {
            setForm(defaultValuesForm);
            setEditable(false);
          }}
        >
          <ExcludeParameterization item={item} benefit={benefit} />
        </TD>
      ) : (
        <TD style={{ flex: "0 0 4%" }}></TD>
      )}
      <TD style={{ flex: "0 0 5%" }}>
        {benefit?.available &&
          (isLoading ? (
            <CircularProgress
              color={"brand.500"}
              size={5}
              isIndeterminate
            ></CircularProgress>
          ) : editable ? (
            <Flex gap="7px">
              <ButtonIcon tooltip="Salvar Edição">
                <RiCheckFill
                  size={23}
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                />
              </ButtonIcon>

              <ButtonIcon tooltip="Cancelar Edição">
                <RiCloseFill
                  size={23}
                  onClick={() => {
                    setForm(defaultValuesForm);
                    setEditable(false);
                  }}
                />
              </ButtonIcon>
            </Flex>
          ) : (
            <ButtonIcon tooltip="Editar parâmetro">
              <RiPencilFill
                onClick={() => {
                  setEditable(true);
                }}
                size={18}
              />
            </ButtonIcon>
          ))}
      </TD>

      {showEditModal && (
        <AlertModal
          showModal={showEditModal}
          title="Editar parâmetro"
          setShowModal={() => {
            setShowEditModal(false);
          }}
          isLoading={isLoading}
          request={() => {
            mutate({
              beneficiaryId: item?.beneficiaryId,
              positionId: item?.positionId,
              sectorId: item?.sectorId,
              relationship: item?.relationship,
              companyId: item?.companyId,
              productId: item?.productId,
              companyContractId: item?.companyContractId,
              relationshipType: item?.relationshipType,
              percentageValue: form?.percentualOuValor,
              value:
                form?.percentualOuValor === "P"
                  ? form?.percentage
                  : form?.valorDescontoPadrao,
              type: item?.type,
            });
            setShowEditModal(false);
          }}
          question={""}
          size="4xl"
        >
          <ModalBenefitTable
            isSingle={false}
            title={`${benefit?.product?.companyProvider?.company
              ?.corporateName} - ${capitalize(benefit?.product?.reducedName)}`}
            benefit={benefit}
            relationshipType={item?.relationshipType}
            sectorName={item?.sector?.name || "Todos"}
            positionName={item?.position?.name || "Todos"}
            beneficiaryName={
              capitalize(item?.beneficiary?.person?.name) || "Todos"
            }
            percentageValue={form?.percentualOuValor}
            value={
              form?.percentualOuValor === "P"
                ? form?.percentage
                : form?.valorDescontoPadrao
            }
          />
        </AlertModal>
      )}

      {showValueModal && (
        <BenefitValueModal
          benefit={benefit}
          parametrizerItemValue={item?.value}
          relationship={item?.relationshipType}
          showModal={showValueModal}
          setShowModal={setShowValueModal}
          page="parametersModal"
          percentageValue={form?.percentualOuValor}
        />
      )}
    </>
  );
};

export default TRBenefitParameterizer;
