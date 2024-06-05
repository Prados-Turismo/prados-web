/* eslint-disable react/jsx-indent */
import PartnerPage from "./PartnerPage";

import { IPartnerPage } from "./types";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const PartnerList = ({ data, menu }: IPartnerPage) => {
  return (
    <>
      {data.length > 0 && <PartnerPage menu={menu} data={data} />}

      {data.length === 0 && (
        <AlertNoDataFound title="Nenhum prestador de serviço cadastrado" />
      )}
    </>
  );
};

export default PartnerList;
