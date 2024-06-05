import { useMemo } from "react";
import ActiveContractsTab from "../components/ImplantationForm/ImplantationTabs/ActiveContractsTab";
import BrokerTab from "../components/ImplantationForm/ImplantationTabs/BrokerTab";
import ColaboratorsTab from "../components/ImplantationForm/ImplantationTabs/ColaboratorsTab";
import ImportPjsTab from "../components/ImplantationForm/ImplantationTabs/ImportPjsTab";
import {
  ICallData,
  IFetchImplementationFormsResponse,
  IUseImplementationTabs,
  ImplantationFormEnum,
} from "../models/use-implementation-tabs.d";
import { apiSupport } from "../services/api";

const companyAndParnerProfiles = ["2", "5"];
const companyProfile = ["2"];

const fetchImplementationForms = async (companyId: string) => {
  const { data } = await apiSupport.get<IFetchImplementationFormsResponse[]>(
    `/implementation-form/company/${companyId}`,
  );

  return data;
};

const fetchTabsData = (
  forms: IFetchImplementationFormsResponse[],
  roleId: string,
  refetchForms: () => Promise<any>,
  callData: ICallData,
) => {
  const collaboratorForm = useMemo(() => {
    return forms.find(
      (form) => form.type === ImplantationFormEnum.collaborators,
    );
  }, [forms]);

  const activeContractsForm = useMemo(() => {
    return forms.find(
      (form) => form.type === ImplantationFormEnum.activeContracts,
    );
  }, [forms]);

  const importPjsForm = useMemo(() => {
    return forms.find((form) => form.type === ImplantationFormEnum.pjImport);
  }, [forms]);

  const brokerForm = useMemo(() => {
    return forms.find((form) => form.type === ImplantationFormEnum.broker);
  }, [forms]);

  const tabsData = [
    {
      label: "Pessoas",
      content: (
        <ColaboratorsTab
          isComplete={collaboratorForm?.answered || false}
          refetchFroms={refetchForms}
          formId={collaboratorForm?.id || ""}
          callData={callData}
        />
      ),
      showTab: companyAndParnerProfiles.includes(roleId) || false,
    },
    {
      label: "Portabilidade de Contratos",
      content: (
        <ActiveContractsTab
          isComplete={activeContractsForm?.answered || false}
          refetchForms={refetchForms}
          formId={activeContractsForm?.id || ""}
          callData={callData}
        />
      ),
      showTab: companyAndParnerProfiles.includes(roleId) || false,
    },
    {
      label: "Prestadores de Serviços",
      content: (
        <ImportPjsTab
          isComplete={importPjsForm?.answered || false}
          refetchForms={refetchForms}
          formId={importPjsForm?.id || ""}
          callData={callData}
        />
      ),
      showTab: companyProfile.includes(roleId) || false,
    },
    {
      label: "Corretora",
      content: (
        <BrokerTab
          isComplete={brokerForm?.answered || false}
          refetchForms={refetchForms}
          formId={brokerForm?.id || ""}
          callData={callData}
        />
      ),
      showTab: companyAndParnerProfiles.includes(roleId) || false,
    },
  ];

  return {
    tabsData,
  };
};

export const useImplementationTabs = (): IUseImplementationTabs => ({
  fetchImplementationForms,
  fetchTabsData,
});
