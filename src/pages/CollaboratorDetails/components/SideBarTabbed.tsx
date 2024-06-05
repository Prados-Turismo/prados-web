import ButtonTabbed, {
  ButtonTabbedWrap,
} from "../../../components/ButtonTabbed";

interface ISideBarTabbed {
  status: number;
  onStatus: (status: number) => void;
}

const SideBarTabbed = ({ status, onStatus }: ISideBarTabbed) => {
  const menuFirst = [
    {
      status: 1,
      name: "Disponíveis",
    },
    {
      status: 2,
      name: "Em Processo",
    },
    {
      status: 3,
      name: "Ativos",
    },
    {
      status: 4,
      name: "Histórico",
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

export default SideBarTabbed
