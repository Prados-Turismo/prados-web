/* eslint-disable no-loops/no-loops */
import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { useToastStandalone } from "../../../hooks/useToastStandalone";
import SimpleModal from "../../../components/SimpleModal";
import { ContentModal } from "../../../components/AlertModal/styled";

interface IAgeModal {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  filters: string[] | any;
  ageSelected: any;
  setAgeSelected: any;
  setReloadFunction: any;
}

const AgeModal: React.FC<IAgeModal> = ({
  isOpen,
  onClose,
  filters,
  ageSelected,
  setAgeSelected,
  setReloadFunction,
}) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [totalAge, setTotalAge] = useState(0);
  const [inputHabilitado, setInputHabilitado] = useState("");
  const [allAgeLock, setAllAgeLock] = useState(false);
  const AgeBox = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Object.keys(inputValues).length === 0) {
      setInputHabilitado("");
    }
  }, [inputValues]);

  useEffect(() => {
    if (Object.keys(ageSelected).length === 0) {
      setInputValues({});
    }
    setInputValues({ ...ageSelected });

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [ageSelected, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isInputHabilitado = (chave: string) => {
    return inputHabilitado === chave;
  };

  return (
    // eslint-disable-next-line react/no-children-prop
    <SimpleModal
      isOpen={isOpen}
      handleModal={onClose}
      title={`Quantidade de vidas por faixa etária`}
      size="3xl"
    >
      <ContentModal padding="10px">
        <>
          <Box ref={AgeBox}>
            <Text
              fontSize="15px"
              color="GrayText"
              textAlign="left"
              padding="0 0 0 15px"
            >
              * O somatório de vidas por faixas não pode ultrapassar 99
            </Text>
            <Box
              width="100%"
              flexWrap="wrap"
              display="flex"
              margin="10px 0 30px 0"
            >
              {filters?.faixa_etaria
                ?.filter((data: string) => data !== "00-43")
                ?.map((data: string, index: number) => (
                  <Box
                    key={index}
                    marginLeft="15px"
                    marginBottom="15px"
                    alignItems="center"
                  >
                    <Text>{data}</Text>
                    <Input
                      value={inputValues[data] || ""}
                      onChange={(e: any) => {
                        setAllAgeLock(false);
                        const newValue = e.target.value.replace(/\D/g, "");
                        const newInputValues = {
                          ...inputValues,
                          [data]: newValue,
                        };

                        let novaSoma = 0;
                        for (const chave in newInputValues) {
                          const valor = newInputValues[chave] || 0;
                          novaSoma += parseInt(valor, 10);
                        }

                        setInputValues(newInputValues);
                        setTotalAge(novaSoma);
                        if (Number(newValue) > 99 || novaSoma > 99) {
                          setAllAgeLock(true);
                          setInputHabilitado(data);
                          useToastStandalone({
                            title:
                              "O somatório de vidas presentes na faixa etária não pode ultrapassar 99!",
                            status: "warning",
                          });
                        } else if (inputHabilitado === data) {
                          setInputHabilitado("");
                        }
                      }}
                      maxLength={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      placeholder="0"
                      width="52px"
                      height="30px"
                      disabled={
                        inputHabilitado.length > 0 && !isInputHabilitado(data)
                      }
                    />
                  </Box>
                ))}
            </Box>

            {/* <Text
              color="GrayText"
              textAlign="left"
              padding="0 0 0 15px"
              marginTop="10px"
            >
              Faixa única:
            </Text>

            <Box width="100%" flexWrap="wrap" display="flex" marginTop="5px">
              {filters?.faixa_etaria
                ?.filter((data: string) => data === "00-43")
                ?.map((data: string, index: number) => (
                  <Box
                    key={index}
                    marginLeft="15px"
                    marginBottom="15px"
                    alignItems="center"
                  >
                    <Text>{data}</Text>
                    <Input
                      value={inputValues[data] || ""}
                      onChange={(e: any) => {
                        setAllAgeLock(false);
                        const newValue = e.target.value.replace(/\D/g, "");
                        const newInputValues = {
                          ...inputValues,
                          [data]: newValue,
                        };

                        let novaSoma = 0;
                        for (const chave in newInputValues) {
                          const valor = newInputValues[chave];
                          novaSoma += parseInt(valor, 10);
                        }

                        setInputValues(newInputValues);
                        setTotalAge(novaSoma);
                        if (Number(newValue) > 99 || novaSoma > 99) {
                          setAllAgeLock(true);
                          setInputHabilitado(data);
                          useToastStandalone({
                            title:
                              "O somatório de vidas presentes na faixa etária não pode ultrapassar 99!",
                            status: "warning",
                          });
                        } else if (inputHabilitado === data) {
                          setInputHabilitado("");
                        }
                      }}
                      maxLength={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      placeholder="0"
                      width="52px"
                      height="30px"
                      disabled={
                        inputHabilitado.length > 0 && !isInputHabilitado(data)
                      }
                    />
                  </Box>
                ))}
            </Box> */}

            <Box
              style={{
                width: "100%",
                marginBottom: "20px",
                alignSelf: "end",
                justifyContent: "end",
                alignItems: "end",
                display: "flex",
                paddingRight: "15px",
              }}
            >
              <Button
                style={{
                  color: "brand.500",
                }}
                isDisabled={allAgeLock}
                onClick={() => {
                  const filteredObject = Object.fromEntries(
                    Object.entries(inputValues).filter(
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      ([key, value]) =>
                        value !== "" && value.trim() !== "" && value !== "0",
                    ),
                  );
                  setAgeSelected(filteredObject);
                  setReloadFunction(true);
                  setTotalAge(0);
                  onClose(false);
                }}
              >
                Confirmar
              </Button>
            </Box>
          </Box>
        </>
      </ContentModal>
    </SimpleModal>
  );
};

export default AgeModal;
