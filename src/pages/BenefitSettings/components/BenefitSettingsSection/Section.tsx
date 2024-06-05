// Pages
import Enable from "../../pages/Enable";
import Parameterizer from "../../pages/Parameterizer";

// Interfaces
import PageWithTabbed from "../../../../Layouts/PageWithTabbed";
import ProductSearchFilter from "../../../../components/ProductSearchFilter/ProductSearchFilter";
import { useGlobal } from "../../../../contexts/UserContext";
import TabBar from "./TabBar";
import { ISection } from "./types";

const BenefitSettingsSection = ({
  data,
  isLoading,
  isFetching,
  search,
  setSearch,
  setOrderBy,
  orderBy,
  setOrder,
  order,
  menu,
  counts,
  userId,
  status,
  setStatus,
}: ISection) => {
  const { isBroker, isCompany, isPartner } = useGlobal();

  const provideFavoriteOption = isBroker || isPartner || isCompany;

  return (
    <>
      <PageWithTabbed
        title=""
        aside={
          <TabBar
            status={status}
            onStatus={setStatus}
            provideFavoriteOption={provideFavoriteOption}
            isFetching={isFetching}
          />
        }
        article={
          <>
            {status !== "Favoritos" && (
              <ProductSearchFilter
                isLoading={isLoading}
                setSearch={setSearch}
                search={search}
                counts={counts}
                menu={menu}
                setOrderBy={setOrderBy}
              />
            )}
            {["parameterizer", "Favoritos"].includes(status) ? (
              <Parameterizer
                counts={counts}
                menu={menu}
                data={data}
                isLoading={isLoading}
                isFetching={isFetching}
                isFavorite={provideFavoriteOption}
                userId={userId}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                order={order}
                setOrder={setOrder}
                status={status}
              />
            ) : (
              <Enable
                counts={counts}
                menu={menu}
                data={data}
                isLoading={isLoading}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                order={order}
                setOrder={setOrder}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default BenefitSettingsSection;
