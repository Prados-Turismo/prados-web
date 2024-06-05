import ButtonTabbed, { ButtonTabbedWrap } from "../../components/ButtonTabbed";
import {
  ISidebarReport,
  ISidebarReportStatus,
} from "../../models/report.model";

interface IItem {
  status: ISidebarReportStatus;
  name: string;
}

const SideBar = ({ status, onStatus }: ISidebarReport) => {
  const menuFirst: IItem[] = [
    {
      status: "A" as ISidebarReportStatus,
      name: "Ativas",
    },
    {
      status: "E" as ISidebarReportStatus,
      name: "Em adesão",
    },
    {
      status: "P" as ISidebarReportStatus,
      name: "Pendentes",
    },
    {
      status: "C" as ISidebarReportStatus,
      name: "Canceladas",
    },
  ];

  return (
    <>
      <ButtonTabbedWrap>
        {menuFirst.map((item) => (
          <ButtonTabbed
            key={item.status}
            selected={status === item.status}
            onClick={() => {
              onStatus(item.status);
            }}
          >
            {item.name}
          </ButtonTabbed>
        ))}
      </ButtonTabbedWrap>
    </>
  );
};

export default SideBar;
