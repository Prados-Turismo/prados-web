import { Button } from "@chakra-ui/react";
import { MdOutlineDownload } from "react-icons/md";
import { RiFolderForbidLine, RiFolderChart2Line } from "react-icons/ri";
import useFinancial from "../../../hooks/useFinancial";
import { useState } from "react";
import { IInvoice } from "../../../models/financial.model";
import Tooltip from "../../../components/Tooltip/Tooltip";
const { getInvoiceReportDetail } = useFinancial();

const InvoiceReportDetailButton = ({ item }: { item: IInvoice }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Tooltip
      label={
        item?.processReport
          ? "Detalhamento em processamento"
          : !item?.report && !item?.processReport
          ? "Detalhamento não gerado"
          : "Fazer download"
      }
    >
      <Button
        isLoading={isLoading}
        isDisabled={
          (!item?.report && !item?.processReport) || item?.processReport
        }
        variant="unstyled"
        onClick={() => getInvoiceReportDetail(item?.id, setIsLoading)}
        display="flex"
        justifyContent="center"
      >
        {item?.processReport ? (
          <RiFolderChart2Line size={23} />
        ) : !item?.report && !item?.processReport ? (
          <RiFolderForbidLine size={23} />
        ) : (
          <MdOutlineDownload size={23} />
        )}
      </Button>
    </Tooltip>
  );
};

export default InvoiceReportDetailButton;
