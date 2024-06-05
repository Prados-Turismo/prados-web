import { RiPencilFill } from "react-icons/ri";
import {
  IconsGroup,
  TBody,
  TD,
  THead,
  TR,
  Table,
} from "../../../components/Table";

// Styled Components
import ButtonIcon from "../../../components/ButtonIcon";

// Hooks and utils
import { cnpjMask, dateFormat } from "../../../utils";

// Types
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../contexts/UserContext";
import { IPartnerPage } from "./types";

const PartnerPage = ({ data, menu }: IPartnerPage) => {
  const navigate = useNavigate();
  const { isBroker } = useGlobal();

  return (
    <>
      <Table>
        <THead minWidth="800px" padding={"0 30px 0 30px"}>
          <TD>Data de cadastro</TD>
          <TD>Empresa</TD>
          <TD>CNPJ</TD>
          {!isBroker && <TD style={{ flex: "0 0 10%" }}>&nbsp;</TD>}
        </THead>

        <TBody>
          {data.map((item) => {
            return (
              <TR key={item.id} minWidth="800px">
                <TD>
                  {item?.createdAt
                    ? dateFormat(new Date(item?.createdAt))
                    : "-"}
                </TD>
                <TD>{item?.corporateName || "-"}</TD>
                <TD>{item?.cnpj ? cnpjMask(item?.cnpj.toString()) : "-"}</TD>
                {!isBroker && (
                  <TD style={{ flex: "0 0 10%" }}>
                    <IconsGroup>
                      <ButtonIcon tooltip="Editar PJ">
                        <RiPencilFill
                          onClick={() => {
                            navigate(
                              `/prestadores-de-servico/${item?.id}?menu=${menu}`,
                            );
                          }}
                          size={20}
                        />
                      </ButtonIcon>
                    </IconsGroup>
                  </TD>
                )}
              </TR>
            );
          })}
        </TBody>
      </Table>
    </>
  );
};

export default PartnerPage;
