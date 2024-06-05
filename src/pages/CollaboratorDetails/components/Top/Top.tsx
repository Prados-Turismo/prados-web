import { Button, Skeleton } from "@chakra-ui/react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { useGlobal } from "../../../../contexts/UserContext";
import useCollaborator from "../../../../hooks/useCollaborator";

import { capitalize } from "../../../../utils/capitalize";
import { Aside } from "./styled";

const Top = () => {
  const { company } = useGlobal();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const submenuParams = searchParams.get("submenu");
  const submenu = submenuParams !== null ? parseInt(submenuParams) : null;

  const { getBeneficiary } = useCollaborator();
  const { data, isLoading } = getBeneficiary({
    companyId: company!.externalCompanyId,
    beneficiaryId: id || "",
  });

  const menu = parseInt(window.location.href.split("menu=")[1].split("?")[0]);

  let linkReturnId = menu;
  if (submenu) linkReturnId = submenu;

  return (
    <Aside as="aside">
      <div className="left">
        {!isLoading ? (
          <h2>{capitalize(data?.person.name) || ""}</h2>
        ) : (
          <Skeleton width={360} height={35} borderRadius={10} />
        )}
      </div>

      <div className="right">
        <Link to={`/pessoas?menu=${linkReturnId}`}>
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    </Aside>
  );
};

export default Top;
