import ButtonTabbed, {
  ButtonTabbedWrap,
} from "../../../../components/ButtonTabbed";
import { ITabBar } from "./types";

const TabBar = ({
  status,
  onStatus,
  provideFavoriteOption,
  isFetching,
}: ITabBar) => {
  const menuFirst = [
    {
      tab: "parameterizer",
      name: "Parametrizar",
      isDisabled: false,
    },
    {
      tab: "enable",
      name: "Habilitar",
      isDisabled: false,
    },
    provideFavoriteOption
      ? {
          tab: "Favoritos",
          name: "Favoritos",
          isDisabled: isFetching,
        }
      : { tab: "Favoritos", name: "" },
  ];

  const menuFiltered = menuFirst.filter(({ name }) => name);

  return (
    <>
      <ButtonTabbedWrap>
        {menuFiltered?.map((item) => (
          <ButtonTabbed
            key={item.tab}
            selected={status === item.tab}
            onClick={() => {
              onStatus(item.tab);
            }}
            isDisabled={item.isDisabled}
          >
            {item.name}
          </ButtonTabbed>
        ))}
      </ButtonTabbedWrap>
    </>
  );
};

export default TabBar;
