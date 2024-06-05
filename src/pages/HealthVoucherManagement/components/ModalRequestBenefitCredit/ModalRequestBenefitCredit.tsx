/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RiDownloadLine } from "react-icons/ri";

import ReactSelect from "react-select";
import SimpleModal from "../../../../components/SimpleModal";

import InputFile from "../InputFile/InputFile";
import {
  Button,
  Checkbox,
  CheckboxWrapper,
  Container,
  FormSection,
  CurrencyInput,
  CurrencyInputWrapper,
} from "./styled";

import { Spinner } from "@chakra-ui/react";
import { useHealthVoucher } from "../../../../hooks/useHealthVoucher";
import { useModalBenefitCredit } from "../../../../hooks/useModalBenefitCredit";
import { CustomAddCreditLoader } from "../CustomAddCreditLoader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  hanldeModal: () => void;
  onSuccess: () => void;
}
export interface ModalHandles {
  open: () => void;
  close: () => void;
  isOpened: boolean;
}

const schema = z.object({
  companies: z.array(
    z.object({
      companyId: z.string({
        errorMap: () => ({ message: "Campo obrigatório" }),
      }),
      value: z.string({ errorMap: () => ({ message: "Campo obrigatório" }) }),
    }),
  ),
});

const ModalRequestBenefitCreditComp: React.ForwardRefRenderFunction<
  ModalHandles,
  Props
> = ({ hanldeModal, onSuccess }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{
    companies: Array<{ companyId: number | null; value: string | null }>;
  }>({ resolver: zodResolver(schema), shouldUseNativeValidation: false });
  const { fields, append, remove } = useFieldArray({
    name: "companies",
    control,
    rules: { minLength: 1 },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [creditForCompanySelected, setCreditForCompanySelected] =
    useState<boolean>(false);
  const [importSheet, setImportSheet] = useState(false);
  const [filesList, setFilesList] = useState<File[]>([]);
  const [companyIds, setCompanyIds] = useState<number[]>([]);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    isOpened: modalOpen,
  }));

  const {
    handleAddCreditForLinkedCompanies,
    handleAddCreditForLinkedCompaniesByFile,
    handleAddCreditIntoBalance,
    handleCreditInputBlur,
    handleFileInsert,
    inputsData,
    linkedCompanies,
    setInputsData,
    handleCalculateFare,
    initialInputsData,
    isSending,
    removeCurrencyMask,
  } = useModalBenefitCredit();

  const filteredCompanies = useMemo(
    () =>
      linkedCompanies?.filter(
        (company) => !companyIds.includes(Number(company.accountId)),
      ),

    [companyIds, linkedCompanies],
  );

  const { handleDownloadTemplateBalanceImport } = useHealthVoucher();

  const onSubmit = () => {
    if (creditForCompanySelected) {
      const values = getValues();
      const payload = {
        companies: values?.companies.map((el) => ({
          value: removeCurrencyMask(el?.value),
          companyId: el?.companyId,
        })),
      };
      if (importSheet) {
        handleAddCreditForLinkedCompaniesByFile(filesList, onSuccess);
      } else {
        handleAddCreditForLinkedCompanies(payload as any, onSuccess);
      }
    } else {
      if (inputsData.amount) handleAddCreditIntoBalance(onSuccess);
    }
  };
  const validateOnlyNumbersAndComma = (value: string) => {
    const regex = /^\d+(,\d{0,2})?$/;

    return regex.test(value);
  };
  const handleIncreaseTypeChange = useCallback(
    (creditForComapanies: boolean) => {
      if (creditForComapanies) {
        if (!creditForCompanySelected) {
          setCreditForCompanySelected(true);
          setInputsData(initialInputsData);
          append({ value: null, companyId: null });
        }
      } else {
        if (creditForCompanySelected) {
          reset();
          setCreditForCompanySelected(false);
          setInputsData(initialInputsData);
        }
      }
    },
    [creditForCompanySelected, setInputsData, initialInputsData, append, reset],
  );

  const handleChangeValues = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setValue(`companies.${index}.value`, event.target.value);

      handleCalculateFare(getValues);
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    setInputsData({ amount: 0, tax: 0, total: 0 });
    if (!modalOpen) {
      reset();
      setImportSheet(false);
      setCreditForCompanySelected(false);
      setInputsData(initialInputsData);
    }
    if (!creditForCompanySelected) {
      reset();
    }
  }, [
    creditForCompanySelected,
    importSheet,
    initialInputsData,
    modalOpen,
    reset,
    setInputsData,
  ]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.companies) {
        setCompanyIds(
          value.companies
            .filter((company) => !!company?.companyId)
            .map((company) => Number(company?.companyId)),
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <SimpleModal
      handleModal={hanldeModal}
      isOpen={modalOpen}
      title="Solicitação de inclusão de saldo de promoção à saúde"
      size="3xl"
    >
      <Container
        onSubmit={(event) => {
          event.preventDefault();
          if (creditForCompanySelected && !importSheet) {
            handleSubmit(onSubmit)(event);
          } else {
            onSubmit();
          }
        }}
      >
        {isSending ? (
          <CustomAddCreditLoader />
        ) : (
          <>
            <FormSection>
              <h3>
                (<span style={{ color: "red" }}>*</span>) Indica os campos
                obrigatórios
              </h3>
              <h3>
                Tipo de solicitação <span style={{ color: "red" }}>*</span>
              </h3>
              <div className="inputWrapper">
                <CheckboxWrapper>
                  <Checkbox
                    id="checkbox-modal"
                    isChecked={!creditForCompanySelected}
                    onChange={() => {
                      handleIncreaseTypeChange(false);
                    }}
                  />
                  <label htmlFor="checkbox-modal">Saldo para o emissor</label>
                </CheckboxWrapper>
                <CheckboxWrapper>
                  <Checkbox
                    id="checkbox-modal-1"
                    isChecked={creditForCompanySelected}
                    onChange={() => {
                      handleIncreaseTypeChange(true);
                    }}
                  />
                  <label htmlFor="checkbox-modal-1">
                    Saldo para empresas RH
                  </label>
                </CheckboxWrapper>
              </div>
            </FormSection>
            <FormSection>
              <h3>
                Forma de pagamento <span style={{ color: "red" }}>*</span>
              </h3>
              <div className="inputWrapper">
                <CheckboxWrapper>
                  <Checkbox id="checkbox-modal-2" isChecked />
                  <label htmlFor="checkbox-modal-2">Boleto</label>
                </CheckboxWrapper>
              </div>
              <span className="observationSpan">
                O valor será transferido na(s) conta(s) após o pagamento da
                fatura em um prazo de 24 horas.
              </span>
            </FormSection>
            <FormSection>
              {creditForCompanySelected && (
                <div className="includeCompanyWrapper">
                  <div className="includeCompanyHeader">
                    <h3>
                      Empresas <span style={{ color: "red" }}>*</span>
                    </h3>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        reset();
                        setImportSheet((old) => !old);
                      }}
                    >
                      {!importSheet
                        ? `+ Incluir Planilha`
                        : `+ Selecionar empresas`}
                    </button>
                  </div>
                  <div className="aditionalFieldsWrapper">
                    {importSheet && (
                      <div className="fileField">
                        <h3>Planilha</h3>
                        <InputFile
                          handleFileInsert={handleFileInsert}
                          getFile={setFilesList}
                          onClean={() => setInputsData(initialInputsData)}
                        />
                      </div>
                    )}
                    {!importSheet &&
                      fields.map((field, index) => {
                        return (
                          <div key={field.id}>
                            <div className="fieldWrapper">
                              <div
                                style={{
                                  flex: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "0.75rem",
                                }}
                              >
                                <label htmlFor="select-company">Empresa</label>
                                <Controller
                                  control={control}
                                  defaultValue={null}
                                  name={`companies.${index}.companyId`}
                                  render={({
                                    field: { onChange: formChange },
                                  }) => (
                                    <div>
                                      <ReactSelect
                                        id="select-company"
                                        placeholder="Selecionar"
                                        closeMenuOnSelect
                                        onChange={(val) => {
                                          formChange(val?.value);
                                        }}
                                        options={(
                                          filteredCompanies?.filter(
                                            (obj) => "name" in obj,
                                          ) || []
                                        ).map((company) => ({
                                          label: company?.name,
                                          value: company?.accountId,
                                        }))}
                                        styles={{
                                          indicatorSeparator: () => ({
                                            display: "none",
                                            flex: 1,
                                          }),
                                        }}
                                        className="select-fields"
                                        classNamePrefix="select"
                                        noOptionsMessage={() =>
                                          "Não há empresas"
                                        }
                                      />
                                      {errors.companies &&
                                        errors.companies[index]?.companyId && (
                                          <span
                                            style={{
                                              color: "red",
                                              fontSize: 14,
                                            }}
                                          >
                                            {
                                              errors.companies[index]?.companyId
                                                ?.message
                                            }
                                          </span>
                                        )}
                                    </div>
                                  )}
                                />
                              </div>
                              <div>
                                <div
                                  style={{
                                    maxWidth: "9.0625rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",
                                  }}
                                >
                                  <label htmlFor="credit-input">Crédito</label>
                                  <CurrencyInputWrapper>
                                    <CurrencyInput
                                      id="credit-input"
                                      placeholder="0,00"
                                      maxHeight="2.625rem"
                                      {...register(`companies.${index}.value`)}
                                      autoFocus={false}
                                      onChange={(e: any) => {
                                        handleChangeValues(e, index);
                                      }}
                                    />
                                  </CurrencyInputWrapper>
                                </div>

                                {errors.companies &&
                                  errors.companies[index]?.value && (
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: 14,
                                      }}
                                    >
                                      {errors.companies[index]?.value?.message}
                                    </span>
                                  )}
                              </div>
                            </div>
                            {fields.length > 1 && (
                              <button
                                type="button"
                                className="actionsDiv"
                                style={{ alignSelf: "flex-start" }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  event.preventDefault();
                                  remove(index);
                                }}
                              >
                                <span>- Remover empresa</span>
                              </button>
                            )}
                          </div>
                        );
                      })}

                    {!importSheet ? (
                      <div
                        className="actionsDiv"
                        onClick={() => {
                          append({ value: null, companyId: null });
                        }}
                      >
                        <span>+ Adicionar nova empresa</span>
                      </div>
                    ) : (
                      <div
                        className="actionsDiv"
                        onClick={handleDownloadTemplateBalanceImport}
                      >
                        <RiDownloadLine />
                        <span>Baixar template</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="inputWrapper"></div>
              <h3>
                Valores <span style={{ color: "red" }}>*</span>
              </h3>
              <div className="inputWrapper">
                <div className="simpleInputContainer">
                  <label htmlFor="credit-input" className="inputLabel">
                    Crédito
                  </label>
                  <CurrencyInputWrapper>
                    <CurrencyInput
                      id="credit-input"
                      isDisabled={creditForCompanySelected}
                      placeholder="0,00"
                      value={inputsData?.amount || 0}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (validateOnlyNumbersAndComma(event.target.value)) {
                          setInputsData((state) => ({
                            ...state,
                            amount: event.target.value,
                          }));
                        } else if (!event.target.value) {
                          setInputsData((state) => ({
                            ...state,
                            amount: event.target.value,
                          }));
                        }
                      }}
                      onBlur={() => {
                        if (!creditForCompanySelected) handleCreditInputBlur();
                      }}
                    />
                  </CurrencyInputWrapper>
                </div>
                <div className="simpleInputContainer">
                  <label htmlFor="fee-input" className="inputLabel">
                    Tarifa
                  </label>
                  <CurrencyInputWrapper>
                    <CurrencyInput
                      id="fee-input"
                      placeholder="0,00"
                      isDisabled
                      value={inputsData?.tax || 0}
                    />
                  </CurrencyInputWrapper>
                </div>
                <div className="simpleInputContainer">
                  <label htmlFor="total-input" className="inputLabel">
                    Valor total
                  </label>
                  <CurrencyInputWrapper>
                    <CurrencyInput
                      id="total-input"
                      placeholder="0,00"
                      isDisabled
                      value={inputsData?.total || 0}
                    />
                  </CurrencyInputWrapper>
                </div>
              </div>
              <Button
                alignSelf="flex-end"
                type="submit"
                isDisabled={isSending || !inputsData.total}
              >
                {isSending ? <Spinner size="sm" color="#FFF" /> : "Solicitar"}
              </Button>
            </FormSection>
          </>
        )}
      </Container>
    </SimpleModal>
  );
};

export const ModalRequestBenefitCredit = forwardRef(
  ModalRequestBenefitCreditComp,
);
