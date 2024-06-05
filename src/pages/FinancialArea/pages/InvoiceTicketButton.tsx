import { Button } from "@chakra-ui/react";
import { MdOutlineDownload } from "react-icons/md";
import useFinancial from "../../../hooks/useFinancial";
import { useState } from "react";
const { getInvoiceTicket } = useFinancial();

const InvoiceTicketButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      isLoading={isLoading}
      variant="unstyled"
      onClick={() => getInvoiceTicket(id, setIsLoading)}
      display="flex"
      justifyContent="center"
    >
      <MdOutlineDownload size={23} />
    </Button>
  );
};

export default InvoiceTicketButton;
