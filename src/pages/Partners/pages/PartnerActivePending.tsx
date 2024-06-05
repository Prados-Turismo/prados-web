/* eslint-disable react/jsx-indent */

// Types
import { IPartnerPage } from "./types";
import PartnerPage from "./PartnerPage";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const PartnerList = ({ data, menu }: IPartnerPage) => {
  return (
    <>
      {data.length > 0 && <PartnerPage menu={menu} data={data} />}

      {data.length === 0 && (
        <AlertNoDataFound title="Nenhum parceiro pendente de ativação" />
      )}
    </>
  );
};

export default PartnerList;
