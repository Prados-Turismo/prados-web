import { useState } from "react";

// Pages
import PartnerActivated from "../../pages/PartnerActive";
import PartnerActivePending from "../../pages/PartnerActivePending";

// Interfaces
import { Button, Flex } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import FieldSearch from "../../../../components/FieldSearch";
import Loading from "../../../../components/Loading";
import Pagination from "../../../../components/Pagination";
import SimpleModal from "../../../../components/SimpleModal";
import { useGlobal } from "../../../../contexts/UserContext";
import usePartner from "../../../../hooks/usePartner";
import { ISection } from "../../../../models/sidebar.model";
import RegistrationForm from "../RegistrationForm";
import { Content, SectionTop } from "./styled";

const Section = ({ menu }: ISection) => {
  const { company } = useGlobal();

  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { getPartnerships } = usePartner();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [resetFilter, setResetFilter] = useState(false);
  const { data, isLoading, count } = getPartnerships({
    companyId: company!.externalCompanyId,
    corporateName: search,
    size: registerPerPage,
    page: currentPage,
  });

  return (
    <>
      <SectionTop className="contentTop">
        <Button leftIcon={<IoIosAdd />} onClick={() => setShowModal(true)}>
          Cadastrar Prestador
        </Button>
      </SectionTop>

      <Content className="contentMain">
        <Flex gap="15px" alignItems="center">
          <div className="searchWrap">
            <FieldSearch
              placeholder="Buscar empresa"
              handleSearch={(value) => {
                setResetFilter(false);
                setSearch(value);
              }}
              reset={resetFilter}
            />
          </div>
          <Button
            height="37px"
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setSearch("");
              setResetFilter(true);
            }}
          >
            Limpar Filtro
          </Button>
        </Flex>
        {isLoading && <Loading />}

        {!isLoading && (
          <>
            {menu === 1 && <PartnerActivated menu={menu} data={data} />}
            {menu === 2 && <PartnerActivePending menu={menu} data={data} />}

            <Pagination
              registerPerPage={registerPerPage}
              totalRegisters={count}
              currentPage={currentPage}
              handleChangePage={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </Content>

      {showModal && (
        <SimpleModal
          isOpen={showModal}
          handleModal={setShowModal}
          size="2xl"
          minHeight="160px"
        >
          <RegistrationForm setShowModal={setShowModal} />
        </SimpleModal>
      )}
    </>
  );
};

export default Section;
