import ButtonTabbed, {
  ButtonTabbedWrap,
} from "../../../components/ButtonTabbed";

const SideBar = ({ status, onStatus }: any) => {
  const menuFirst = [
    {
      status: "C",
      name: "Cotação",
    },
    {
      status: "H",
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

export default SideBar;
