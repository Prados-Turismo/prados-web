import { Button } from "@chakra-ui/react";
import { ReactElement, cloneElement } from "react";
import { BsDownload } from "react-icons/bs";
import { Warning } from "../../errors";
import useUpload from "../../hooks/useUpload";
import { customTheme } from "../../theme";

interface IProps {
  id?: string;
  hasIcon?: boolean;
  customIcon?: ReactElement;
}

const DownloadFile = ({ id, hasIcon, customIcon }: IProps) => {
  const { downloadFile } = useUpload();

  const { data } = downloadFile(id as string);

  const onSubmit = async () => {
    try {
      const response = await fetch(data?.url as string);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const nameFile = data?.key.split("\\")?.[2];
      const positionItem = nameFile?.indexOf(".");
      const formatNameFile = nameFile?.slice(0, positionItem);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", formatNameFile || "arquivo");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      throw new Warning(
        "Erro ao fazer download do arquivo!",
        error?.response?.status,
      );
    }
  };

  const customIconElement = customIcon
    ? cloneElement(customIcon, {
        onClick: onSubmit,
      })
    : null;

  return (
    <>
      {hasIcon ? (
        customIconElement || (
          <BsDownload
            cursor="pointer"
            color={customTheme.colors.brandSecond[500]}
            size={20}
            onClick={onSubmit}
          />
        )
      ) : (
        <Button variant="link" rightIcon={<BsDownload />} onClick={onSubmit}>
          Download
        </Button>
      )}
    </>
  );
};

export default DownloadFile;
