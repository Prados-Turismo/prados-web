/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

// Components
import Dashboard from "../../Layouts/Dashboard";
import PageWithMenu from "../../Layouts/PageWithMenu";
import BenefitsSidebar from "../../components/BenefitsSidebar";
import Menu from "../../components/Menu";

// Interfaces
import { Box, useTheme } from "@chakra-ui/react";
import { useGlobal } from "../../contexts/UserContext";
import useBenefits from "../../hooks/useBenefits";
import { IStatus } from "../../models/sidebar.model";
import BenefitSettingsSection from "../../pages/BenefitSettings/components/BenefitSettingsSection/Section";
import BenefitsAll from "../../pages/Benefits/pages/BenefitsAll";
import InterBrasilBox from "../../components/InterBrasilBox";
import XPBox from "../../components/XPBox";
import { SectionTop } from "../../pages/Benefits/pages/styled";
import Pagination from "../Pagination";

interface IBenefitContentPage {
  title: string;
}

const BenefitContentPage = ({ title }: IBenefitContentPage) => {
  const [orderBy, setOrderBy] = useState<string>("providerName");
  const [order, setOrder] = useState<string>("asc");
  const [status, setStatus] = useState<IStatus>({
    title: "Produtos",
    menu: "all",
  });
  const [statusParametrizer, setStatusParametrizer] =
    useState<string>("parameterizer");

  const [currentTab, setCurrentTab] = useState<
    | {
      name: string;
      status: number;
      isDisabled: boolean;
    }
    | undefined
  >({
    name: "Produtos disponíveis",
    status: 1,
    isDisabled: false,
  });
  const [search, setSearch] = useState<any>(null);
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;
  const { getBenefits } = useBenefits();
  const { user } = useGlobal();

  const {
    data: dataBenetits,
    isLoading,
    productClasses,
    count,
    counts,
    isFetching,
  } = getBenefits({
    size: registerPerPage,
    page: currentPage,
    orderBy,
    order,
    productClass: status.menu !== "all" ? status?.menu?.toString() : null,
    companyProviderIdSearch: search?.fornecedor || null,
    coparticipationSearch: search?.copart,
    codIbgeUFSearch:
      (search?.uf && search?.uf.map((el: string) => parseInt(el))) || null,
    codIbgeMunicipioSearch:
      (search?.city &&
        search?.city?.map((el: { value: string }) => parseInt(el?.value))) ||
      null,
    outpatientSegmentationSearch: search?.segment || null,
    startValueSearch: search?.min || null,
    finalyValueSearch: search?.max || null,
    productNameSearch: search?.fornecedorOrProductText || null,
    userId: user?.id,
    onlyFavorites:
      currentTab?.status === 3 || statusParametrizer === "Favoritos"
        ? true
        : null,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, currentTab, statusParametrizer, orderBy, order, status]);

  useEffect(() => {
    document.title = `${theme.content.project} - ${title}`;
  }, [theme, title]);

  const isTabComparator = currentTab?.status === 2;

  return (
    <Dashboard menu={<Menu />}>
      <SectionTop>
        {["all", "health", "odontology"].includes(status.menu?.toString()) &&
          (theme.content.project === "XP" ? <XPBox /> : <InterBrasilBox />)}
      </SectionTop>
      <PageWithMenu
        aside={
          <BenefitsSidebar
            productClasses={productClasses}
            status={status}
            onStatus={setStatus}
            pageTitle={title}
          />
        }
        section={
          <>
            {title === "Produtos" ? (
              <BenefitsAll
                data={dataBenetits}
                isLoading={isLoading}
                isFetching={isFetching}
                setSearch={setSearch}
                search={search}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                order={order}
                setOrder={setOrder}
                counts={{ ...counts, count }}
                menu={status.menu?.toString()}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                userId={user?.id}
              />
            ) : (
              <BenefitSettingsSection
                data={dataBenetits}
                isLoading={isLoading}
                isFetching={isFetching}
                menu={status.menu?.toString()}
                setSearch={setSearch}
                search={search}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                order={order}
                setOrder={setOrder}
                counts={counts}
                userId={user?.id}
                status={statusParametrizer}
                setStatus={setStatusParametrizer}
              />
            )}
            {!isLoading && !isTabComparator && (
              <Box
                padding="15px 0"
                margin={title == "Produtos" ? "0" : "0 15px"}
                borderLeft="1px solid #E5E5E5"
                borderRight="1px solid #E5E5E5"
              >
                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </Box>
            )}
          </>
        }
      />
    </Dashboard>
  );
};

export default BenefitContentPage;
