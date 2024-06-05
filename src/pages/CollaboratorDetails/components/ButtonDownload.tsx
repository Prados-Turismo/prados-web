import { Button } from "@chakra-ui/react";
import { RiDownloadLine } from "react-icons/ri";

import useCollaborator from "../../../hooks/useCollaborator";
import { ReactNode } from "react";

interface IButtonDownload {
  children: ReactNode;
  id: number | string;
}

const ButtonDownload = ({ children, id }: IButtonDownload) => {
  const { getCollaboratorDoc } = useCollaborator();
  const { isLoading, callDoc } = getCollaboratorDoc();

  return (
    <Button
      minW="140px"
      isLoading={isLoading}
      rightIcon={<RiDownloadLine />}
      variant="outline"
      borderRadius={4}
      onClick={() => {
        callDoc(id);
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonDownload;
