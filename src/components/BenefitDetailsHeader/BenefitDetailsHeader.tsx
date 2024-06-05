import { Flex } from "@chakra-ui/react";
import ProviderImage from "../ProviderImage";
import TooltipSubstring from "../TooltipSubstring/TooltipSubstring";
import {
  CARE_SEGMENTATION_FROM_TO,
  COVERAGE_FROM_TO,
  HIRING_TYPE_FROM_TO,
} from "../../utils/enumFormat";
import { IDataProduct } from "../../models/product.model";
import { capitalize } from "../../utils/capitalize";
import { Content } from "./styled";

const BenefitDetailsHeader = ({ data }: { data: IDataProduct }) => {
  return (
    <Content marginTop="30px">
      <Flex justifyContent="center" alignItems="center" minW="130px">
        <ProviderImage
          providerName={data?.companyProvider?.company?.corporateName}
          imgToken={data?.companyProvider?.logo}
          w="180px"
          maxH="60px"
        />
      </Flex>

      <Flex gap="5px">
        <div className="detailsColumnA">
          <span>Nome registrado:</span>
          {data?.regulated && (
            <>
              <span>RPS (Código do Plano):</span>
              <span>Tipo de Contratação:</span>
              <span>Acomodação:</span>
            </>
          )}
          {data?.companyProvider?.susep &&
            data?.productClass === "insurance" && (
              <span>Código de registro SUSEP do fornecedor:</span>
            )}
          {data?.codRegistrySUSEP && data?.productClass === "insurance" && (
            <span>Código de registro SUSEP do produto:</span>
          )}
        </div>
        <div className="detailsColumnB">
          <span>
            <TooltipSubstring
              name={capitalize(data?.reducedName)}
              length={data?.regulated ? 20 : 150}
            />
          </span>
          {data?.regulated && (
            <>
              <span>{data?.codRegistryANS || "-"}</span>
              <span>{HIRING_TYPE_FROM_TO[data?.hiringType]}</span>
              <span>
                {data?.accommodation === "business"
                  ? "Apartamento"
                  : "Enfermaria"}
              </span>
            </>
          )}
          {data?.companyProvider?.susep &&
            data?.productClass === "insurance" && (
              <span>{data?.companyProvider?.susep}</span>
            )}
          {data?.codRegistrySUSEP && data?.productClass === "insurance" && (
            <span>{data?.codRegistrySUSEP}</span>
          )}
        </div>
      </Flex>
      <Flex gap="5px">
        <div className="detailsColumnA">
          {data?.regulated && (
            <>
              <span>Segmentação Assistencial:</span>
              <span>Fator Moderador:</span>
              <span>Abrangência:</span>
            </>
          )}
        </div>

        <div className="detailsColumnB">
          {data?.regulated && (
            <>
              <span>
                <TooltipSubstring
                  name={CARE_SEGMENTATION_FROM_TO[data?.outpatientSegmentation]}
                  length={20}
                />
              </span>
              <span>
                {data?.coparticipation
                  ? "Com coparticipação"
                  : "Sem coparticipação"}
              </span>
              <span>{COVERAGE_FROM_TO[data?.coverage]}</span>
            </>
          )}
        </div>
      </Flex>
    </Content>
  );
};

export default BenefitDetailsHeader;
