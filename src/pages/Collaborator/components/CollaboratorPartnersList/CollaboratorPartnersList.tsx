import { useState } from "react";
import { Link } from "react-router-dom";

import FieldSearch from "../../../../components/FieldSearch";
import Loading from "../../../../components/Loading";
import Pagination from "../../../../components/Pagination";
import {
  IconsGroup,
  TBody,
  TD,
  THead,
  TR,
  Table,
} from "../../../../components/Table";

// Hooks and utils
import { TableContainer } from "@chakra-ui/react";
import { FiUserCheck } from "react-icons/fi";
import ButtonIcon from "../../../../components/ButtonIcon";
import useCollaborator from "../../../../hooks/useCollaborator";
import { cpfMask, dateFormat } from "../../../../utils";
import { capitalize } from "../../../../utils/capitalize";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

interface ICollabotatorPartnersList {
  partnerId: string;
  type: "A" | "P";
  submenu: number;
}

const CollabotatorPartnersList = ({
  partnerId,
  type,
  submenu,
}: ICollabotatorPartnersList) => {
  const { getCollaborators } = useCollaborator();

  const registerPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, count, isLoading, setFieldSearch } = getCollaborators({
    size: registerPerPage,
    page: currentPage,
    companyId: partnerId,
    beneficiaryStatus: type,
  });

  const hiddenCPF = (cpf: string) => cpf.replace(/^.{8}/, "***.***.");

  return (
    <>
      <div className="searchWrap">
        <FieldSearch
          placeholder="Nome ou CPF"
          handleSearch={(value) => setFieldSearch(value)}
        />
      </div>

      {isLoading && <Loading />}

      {!isLoading && data.length > 0 && (
        <>
          <TableContainer marginBottom="10px">
            <Table>
              <THead>
                <TD style={{ flex: "0 0 10%" }}>Data de cadastro</TD>
                <TD style={{ flex: "0 0 30%" }}>Parceiro</TD>
                <TD>CPF</TD>
                <TD>Categoria</TD>
                <TD>Subcategoria</TD>
                <TD style={{ flex: "0 0 10%" }}>&nbsp;</TD>
              </THead>

              <TBody>
                {data.map((item) => {
                  return (
                    <TR key={item.id}>
                      <TD style={{ flex: "0 0 10%" }}>
                        {item.createdAt
                          ? dateFormat(new Date(item.createdAt))
                          : "-"}
                      </TD>
                      <TD style={{ flex: "0 0 30%" }}>
                        <TooltipSubstring
                          name={capitalize(item.person?.name) || "-"}
                          length={25}
                        />
                      </TD>
                      <TD>
                        {item.person?.cpf
                          ? hiddenCPF(cpfMask(item.person?.cpf.toString()))
                          : "-"}
                      </TD>
                      <TD>
                        <TooltipSubstring
                          name={item.sector?.name || "-"}
                          length={18}
                        />
                      </TD>
                      <TD>
                        <TooltipSubstring
                          name={item.position?.name || "-"}
                          length={18}
                        />
                      </TD>
                      <TD style={{ flex: "0 0 10%" }}>
                        <IconsGroup>
                          <Link
                            to={`/pacotes/${item.id}?menu=1&sidebar=1&companyId=${partnerId}&submenu=${submenu}`}
                          >
                            <ButtonIcon tooltip="Dados Pessoais">
                              <FiUserCheck size={20} />
                            </ButtonIcon>
                          </Link>
                        </IconsGroup>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </TableContainer>

          <Pagination
            registerPerPage={registerPerPage}
            totalRegisters={count}
            currentPage={currentPage}
            handleChangePage={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {!isLoading && data.length === 0 && (
        <AlertNoDataFound
          title={`${
            type === "A"
              ? "Nenhum titular ativo encontrado"
              : "Nenhum titular com ativação pendente encontrado"
          }`}
        />
      )}
    </>
  );
};

export default CollabotatorPartnersList;
