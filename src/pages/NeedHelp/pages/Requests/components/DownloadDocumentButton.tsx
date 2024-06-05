// Components and Utils
import { Button } from "@chakra-ui/button";

// Hooks

// Icons
import { MdFileDownload } from "react-icons/md";

import { useCallback } from "react";
import { apiUpload } from "../../../../../services/api";

const DownloadDocumentButton = ({
  id,
  index,
}: {
  id: number;
  index?: number;
}) => {
  const handleDownload = useCallback(async () => {
    const { data } = await apiUpload.get<{ url: string; key: string }>(
      `document/${id}`,
    );

    if (data.url) window.open(data.url, "_blank");
  }, [id]);
  return (
    <Button onClick={() => handleDownload()}>
      Anexo {index !== null ? index : ""}
      <MdFileDownload size="24px" />
    </Button>
  );
};

export default DownloadDocumentButton;
