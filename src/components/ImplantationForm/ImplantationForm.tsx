import React, { useEffect, useState } from "react";
import { ContentWrapper, LoadingWrapper } from "./styled";
import ImplantationTabs from "./ImplantationTabs";
import { useGlobal } from "../../contexts/UserContext";
import { useImplementationTabs } from "../../hooks/useImplementationTabs";
import {
  ICallData,
  IFetchImplementationFormsResponse,
} from "../../models/use-implementation-tabs";
import { ICompaniesAssociated } from "../../models/companies-associated";
import Loading from "../Loading";
import FirstStep from "./FirstStep/FirstStep";

interface Props {
  forms: IFetchImplementationFormsResponse[];
  isLoading: boolean;
  refetchForms: () => Promise<any>;
  isFetching: boolean;
  companyData: ICompaniesAssociated | undefined;
}

const ImplantationForm: React.FC<Props> = ({
  forms,
  isFetching,
  isLoading,
  refetchForms,
  companyData,
}) => {
  const { role, user } = useGlobal();

  const { fetchTabsData } = useImplementationTabs();
  const [isInitialStep, setIsInitialStep] = useState(true);

  const callData: ICallData = {
    callReasonId: "",
    callReasonSubject: "",
    companyName: companyData?.corporateName || "",
    hubId: companyData?.companyAssociated.hub.id || "",
    hubName: companyData?.companyAssociated.hub.name || "",
    requestingUser: user?.email || "",
    requestingUserName: user?.username || "",
  };

  const { tabsData } = fetchTabsData(forms, role!.id, refetchForms, callData);

  useEffect(() => {
    if (forms && forms.length > 0) setIsInitialStep(false);
  }, [forms]);

  return (
    <ContentWrapper overflowY="auto" display="flex" justifyContent="center">
      {isLoading || isFetching ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : isInitialStep ? (
        <FirstStep setNextStep={() => setIsInitialStep(false)} />
      ) : (
        <ImplantationTabs tabsData={tabsData} isLoading={isLoading} />
      )}
    </ContentWrapper>
  );
};

export default ImplantationForm;
