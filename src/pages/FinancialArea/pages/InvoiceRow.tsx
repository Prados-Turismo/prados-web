import { useEffect } from "react";
import { showModal } from "../../../components/ModalWrapper/actions";
import { TD, TR } from "../../../components/Table";
import { IInvoice } from "../../../models/financial.model";
import { dateFormat, numberFormat } from "../../../utils";
import { STATUS_BATCH_INVOICE } from "../../../utils/enumFormat";
import { ListNotes } from "../components/ListNotes";
import InvoiceReportDetailButton from "./InvoiceReportDetailButton";
import InvoiceSlipButton from "./InvoiceSlipButton";
import InvoiceTicketButton from "./InvoiceTicketButton";
import { MdOutlineDownload } from "react-icons/md";
import { useLocation } from "react-router-dom";

const InvoiceRow = ({ item }: { item: IInvoice }) => {
  const location = useLocation();

  useEffect(() => {
    const isNote = location?.search?.includes("nota-fiscal");
    const invoiceId = location?.search?.split("nota-fiscal=")[1];

    if (isNote && invoiceId === item?.id) {
      showModal(<ListNotes invoice={item} />);
    }
  }, [location, item]);

  return (
    <TR key={item.id}>
      <TD>{`${item.monthCompetence.toString().padStart(2, "0")}/${
        item.yearCompetence
      }`}</TD>
      <TD>{item.expiration ? dateFormat(new Date(item.expiration)) : "-"}</TD>
      <TD>{numberFormat(item.totalValue)}</TD>
      <TD>{STATUS_BATCH_INVOICE[item.status]}</TD>
      <TD>
        <InvoiceReportDetailButton item={item} />
      </TD>
      <TD>
        <InvoiceTicketButton id={item?.id} />
      </TD>
      <TD>
        <InvoiceSlipButton id={item?.id} />
      </TD>
      <TD>
        {(item?.receiptTokens || [])?.length > 0 && (
          <MdOutlineDownload
            size={23}
            onClick={() => showModal(<ListNotes invoice={item} />)}
            cursor="pointer"
          />
        )}
      </TD>
    </TR>
  );
};

export default InvoiceRow;
