import {
  Box,
  Button,
  Text,
  Tooltip,
  useDisclosure,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { BiShoppingBag } from "react-icons/bi";
import { BsCurrencyDollar, BsFillGearFill } from "react-icons/bs";
import { FiCalendar, FiPlus, FiUserPlus } from "react-icons/fi";
import { MdOutlineInsertChart } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";

import Dashboard from "../../Layouts/Dashboard";
import Card from "../../components/Card";
import Menu from "../../components/Menu";

import { IoWarningOutline } from "react-icons/io5";
import { useGlobal } from "../../contexts/UserContext";

import { capitalize } from "../../utils/capitalize";
import { useQuery } from "react-query";
import ImplantationForm from "../../components/ImplantationForm";
import Loading from "../../components/Loading";
import SimpleModal from "../../components/SimpleModal";
import { TermsOfUse } from "../../components/TermsOfUse";
import { Warning } from "../../errors";
import { useImplementationTabs } from "../../hooks/useImplementationTabs";
import { ICompaniesAssociated } from "../../models/companies-associated";
import { apiRecord } from "../../services/api";
import { homeTextMask } from "../../utils/fieldFormat";
import {
  AvatarWrap,
  Cards,
  Company,
  ContentWrap,
  Frase,
  Hi,
  Section,
} from "./styled";
import Welcome from "../../components/Welcome";
import { setDataCookie } from "../../cookies";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    user,
    company,
    role,
    roles,
    permissions,
    isIssuer,
    companyStatus,
    isBroker,
    setIsUseTerm,
    setCompanyStatus,
  } = useGlobal();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [break900] = useMediaQuery("(max-width: 900px)");

  const isApproved =
    companyStatus?.status === "approved" || isBroker || isIssuer;

  const cards = [
    {
      id: "access_products",
      icon: <BiShoppingBag size={20} />,
      title: "Produtos",
      text: "Mais de 1000 produtos disponíveis para simulação e adesão. Confira!",
      link: "/produtos",
      isUrl: false,
      visible: isApproved && !isIssuer,
      isDisabled: !permissions?.product,
      alertText: "",
    },
    {
      id: "access_collaborator",
      icon: <FiUserPlus size={20} />,
      title: "Cadastro de Pessoas",
      text: "Cadastre titulares e dependentes para garantir acesso a todos os produtos disponíveis.",
      link: "/pacotes",
      isUrl: false,
      visible: isApproved && !isIssuer,
      isDisabled: !permissions?.collaborator,
      alertText: "",
    },
    {
      id: "access_products_config",
      icon: <BsFillGearFill size={20} />,
      title: "Parametrização de Produtos",
      text: "Escolha o modo de contribuição de acordo com a política de saúde da sua empresa.",
      link: "/parametrizacao-de-produtos",
      isUrl: false,
      visible: isApproved && !isIssuer,
      isDisabled: !permissions?.productSettings,
      alertText: "",
    },
    {
      id: "complete_registration",
      icon: <FiPlus size={20} />,
      title: "Completar cadastro",
      text: "Complete seu cadastro e tenha acesso a toda nossa plataforma.",
      link: "/completar-cadastro",
      isUrl: false,
      visible: !isApproved,
      isDisabled: isApproved,
      alertText:
        companyStatus?.status === "reproved" ? "Cadastro com pendência" : "",
    },
    {
      id: "schedule",
      icon: <FiCalendar size={20} />,
      title: "Agendar apresentação",
      text: "Agende agora uma apresentação com o nosso setor comercial.",
      link: "https://calendly.com/comercialfiibo",
      isUrl: true,
      visible: !isApproved,
      isDisabled: isApproved,
      alertText: "",
    },
    {
      id: "company",
      icon: <RiBuilding2Line size={20} />,
      title: "Cadastrar empresas",
      text: "Cadastre novas empresas em seu grupo.",
      link: "/gestao-promocao-saude?1",
      isUrl: false,
      visible: isIssuer,
      isDisabled: !isIssuer,
      alertText: "",
    },
    {
      id: "balance",
      icon: <BsCurrencyDollar size={20} />,
      title: "Incluir saldo",
      text: "Inclua saldo de promoção à saúde para as empresas de seu grupo.",
      link: "/gestao-promocao-saude?2",
      isUrl: false,
      visible: isIssuer,
      isDisabled: !isIssuer,
      alertText: "",
    },
    {
      id: "balance",
      icon: <MdOutlineInsertChart size={20} />,
      title: "Gerenciar grupo",
      text: "Acesse relatórios e informações importantes.",
      link: "/gestao-promocao-saude?3",
      isUrl: false,
      visible: isIssuer,
      isDisabled: !isIssuer,
      alertText: "",
    },
  ];
  const { fetchImplementationForms } = useImplementationTabs();

  const {
    data: forms,
    isLoading,
    refetch: refetchForms,
    isFetching,
  } = useQuery(["fetch-implementation-forms", company!.externalCompanyId], {
    queryFn: () => fetchImplementationForms(company!.externalCompanyId),
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const hasAccessImplementationForms = role && ["2", "5"].includes(role?.id);

  const allFormsComplete =
    forms &&
    forms?.filter((form) => form.answered)?.length >=
      (role?.id === "2" ? 4 : 3);

  const { data: companyData, isLoading: isLoadingCompany } = useQuery(
    ["fetch-company-data-into-forms", company?.externalCompanyId],
    {
      queryFn: async () => {
        try {
          const { data } = await apiRecord.get<ICompaniesAssociated>(
            `/companies-associated/${company?.externalCompanyId}`,
          );

          const companyStatus = data?.companyAssociated?.companyStatus.find(
            (status) => status?.active,
          );

          setIsUseTerm(data?.companyAssociated?.useTerm ? true : false);
          setDataCookie({
            key: "@fiibo.term",
            value: JSON.stringify(
              data?.companyAssociated?.useTerm ? true : false,
            ),
          });

          setCompanyStatus(companyStatus);

          return data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new Warning(
            error?.response?.data?.message[0] || "Ocorreu um erro inesperado!",
            error?.response?.status,
          );
        }
      },
    },
  );

  const isMoreThan30Days = useMemo(() => {
    const thirtyDaysInMiliSeconds = 30 * 24 * 60 * 60 * 1000;
    return companyData
      ? new Date() >=
          new Date(
            new Date(companyData.createdAt).getTime() + thirtyDaysInMiliSeconds,
          )
      : true;
  }, [companyData]);

  const isUseTermPage = companyData && !companyData?.companyAssociated?.useTerm;

  const onBoardingCompleted =
    (companyData?.companyAssociated?.useTerm &&
      companyData?.companyAssociated?.maxQuantityCollaborators &&
      companyData?.companyAssociated?.minQuantityCollaborators) ||
    companyData?.companyAssociated?.companyStatus?.filter((el) => el?.active)[0]
      ?.status === "approved"
      ? true
      : false;

  useEffect(() => {
    if (roles.length > 1 && !role && !company) navigate("/selecione-perfil");
    if (role && !company) navigate("/selecione-empresa");
  }, [company, role, roles, navigate]);

  useEffect(() => {
    document.title = `${theme.content.project} - Home`;
  }, [theme]);

  return (
    <>
      <Dashboard menu={<Menu onBoardingCompleted={onBoardingCompleted} />}>
        {isUseTermPage && <>{!isLoadingCompany && <TermsOfUse />}</>}

        {!isUseTermPage &&
          companyData &&
          companyData?.companyAssociated?.useTerm &&
          !onBoardingCompleted && <Welcome />}

        {!isUseTermPage && onBoardingCompleted && (
          <Section style={{ marginTop: break900 ? "30px" : "unset" }}>
            {" "}
            <AvatarWrap backgroundImage={theme.images.iara} />
            {!allFormsComplete &&
              !isMoreThan30Days &&
              hasAccessImplementationForms &&
              !isLoadingCompany &&
              !isLoading && (
                <Button
                  onClick={() => onOpen()}
                  variant="outline"
                  position="absolute"
                  right="60px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="1rem"
                >
                  <IoWarningOutline size={18} />
                  <Text>Formulário de implantação</Text>
                </Button>
              )}
            {isOpen && (
              <SimpleModal
                isOpen={isOpen}
                handleModal={onClose}
                size="3xl"
                title="Formulário de implantação"
                minHeight="10rem"
              >
                <ImplantationForm
                  forms={forms || []}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  refetchForms={refetchForms}
                  companyData={companyData}
                />
              </SimpleModal>
            )}
            <ContentWrap>
              <Hi>Olá,</Hi>
              <Company>
                {role?.name === "CORRETOR" ? (
                  <Tooltip label={user?.username || ""} hasArrow>
                    {homeTextMask(capitalize(user?.username || ""))}
                  </Tooltip>
                ) : (
                  <Tooltip label={company?.name || ""} hasArrow>
                    {homeTextMask(capitalize(company?.name || ""))}
                  </Tooltip>
                )}
                !
              </Company>
              <Frase>
                Boas-vindas a maior multiplataforma de saúde e bem-estar
              </Frase>

              {isLoadingCompany && (
                <Box margin="30px 0">
                  <Loading />
                </Box>
              )}

              {!isLoadingCompany && (
                <Cards>
                  {cards
                    .filter((card) => card.visible)
                    .map((card) => (
                      <Card
                        idButton={card.id}
                        key={card.title}
                        icon={card.icon}
                        title={card.title}
                        text={card.text}
                        link={card.link}
                        isUrl={card.isUrl}
                        isDisabled={card?.isDisabled}
                        alertText={card?.alertText}
                      />
                    ))}
                </Cards>
              )}
            </ContentWrap>
          </Section>
        )}
      </Dashboard>
    </>
  );
};

export default Home;
