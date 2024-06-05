import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ISection } from "../../../../../../models/sidebar.model";

// Pages
import PartnerDetailsForm from "../../pages/PartnerDetailsForm";

// Styles
import { Content, SectionTop } from "./styled";

const Section = ({ menu }: ISection) => {
  const navigate = useNavigate();

  const pathNavigate = `/prestadores-de-servico?menu=${window.location.href.split("menu=")[1]}`;

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          variant="outline"
          width="74px"
          onClick={() => navigate(pathNavigate)}
        >
          Voltar
        </Button>
      </SectionTop>

      <Content className="contentMain">
        {menu === 1 && <PartnerDetailsForm />}
      </Content>
    </>
  );
};

export default Section;
