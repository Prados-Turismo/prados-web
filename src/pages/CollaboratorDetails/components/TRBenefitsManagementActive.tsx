import { Box, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { MdModeEdit, MdOutlineAutoDelete } from "react-icons/md";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import ButtonIcon from "../../../components/ButtonIcon";
import NumericInput from "../../../components/NumericInput";
import RadioGroupPercentualOrValue from "../../../components/RadioGroupPercentualOrValue";
import SliderPercentual from "../../../components/SliderPercentual";
import { TD, TR } from "../../../components/Table";

import AlertModal from "../../../components/AlertModal";
import BenefitDetailsModal from "../../../components/BenefitDetailsModal";
import ProviderImage from "../../../components/ProviderImage";
import SimpleModal from "../../../components/SimpleModal";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import useCollaborator from "../../../hooks/useCollaborator";
import {
  IDataCollaborator,
  IDataDependents,
  IFamilyBenefitsGroup,
} from "../../../models/collaborator.model";
import { numberFormat, pixelToRem } from "../../../utils";
import { capitalize } from "../../../utils/capitalize";
import { PRODUCT_CLASS } from "../../../utils/enumFormat";
import ButtonAdhesion from "./ButtonAdhesion";
import ButtonCancel from "./ButtonCancel";
import ModalBenefitInCancel from "./ModalBenefitInCancel";
import ModalBenefitTable from "./ModalBenefitTable";

const TRBenefitsManagementActive = ({
  item,
  holder,
  data,
}: {
  item: IFamilyBenefitsGroup;
  holder: IDataCollaborator | null;
  data: IDataDependents | IDataCollaborator;
}) => {
  const { updateBenefitPriceContract } = useCollaborator();
  const { isLoading, mutate } = updateBenefitPriceContract();
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<string>("");

  const defaultValuesForm = {
    percentualOuValor: item?.parametrizer?.percentageValue,
    percentualDescontoPadrao: parseFloat(
      ((item?.parametrizer?.value / item?.value) * 100).toFixed(2),
    ),
    valorDescontoPadrao: item?.parametrizer?.value,
    percentage:
      item?.parametrizer?.percentageValue === "P"
        ? item?.parametrizer?.value
        : parseFloat(
            ((item?.parametrizer?.value / item?.value) * 100).toFixed(2),
          ),
  };

  const [editable, setEditable] = useState<boolean>(false);
  const [form, setForm] = useState(defaultValuesForm);
  const [modal, setModal] = useState({
    modalBenefitInCancel: false,
    modalBenefitValue: false,
  });

  const statusBenefitInCancel: boolean = [
    "scheduledCancellation",
    "cancellationReview",
  ].includes(item?.status);

  const valuePaymentCompany = useMemo(() => {
    return form.percentualOuValor === "P"
      ? item?.value * ((form?.percentage || 0) / 100)
      : form.valorDescontoPadrao;
  }, [form.percentage]);

  const valuePaymentCollaborator = item?.value - valuePaymentCompany;

  const handleValueChange = (newValue: number) => {
    const percentual = parseFloat(((newValue / item?.value) * 100).toFixed(2));

    setForm((prev) => ({
      ...prev,
      valorDescontoPadrao: newValue,
      percentage: percentual,
    }));
  };

  useEffect(() => {
    if (editable) {
      setForm({
        ...form,
        valorDescontoPadrao: 0,
        percentualDescontoPadrao: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form?.percentualOuValor]);

  return (
    <>
      <TR height="max-content" minHeight="50px">
        <TD minW="129px">
          <TooltipSubstring
            name={PRODUCT_CLASS[item?.productClass]}
            length={18}
          />
        </TD>
        <TD display="flex" alignItems="center" justifyContent="center">
          <ProviderImage
            providerName={item?.providerName}
            imgToken={item?.providerLogo}
          />
        </TD>
        <TD
          textAlign="center"
          className="benefitTD"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => setShowDetailsModal(true)}
        >
          <TooltipSubstring
            name={capitalize(item?.productCommercialName)}
            length={12}
          />
        </TD>
        <TD textAlign="center">{numberFormat(item?.value)}</TD>
        <TD textAlign="center">
          <RadioGroupPercentualOrValue
            editEnable={editable}
            form={form}
            setForm={setForm}
          />
        </TD>
        <TD textAlign="center">
          <SliderPercentual
            editEnable={editable && form.percentualOuValor === "P"}
            form={form}
            setForm={setForm}
            value={form?.percentage}
          />
        </TD>
        <TD textAlign="center">
          {item?.parametrizer ? (
            editable && form.percentualOuValor === "V" ? (
              <NumericInput
                value={form.valorDescontoPadrao}
                onChange={handleValueChange}
                valueLimit={item?.value}
              />
            ) : (
              <Input
                type="text"
                isReadOnly={true}
                value={numberFormat(valuePaymentCompany)}
                border="none"
                fontSize={pixelToRem(15)}
                textAlign="center"
                color="text.fourth"
              />
            )
          ) : (
            "-"
          )}
        </TD>
        <TD textAlign="center">
          {item?.parametrizer ? numberFormat(valuePaymentCompany) : "-"}
        </TD>
        <TD textAlign="center">
          {item?.parametrizer ? numberFormat(valuePaymentCollaborator) : "-"}
        </TD>
        <TD flex="0 0 85px">
          <Box
            display="flex"
            justifyContent="center"
            gap="15px"
            w="85px"
            alignItems="center"
          >
            {editable ? (
              <>
                <ButtonIcon tooltip="Salvar Edição">
                  <RiCheckFill
                    size={20}
                    onClick={() => {
                      setEditable(false);
                      setModal({
                        ...modal,
                        modalBenefitValue: true,
                      });
                    }}
                  />
                </ButtonIcon>

                <ButtonIcon tooltip="Cancelar Edição">
                  <RiCloseFill
                    size={20}
                    onClick={() => {
                      setForm(defaultValuesForm);
                      setEditable(false);
                    }}
                  />
                </ButtonIcon>
              </>
            ) : (
              <>
                {statusBenefitInCancel ? (
                  <ButtonIcon tooltip="Produto em Cancelamento">
                    <MdOutlineAutoDelete
                      size={20}
                      onClick={() => {
                        setModal({
                          ...modal,
                          modalBenefitInCancel: true,
                        });
                      }}
                    />
                  </ButtonIcon>
                ) : (
                  <ButtonCancel
                    holder={holder}
                    product={item}
                    adherenceProposalId={item?.adherenceProposalId}
                  />
                )}

                {holder?.beneficiaryStatus !== "I" && (
                  <ButtonAdhesion tooltipText="Aderir produto" product={item} />
                )}
                {isLoading ? (
                  <Spinner
                    w="15px"
                    h="15px"
                    thickness="2px"
                    speed="0.65s"
                    color="brand.500"
                    size="md"
                  />
                ) : (
                  <ButtonIcon tooltip="Parametrizar">
                    <MdModeEdit
                      onClick={() => {
                        setEditable(true);
                      }}
                      size={20}
                    />
                  </ButtonIcon>
                )}
              </>
            )}
          </Box>
        </TD>
      </TR>

      {modal.modalBenefitInCancel && (
        <SimpleModal
          title="Produto em Cancelamento"
          isOpen={modal.modalBenefitInCancel}
          handleModal={() =>
            setModal({
              ...modal,
              modalBenefitInCancel: false,
            })
          }
          size="xl"
        >
          <ModalBenefitInCancel cancelRequest={item?.cancelRequest} />
        </SimpleModal>
      )}

      {modal.modalBenefitValue && (
        <AlertModal
          showModal={modal.modalBenefitValue}
          title="Editar parâmetro"
          setShowModal={() => {
            setModal({
              ...modal,
              modalBenefitValue: false,
            });
            setForm(defaultValuesForm);
          }}
          isLoading={isLoading}
          request={() => {
            mutate({
              beneficiaryContractId: item?.id,
              beneficiaryId: item?.beneficiaryId,
              positionId: data?.positionId,
              sectorId: data?.sectorId,
              relationship: data?.beneficiaryKinship,
              relationshipType: data?.beneficiaryType,
              companyId: item?.companyId,
              productId: item?.productId,
              companyContractId: item?.companyContractId,
              percentageValue: form?.percentualOuValor,
              value:
                form?.percentualOuValor === "P"
                  ? form?.percentage
                  : form?.valorDescontoPadrao,
            });

            setModal({
              ...modal,
              modalBenefitValue: false,
            });
          }}
          question={""}
          size="4xl"
        >
          <ModalBenefitTable
            isSingle={true}
            title={`${item?.providerName} - ${capitalize(
              item?.productCommercialName,
            )}`}
            relationshipType={data?.beneficiaryType}
            sectorName={data?.sector?.name || "Todos"}
            positionName={data?.position?.name || "Todos"}
            beneficiaryName={capitalize(data?.person?.name) || "Todos"}
            percentageValue={form?.percentualOuValor}
            valuePaymentCompany={valuePaymentCompany}
            valuePaymentCollaborator={valuePaymentCollaborator}
            value={
              form?.percentualOuValor === "P"
                ? form?.percentage
                : form?.valorDescontoPadrao
            }
            productValue={item?.value}
          />
        </AlertModal>
      )}

      {showDetailsModal && (
        <BenefitDetailsModal
          product={item}
          showModal={showDetailsModal}
          setShowModal={setShowDetailsModal}
        />
      )}
    </>
  );
};

export default TRBenefitsManagementActive;
