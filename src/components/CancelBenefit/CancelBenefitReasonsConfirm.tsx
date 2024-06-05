/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import { useQueryClient } from "react-query";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import { useGlobal } from "../../contexts/UserContext";
import useCollaborator from "../../hooks/useCollaborator";
import usePartner from "../../hooks/usePartner";
import useUpload from "../../hooks/useUpload";
import { IBneficiaryContractsData } from "../../models/collaborator.model";
import { keys } from "../../services/query";
import { CANCEL_REASON_FROM_TO } from "../../utils/enumFormat";
import Loading from "../Loading";
import SuccessConfirmImage from "../SuccessConfirmImage/SuccessConfirmImage";

interface ICancelBenefitReasonsConfirm {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  companyContractId: string;
  checkedAgrupados: IBneficiaryContractsData[];
  onClose: () => void;
}

const CancelBenefitReasonsConfirm = ({
  step,
  setStep,
  companyContractId,
  checkedAgrupados,
  onClose,
}: ICancelBenefitReasonsConfirm) => {
  const { company } = useGlobal();
  const { getPartnerDetails } = usePartner();
  const { data: companyData } = getPartnerDetails({
    companyId: company!.externalCompanyId,
  });

  const animatedComponents = makeAnimated();
  const queryClient = useQueryClient();
  const { downloadAndOpenFile } = useUpload();
  const { callDoc, isLoading: isLoadingDownload } = downloadAndOpenFile();
  const { getCompanyContract, cancelActiveProduct } = useCollaborator();
  const { data, isLoading } = getCompanyContract({
    companyContractId: companyContractId,
  });
  const {
    mutate: mutateCancel,
    isLoading: isLoadingCancel,
    protocolNumber,
  } = cancelActiveProduct({ setStep: setStep });
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [reasonSelected, setReasonSelected] = useState<string | null>(null);

  const handleCancel = () => {
    if (reasonSelected && company && companyData && checkedAgrupados) {
      mutateCancel({
        cancelReason: reasonSelected,
        cancelrequestBy: "E",
        companyId: company?.externalCompanyId,
        corporateName: company?.name,
        hubId: companyData?.companyAssociated.hub.id,
        hubName: companyData?.companyAssociated.hub.name,
        cancellationDocumentToken: uploadFile,
        beneficiaryContracts: checkedAgrupados?.map((el) => el?.id),
      });
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: any[], fileRejections: string | any[]) => {
      if (fileRejections.length > 0) {
        Swal.fire({
          icon: "warning",
          title: `${
            fileRejections[0].errors[0].code === "file-invalid-type"
              ? `Arquivo inválido!
              Tipos de arquivos permitidos: (PDF, JPG, JPEG ou PNG)`
              : fileRejections[0].errors[0].code === "too-many-files"
              ? "Só é permitido o upload de apenas 1 arquivo!"
              : fileRejections[0].errors[0].message
          }`,
          showConfirmButton: true,
          confirmButtonText: `Ok`,
        });
      } else {
        setUploadFile(acceptedFiles[0]);
      }
    },
    [setUploadFile],
  );

  const { getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "application/pdf": [],
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
  });

  const handleChangeSelectedReason = (selectedOption: any) => {
    setReasonSelected(selectedOption?.value);
  };

  return isLoading ? (
    <Box margin="23px 189px">
      <Loading />
    </Box>
  ) : (
    <>
      {step === 1 && (
        <Box maxWidth="700px">
          <Text color="#0075BF" fontSize="18px" marginBottom="10px">
            Para dar continuidade selecione o motivo do cancelamento
            {data?.product?.documentForCancellation &&
              " e faça o upload da Ficha de Cancelamento assinado pelo titular"}
          </Text>

          {data?.product?.documentForCancellation && (
            <Button
              variant="outline"
              isLoading={isLoadingDownload}
              onClick={() =>
                callDoc(data?.product?.documentForCancellation || "")
              }
              // onClick={() => callDoc("42f60335-c610-4d87-9f5a-4940368e98c8")}
            >
              <MdFileDownload color="#0075BF" size="27px" />
              Modelo da Ficha de Cancelamento
            </Button>
          )}

          <hr style={{ margin: "24px 0 0" }} />

          <Box margin="24px auto" width="100%" maxWidth="350px">
            <FormControl width="100%">
              <FormLabel htmlFor="selectedEntidade">
                Motivo do cancelamento
              </FormLabel>
              <ReactSelect
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecione um motivo"
                noOptionsMessage={() => "Nenhum Motivo para selecionar"}
                onChange={handleChangeSelectedReason}
                options={Object.keys(CANCEL_REASON_FROM_TO).map((key) => ({
                  value: key,
                  label: CANCEL_REASON_FROM_TO[key],
                }))}
                components={animatedComponents}
              />
            </FormControl>

            {data?.product?.documentForCancellation && (
              <Box marginTop="30px">
                <input {...getInputProps()} />
                <Button
                  onClick={open}
                  width="100%"
                  cursor="pointer"
                  padding="5px"
                >
                  <MdFileUpload size="27px" />
                  Upload da Ficha do Cancelamento
                </Button>
              </Box>
            )}
          </Box>
          <Box display="flex" justifyContent="flex-end" marginTop="60px">
            <Button
              mr={4}
              onClick={() => {
                setStep(0);
                setReasonSelected(null);
                setUploadFile(null);
              }}
              size="md"
              variant="outline"
            >
              Voltar
            </Button>
            <Button
              isLoading={isLoadingCancel}
              isDisabled={
                !reasonSelected ||
                (data?.product?.documentForCancellation ? !uploadFile : false)
              }
              onClick={handleCancel}
            >
              Confirmar Cancelamento
            </Button>
          </Box>
        </Box>
      )}

      {step === 2 && (
        <Box>
          <SuccessConfirmImage />

          <Text textAlign="center" fontSize="20px">
            Sua solicitação foi registrada com sucesso, dentro de 1 dia útil
            <br /> daremos retorno a sua solicitação.
          </Text>

          {data?.product?.documentForCancellation && uploadFile && (
            <Text
              marginTop="20px"
              textAlign="center"
              fontSize="18px"
              fontWeight="bold"
            >
              Importante!
              <br />A ficha de cancelamento anexada será analisada pela
              <br />
              nossa equipe antes da confirmação do cancelamento,
              <br />
              em caso de irregularidade a solicitação será suspensa
              <br />e o benefício voltará ao status de ativo.
            </Text>
          )}

          <Text
            margin="15px 0"
            textAlign="center"
            fontSize="20px"
            fontWeight="bold"
            color="#0075BF"
          >
            Protocolo da solicitação: {protocolNumber || "-"}
          </Text>

          <Box width="100%" display="flex" justifyContent="center">
            <Button
              width="100px"
              size="md"
              onClick={() => {
                queryClient.invalidateQueries([
                  keys.collaborator,
                  "family",
                  "benefits",
                ]);
                queryClient.refetchQueries([
                  keys.collaborator,
                  "family",
                  "benefits",
                ]);
                onClose();
              }}
            >
              Ok
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CancelBenefitReasonsConfirm;
